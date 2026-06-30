"use client";

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  type DragEndEvent,
  type DragMoveEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { NavIcon } from "@/components/shared/IconPickerField";
import { cn } from "@/lib/utils";

import {
  EMPTY_LIST_DESCRIPTION,
  EMPTY_LIST_TITLE,
} from "../NavigationBuilder/constants";
import type {
  FlatNavigationRow,
  NavigationItem,
} from "../NavigationBuilder/types";
import {
  INDENTATION_WIDTH,
  flattenNavigationItems,
  getDestinationTypeLabel,
  getVisibilityRuleLabel,
  isStructuralDestination,
  resolveDestinationHref,
} from "../NavigationBuilder/utils";
import {
  DELETE_LABEL,
  DISABLED_STATUS_LABEL,
  DRAG_HANDLE_CLASS,
  DRAG_HANDLE_LABEL,
  EDIT_LABEL,
  EMPTY_STATE_CLASS,
  EMPTY_STATE_DESCRIPTION_CLASS,
  EMPTY_STATE_TITLE_CLASS,
  HIDDEN_STATUS_LABEL,
  INDENT_LABEL,
  LIST_CLASS,
  OUTDENT_LABEL,
  ROW_ACTION_BUTTON_CLASS,
  ROW_ACTIONS_CLASS,
  ROW_CLASS,
  ROW_CONTENT_CLASS,
  ROW_DRAGGING_CLASS,
  ROW_DISABLED_CLASS,
  ROW_ICON_CLASS,
  ROW_META_CLASS,
  ROW_TITLE_CLASS,
  STATUS_BADGE_CLASS,
  STATUS_DISABLED_CLASS,
  STATUS_HIDDEN_CLASS,
  TYPE_BADGE_CLASS,
  VISIBILITY_BADGE_CLASS,
} from "./constants";

interface NavigationItemListProps {
  items: NavigationItem[];
  onReorder: (activeId: string, overId: string, dragOffset: number) => void;
  onEdit: (itemId: string) => void;
  onDelete: (itemId: string) => void;
  onIndent: (itemId: string) => void;
  onOutdent: (itemId: string) => void;
}

interface SortableRowProps {
  row: FlatNavigationRow;
  onEdit: (itemId: string) => void;
  onDelete: (itemId: string) => void;
  onIndent: (itemId: string) => void;
  onOutdent: (itemId: string) => void;
}

function SortableNavigationItemRow({
  row,
  onEdit,
  onDelete,
  onIndent,
  onOutdent,
}: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: row.id });
  const { item } = row;
  const href = resolveDestinationHref(item);
  const isStructural = isStructuralDestination(item.destinationType);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginLeft: `${row.depth * INDENTATION_WIDTH}px`,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cn(
        ROW_CLASS,
        isDragging && ROW_DRAGGING_CLASS,
        (!item.isEnabled || !item.isVisible) && ROW_DISABLED_CLASS,
      )}
    >
      <button
        type="button"
        className={DRAG_HANDLE_CLASS}
        aria-label={DRAG_HANDLE_LABEL}
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4" aria-hidden />
      </button>

      <div className={ROW_CONTENT_CLASS}>
        <NavIcon name={item.icon} className={ROW_ICON_CLASS} />
        <div className="min-w-0 flex-1">
          <p className={ROW_TITLE_CLASS}>{item.label}</p>
          {!isStructural && href ? (
            <p className="text-muted-foreground truncate text-xs">{href}</p>
          ) : null}
        </div>
        <div className={ROW_META_CLASS}>
          <span className={TYPE_BADGE_CLASS}>
            {getDestinationTypeLabel(item.destinationType)}
          </span>
          <span className={VISIBILITY_BADGE_CLASS}>
            {getVisibilityRuleLabel(item.visibilityRuleId)}
          </span>
          {!item.isVisible ? (
            <span className={cn(STATUS_BADGE_CLASS, STATUS_HIDDEN_CLASS)}>
              {HIDDEN_STATUS_LABEL}
            </span>
          ) : null}
          {!item.isEnabled ? (
            <span className={cn(STATUS_BADGE_CLASS, STATUS_DISABLED_CLASS)}>
              {DISABLED_STATUS_LABEL}
            </span>
          ) : null}
        </div>
      </div>

      <div className={ROW_ACTIONS_CLASS}>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={ROW_ACTION_BUTTON_CLASS}
          aria-label={OUTDENT_LABEL}
          onClick={() => onOutdent(item.id)}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={ROW_ACTION_BUTTON_CLASS}
          aria-label={INDENT_LABEL}
          onClick={() => onIndent(item.id)}
        >
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={ROW_ACTION_BUTTON_CLASS}
          aria-label={EDIT_LABEL}
          onClick={() => onEdit(item.id)}
        >
          <Pencil className="h-4 w-4" aria-hidden />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={ROW_ACTION_BUTTON_CLASS}
          aria-label={DELETE_LABEL}
          onClick={() => onDelete(item.id)}
        >
          <Trash2 className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </li>
  );
}

function NavigationItemRowPreview({ row }: { row: FlatNavigationRow }) {
  return (
    <li
      className={ROW_CLASS}
      style={{ marginLeft: `${row.depth * INDENTATION_WIDTH}px` }}
    >
      <span className={DRAG_HANDLE_CLASS}>
        <GripVertical className="h-4 w-4" aria-hidden />
      </span>
      <div className={ROW_CONTENT_CLASS}>
        <NavIcon name={row.item.icon} className={ROW_ICON_CLASS} />
        <p className={ROW_TITLE_CLASS}>{row.item.label}</p>
      </div>
    </li>
  );
}

export function NavigationItemList({
  items,
  onReorder,
  onEdit,
  onDelete,
  onIndent,
  onOutdent,
}: NavigationItemListProps) {
  const flatRows = flattenNavigationItems(items);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: { active: { id: string | number } }) {
    setActiveId(String(event.active.id));
    setDragOffset(0);
  }

  function handleDragMove(event: DragMoveEvent) {
    setDragOffset(event.delta.x);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      onReorder(String(active.id), String(over.id), dragOffset);
    }
    setActiveId(null);
    setDragOffset(0);
  }

  function handleDragCancel() {
    setActiveId(null);
    setDragOffset(0);
  }

  const activeRow = flatRows.find((row) => row.id === activeId);

  if (flatRows.length === 0) {
    return (
      <div className={EMPTY_STATE_CLASS}>
        <p className={EMPTY_STATE_TITLE_CLASS}>{EMPTY_LIST_TITLE}</p>
        <p className={EMPTY_STATE_DESCRIPTION_CLASS}>
          {EMPTY_LIST_DESCRIPTION}
        </p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext
        items={flatRows.map((row) => row.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className={LIST_CLASS}>
          {flatRows.map((row) => (
            <SortableNavigationItemRow
              key={row.id}
              row={row}
              onEdit={onEdit}
              onDelete={onDelete}
              onIndent={onIndent}
              onOutdent={onOutdent}
            />
          ))}
        </ul>
      </SortableContext>
      <DragOverlay>
        {activeRow ? <NavigationItemRowPreview row={activeRow} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
