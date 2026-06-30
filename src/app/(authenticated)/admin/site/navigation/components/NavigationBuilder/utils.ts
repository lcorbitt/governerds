import { arrayMove } from "@dnd-kit/sortable";

import type {
  DestinationType,
  FlatNavigationRow,
  NavigationItem,
  NavigationItemFormInput,
  NavigationTreeNode,
  VisibilityRuleId,
} from "./types";

export const MAX_NAV_DEPTH = 3;
export const INDENTATION_WIDTH = 24;

export function createNavigationItemId(): string {
  return crypto.randomUUID();
}

export function buildTree(items: NavigationItem[]): NavigationTreeNode[] {
  const sorted = [...items].sort((a, b) => a.sortOrder - b.sortOrder);
  const byParent = new Map<string | null, NavigationItem[]>();

  for (const item of sorted) {
    const siblings = byParent.get(item.parentId) ?? [];
    siblings.push(item);
    byParent.set(item.parentId, siblings);
  }

  function buildChildren(parentId: string | null): NavigationTreeNode[] {
    return (byParent.get(parentId) ?? []).map((item) => ({
      ...item,
      children: buildChildren(item.id),
    }));
  }

  return buildChildren(null);
}

export function flattenTree(
  tree: NavigationTreeNode[],
  depth = 0,
  parentId: string | null = null,
): FlatNavigationRow[] {
  const rows: FlatNavigationRow[] = [];

  for (const node of tree) {
    const { children, ...item } = node;
    rows.push({ id: item.id, item, depth, parentId });
    rows.push(...flattenTree(children, depth + 1, item.id));
  }

  return rows;
}

export function flattenNavigationItems(
  items: NavigationItem[],
): FlatNavigationRow[] {
  return flattenTree(buildTree(items));
}

export function filterPreviewItems(items: NavigationItem[]): NavigationItem[] {
  return items.filter((item) => item.isEnabled && item.isVisible);
}

export function getItemDepth(items: NavigationItem[], itemId: string): number {
  const item = items.find((entry) => entry.id === itemId);
  if (!item) return 0;

  let depth = 0;
  let currentParentId = item.parentId;

  while (currentParentId) {
    depth += 1;
    const parent = items.find((entry) => entry.id === currentParentId);
    if (!parent) break;
    currentParentId = parent.parentId;
  }

  return depth;
}

export function getDescendantIds(
  items: NavigationItem[],
  rootId: string,
): string[] {
  const descendantIds: string[] = [];
  const queue = items
    .filter((item) => item.parentId === rootId)
    .map((item) => item.id);

  while (queue.length > 0) {
    const currentId = queue.shift();
    if (!currentId) continue;
    descendantIds.push(currentId);
    queue.push(
      ...items
        .filter((item) => item.parentId === currentId)
        .map((item) => item.id),
    );
  }

  return descendantIds;
}

export function normalizeSortOrders(items: NavigationItem[]): NavigationItem[] {
  const siblingsByParent = new Map<string | null, NavigationItem[]>();

  for (const item of items) {
    const siblings = siblingsByParent.get(item.parentId) ?? [];
    siblings.push(item);
    siblingsByParent.set(item.parentId, siblings);
  }

  const sortOrderById = new Map<string, number>();

  for (const siblings of siblingsByParent.values()) {
    siblings
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .forEach((sibling, index) => {
        sortOrderById.set(sibling.id, index);
      });
  }

  return items.map((item) => ({
    ...item,
    sortOrder: sortOrderById.get(item.id) ?? item.sortOrder,
  }));
}

export function removeItemAndDescendants(
  items: NavigationItem[],
  itemId: string,
): NavigationItem[] {
  const idsToRemove = new Set([itemId, ...getDescendantIds(items, itemId)]);

  return normalizeSortOrders(items.filter((item) => !idsToRemove.has(item.id)));
}

export function updateNavigationItem(
  items: NavigationItem[],
  itemId: string,
  patch: Partial<NavigationItem>,
): NavigationItem[] {
  return items.map((item) =>
    item.id === itemId ? { ...item, ...patch, id: item.id } : item,
  );
}

export function indentItem(
  items: NavigationItem[],
  itemId: string,
): NavigationItem[] {
  const siblings = items
    .filter(
      (item) => item.parentId === items.find((i) => i.id === itemId)?.parentId,
    )
    .sort((left, right) => left.sortOrder - right.sortOrder);
  const itemIndex = siblings.findIndex((item) => item.id === itemId);
  if (itemIndex <= 0) return items;

  const newParent = siblings[itemIndex - 1];
  const newParentDepth = getItemDepth(items, newParent.id);
  if (newParentDepth + 1 >= MAX_NAV_DEPTH) return items;

  const childCount = items.filter(
    (item) => item.parentId === newParent.id,
  ).length;

  return normalizeSortOrders(
    items.map((item) =>
      item.id === itemId
        ? {
            ...item,
            parentId: newParent.id,
            sortOrder: childCount,
          }
        : item,
    ),
  );
}

export function outdentItem(
  items: NavigationItem[],
  itemId: string,
): NavigationItem[] {
  const item = items.find((entry) => entry.id === itemId);
  if (!item?.parentId) return items;

  const parent = items.find((entry) => entry.id === item.parentId);
  if (!parent) return items;

  const updated = items.map((entry) => {
    if (entry.id === itemId) {
      return {
        ...entry,
        parentId: parent.parentId,
        sortOrder: parent.sortOrder + 1,
      };
    }

    if (
      entry.parentId === parent.parentId &&
      entry.sortOrder > parent.sortOrder
    ) {
      return { ...entry, sortOrder: entry.sortOrder + 1 };
    }

    return entry;
  });

  return normalizeSortOrders(updated);
}

function getMaxDepthForProjection({
  previousItem,
  nextItem,
}: {
  previousItem?: FlatNavigationRow;
  nextItem?: FlatNavigationRow;
}): number {
  if (previousItem) {
    return previousItem.depth + 1;
  }

  if (nextItem) {
    return nextItem.depth;
  }

  return 0;
}

function getParentIdForDepth(
  rows: FlatNavigationRow[],
  index: number,
  depth: number,
): string | null {
  if (depth === 0) return null;

  for (let cursor = index - 1; cursor >= 0; cursor -= 1) {
    const candidate = rows[cursor];
    if (candidate.depth === depth - 1) {
      return candidate.id;
    }
  }

  return null;
}

export function getDragProjection(
  items: NavigationItem[],
  activeId: string,
  overId: string,
  dragOffset: number,
): { parentId: string | null; depth: number } | null {
  const flatRows = flattenNavigationItems(items);
  const activeIndex = flatRows.findIndex((row) => row.id === activeId);
  const overIndex = flatRows.findIndex((row) => row.id === overId);

  if (activeIndex === -1 || overIndex === -1) return null;

  const activeRow = flatRows[activeIndex];
  const reorderedRows = arrayMove(flatRows, activeIndex, overIndex);
  const projectedIndex = reorderedRows.findIndex((row) => row.id === activeId);
  const previousItem = reorderedRows[projectedIndex - 1];
  const nextItem = reorderedRows[projectedIndex + 1];
  const dragDepth = Math.round(dragOffset / INDENTATION_WIDTH);
  const projectedDepth = Math.max(
    0,
    Math.min(
      activeRow.depth + dragDepth,
      getMaxDepthForProjection({ previousItem, nextItem }),
      MAX_NAV_DEPTH - 1,
    ),
  );

  return {
    depth: projectedDepth,
    parentId: getParentIdForDepth(
      reorderedRows,
      projectedIndex,
      projectedDepth,
    ),
  };
}

export function reorderNavigationItems(
  items: NavigationItem[],
  activeId: string,
  overId: string,
  dragOffset: number,
): NavigationItem[] {
  if (activeId === overId) return items;

  const projection = getDragProjection(items, activeId, overId, dragOffset);
  if (!projection) return items;

  const flatRows = flattenNavigationItems(items);
  const activeIndex = flatRows.findIndex((row) => row.id === activeId);
  const overIndex = flatRows.findIndex((row) => row.id === overId);
  if (activeIndex === -1 || overIndex === -1) return items;

  const reorderedRows = arrayMove(flatRows, activeIndex, overIndex);
  const projectedIndex = reorderedRows.findIndex((row) => row.id === activeId);
  const targetParentId = projection.parentId;

  const descendantIds = new Set(getDescendantIds(items, activeId));
  if (targetParentId && descendantIds.has(targetParentId)) {
    return items;
  }

  const siblings = items
    .filter(
      (item) => item.parentId === targetParentId && !descendantIds.has(item.id),
    )
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .filter((item) => item.id !== activeId);

  const overItem = items.find((item) => item.id === overId);
  let insertIndex = siblings.length;

  if (overItem && overItem.parentId === targetParentId) {
    const overSiblingIndex = siblings.findIndex((item) => item.id === overId);
    if (overSiblingIndex !== -1) {
      insertIndex =
        projectedIndex > overIndex ? overSiblingIndex + 1 : overSiblingIndex;
    }
  }

  siblings.splice(insertIndex, 0, {
    ...items.find((item) => item.id === activeId)!,
    parentId: targetParentId,
  });

  const sortOrderById = new Map<string, number>();
  siblings.forEach((sibling, index) => {
    sortOrderById.set(sibling.id, index);
  });

  const updated = items.map((item) => {
    if (item.id === activeId) {
      return {
        ...item,
        parentId: targetParentId,
        sortOrder: sortOrderById.get(item.id) ?? item.sortOrder,
      };
    }

    if (item.parentId === targetParentId && sortOrderById.has(item.id)) {
      return { ...item, sortOrder: sortOrderById.get(item.id)! };
    }

    return item;
  });

  return normalizeSortOrders(updated);
}

export function isStructuralDestination(
  destinationType: DestinationType,
): boolean {
  return destinationType === "divider" || destinationType === "heading";
}

export function resolveDestinationHref(item: NavigationItem): string | null {
  if (!item.destinationId) return null;

  switch (item.destinationType) {
    case "page":
    case "custom_route":
    case "external_url":
      return item.destinationId;
    case "space":
      return `/spaces/${item.destinationId}`;
    case "category":
      return `/categories/${item.destinationId}`;
    case "content":
      return `/content/${item.destinationId}`;
    case "divider":
    case "heading":
      return null;
    default:
      return null;
  }
}

export function formInputToNavigationItem(
  values: NavigationItemFormInput,
  existing?: NavigationItem,
): NavigationItem {
  const destinationId = values.destinationId?.trim() || null;
  const metadata =
    values.destinationType === "external_url"
      ? { opensInNewTab: values.opensInNewTab }
      : {};

  const base: NavigationItem = existing ?? {
    id: createNavigationItemId(),
    parentId: null,
    label: "",
    icon: values.icon,
    destinationType: values.destinationType,
    destinationId: null,
    metadata: {},
    sortOrder: 0,
    isVisible: values.isVisible,
    isEnabled: values.isEnabled,
    visibilityRuleId: values.visibilityRuleId,
  };

  const next: NavigationItem = {
    ...base,
    label:
      values.destinationType === "divider"
        ? values.label.trim() || "Divider"
        : values.label.trim(),
    icon: values.destinationType === "divider" ? null : values.icon,
    destinationType: values.destinationType,
    destinationId: isStructuralDestination(values.destinationType)
      ? null
      : destinationId,
    metadata,
    visibilityRuleId: values.visibilityRuleId,
    isVisible: values.isVisible,
    isEnabled: values.isEnabled,
  };

  return next;
}

export function navigationItemToFormInput(
  item: NavigationItem,
): NavigationItemFormInput {
  return {
    destinationType: item.destinationType,
    label: item.label,
    icon: item.icon,
    destinationId: item.destinationId ?? "",
    visibilityRuleId: item.visibilityRuleId,
    isVisible: item.isVisible,
    isEnabled: item.isEnabled,
    opensInNewTab: item.metadata.opensInNewTab ?? false,
  };
}

export function areNavigationItemsEqual(
  left: NavigationItem[],
  right: NavigationItem[],
): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

export function cloneNavigationItems(
  items: NavigationItem[],
): NavigationItem[] {
  return items.map((item) => ({ ...item }));
}

export function getDestinationTypeLabel(
  destinationType: DestinationType,
): string {
  switch (destinationType) {
    case "page":
      return "Page";
    case "space":
      return "Space";
    case "category":
      return "Category";
    case "content":
      return "Content";
    case "external_url":
      return "External Link";
    case "custom_route":
      return "Custom Route";
    case "divider":
      return "Divider";
    case "heading":
      return "Heading";
    default:
      return destinationType;
  }
}

export function getVisibilityRuleLabel(ruleId: VisibilityRuleId): string {
  switch (ruleId) {
    case "everyone":
      return "Everyone";
    case "members":
      return "Members Only";
    case "paid_members":
      return "Paid Members Only";
    case "admins":
      return "Admins Only";
    case "moderators":
      return "Moderators Only";
    case "creators":
      return "Creators Only";
    case "vip_tag":
      return "VIP Tag";
    case "organization_tag":
      return "Organization Tag";
    case "custom":
      return "Custom Permission";
    default:
      return ruleId;
  }
}

export function insertNavigationItem(
  items: NavigationItem[],
  item: NavigationItem,
  parentId: string | null = null,
): NavigationItem[] {
  const siblings = items.filter((entry) => entry.parentId === parentId);
  const nextItem: NavigationItem = {
    ...item,
    parentId,
    sortOrder: siblings.length,
  };

  return normalizeSortOrders([...items, nextItem]);
}
