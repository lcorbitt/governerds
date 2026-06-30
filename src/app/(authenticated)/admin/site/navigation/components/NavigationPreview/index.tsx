"use client";

import { ExternalLink, Menu } from "lucide-react";

import { NavIcon } from "@/components/shared/IconPickerField";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type {
  NavigationItem,
  NavigationTreeNode,
} from "../NavigationBuilder/types";
import {
  buildTree,
  filterPreviewItems,
  isStructuralDestination,
  resolveDestinationHref,
} from "../NavigationBuilder/utils";
import {
  BRAND_NAME,
  EMPTY_PREVIEW_CLASS,
  EMPTY_PREVIEW_MESSAGE,
  EXTERNAL_ICON_CLASS,
  LOGIN_LINK_LABEL,
  MOBILE_BRAND_CLASS,
  MOBILE_CHILD_LINK_CLASS,
  MOBILE_DIVIDER_CLASS,
  MOBILE_DRAWER_CLASS,
  MOBILE_HEADER_CLASS,
  MOBILE_HEADING_CLASS,
  MOBILE_LINK_CLASS,
  MOBILE_MENU_BUTTON_CLASS,
  MOBILE_MENU_LABEL,
  MOBILE_PREVIEW_CLASS,
  MOBILE_TAB_LABEL,
  PREVIEW_DIVIDER_CLASS,
  PREVIEW_FRAME_CLASS,
  PREVIEW_HEADING_CLASS,
  PREVIEW_ICON_CLASS,
  SIGNUP_LINK_LABEL,
  TOP_NAV_BRAND_CLASS,
  TOP_NAV_CHILD_CLASS,
  TOP_NAV_CHILDREN_CLASS,
  TOP_NAV_HEADER_CLASS,
  TOP_NAV_LINKS_CLASS,
  TOP_NAV_LINK_CLASS,
  TOP_NAV_LOGIN_CLASS,
  TOP_NAV_PREVIEW_CLASS,
  TOP_NAV_ROW_CLASS,
  TOP_NAV_ACTIONS_CLASS,
  TOP_NAV_SIGNUP_CLASS,
  TOP_NAV_TAB_LABEL,
} from "./constants";

interface NavigationPreviewProps {
  items: NavigationItem[];
}

interface PreviewLinkProps {
  item: NavigationTreeNode;
  className: string;
  childClassName?: string;
}

function PreviewLink({ item, className, childClassName }: PreviewLinkProps) {
  const href = resolveDestinationHref(item);
  const linkClass = childClassName ?? className;
  const opensInNewTab = item.metadata.opensInNewTab ?? false;

  if (item.destinationType === "divider") {
    return <hr className={PREVIEW_DIVIDER_CLASS} />;
  }

  if (item.destinationType === "heading") {
    return <p className={PREVIEW_HEADING_CLASS}>{item.label}</p>;
  }

  return (
    <span className={linkClass}>
      <NavIcon name={item.icon} className={PREVIEW_ICON_CLASS} />
      <span>{item.label}</span>
      {opensInNewTab ? (
        <ExternalLink className={EXTERNAL_ICON_CLASS} aria-hidden />
      ) : null}
      {!href ? (
        <span className="text-muted-foreground text-xs">
          ({item.destinationType})
        </span>
      ) : null}
    </span>
  );
}

function TopNavPreview({ nodes }: { nodes: NavigationTreeNode[] }) {
  const linkableNodes = nodes.filter(
    (node) => !isStructuralDestination(node.destinationType),
  );
  const hasChildren = nodes.some((node) => node.children.length > 0);

  return (
    <>
      <div className={TOP_NAV_HEADER_CLASS}>
        <div className={TOP_NAV_ROW_CLASS}>
          <p className={TOP_NAV_BRAND_CLASS}>{BRAND_NAME}</p>
          <div className={TOP_NAV_LINKS_CLASS}>
            {linkableNodes.map((node) => (
              <span key={node.id} className={TOP_NAV_LINK_CLASS}>
                {node.label}
              </span>
            ))}
          </div>
          <div className={TOP_NAV_ACTIONS_CLASS}>
            <span className={TOP_NAV_LOGIN_CLASS}>{LOGIN_LINK_LABEL}</span>
            <span className={TOP_NAV_SIGNUP_CLASS}>{SIGNUP_LINK_LABEL}</span>
          </div>
        </div>
      </div>
      {hasChildren ? (
        <div className={TOP_NAV_CHILDREN_CLASS}>
          {nodes.flatMap((node) =>
            node.children.map((child) => (
              <span key={child.id} className={TOP_NAV_CHILD_CLASS}>
                {child.label}
              </span>
            )),
          )}
        </div>
      ) : null}
    </>
  );
}

function MobilePreviewTree({ nodes }: { nodes: NavigationTreeNode[] }) {
  return (
    <>
      {nodes.map((node) => (
        <div key={node.id}>
          {node.destinationType === "divider" ? (
            <hr className={MOBILE_DIVIDER_CLASS} />
          ) : node.destinationType === "heading" ? (
            <p className={MOBILE_HEADING_CLASS}>{node.label}</p>
          ) : (
            <PreviewLink item={node} className={MOBILE_LINK_CLASS} />
          )}
          {node.children.length > 0 ? (
            <div className="flex flex-col gap-1">
              {node.children.map((child) => (
                <PreviewLink
                  key={child.id}
                  item={child}
                  className={MOBILE_LINK_CLASS}
                  childClassName={MOBILE_CHILD_LINK_CLASS}
                />
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
}

export function NavigationPreview({ items }: NavigationPreviewProps) {
  const previewTree = buildTree(filterPreviewItems(items));

  if (previewTree.length === 0) {
    return (
      <div className={PREVIEW_FRAME_CLASS}>
        <div className={EMPTY_PREVIEW_CLASS}>{EMPTY_PREVIEW_MESSAGE}</div>
      </div>
    );
  }

  return (
    <Tabs defaultValue="top-nav" className="flex min-h-0 flex-1 flex-col gap-4">
      <TabsList>
        <TabsTrigger value="top-nav">{TOP_NAV_TAB_LABEL}</TabsTrigger>
        <TabsTrigger value="mobile">{MOBILE_TAB_LABEL}</TabsTrigger>
      </TabsList>

      <TabsContent value="top-nav" className="flex min-h-0 flex-1 flex-col">
        <div className={PREVIEW_FRAME_CLASS}>
          <div className={TOP_NAV_PREVIEW_CLASS}>
            <TopNavPreview nodes={previewTree} />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="mobile" className="flex min-h-0 flex-1 flex-col">
        <div className={PREVIEW_FRAME_CLASS}>
          <div className={MOBILE_PREVIEW_CLASS}>
            <div className={MOBILE_HEADER_CLASS}>
              <p className={MOBILE_BRAND_CLASS}>{BRAND_NAME}</p>
              <span className={MOBILE_MENU_BUTTON_CLASS}>
                <Menu className="mr-2 inline h-4 w-4" aria-hidden />
                {MOBILE_MENU_LABEL}
              </span>
            </div>
            <div className={MOBILE_DRAWER_CLASS}>
              <MobilePreviewTree nodes={previewTree} />
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
