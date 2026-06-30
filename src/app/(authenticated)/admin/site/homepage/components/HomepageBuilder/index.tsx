"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  BUILDER_GRID_CLASS,
  EDITOR_PANEL_LABEL,
  EMPTY_STATE_CLASS,
  EMPTY_STATE_DESCRIPTION,
  EMPTY_STATE_DESCRIPTION_CLASS,
  EMPTY_STATE_TITLE,
  EMPTY_STATE_TITLE_CLASS,
  PAGE_CLASS,
  PANEL_CLASS,
  PANEL_LABEL_CLASS,
  PREVIEW_PANEL_LABEL,
  PREVIEW_PLACEHOLDER,
  PREVIEW_PLACEHOLDER_CLASS,
  SUBTITLE,
  SUBTITLE_CLASS,
  TITLE,
  TITLE_CLASS,
} from "./constants";
import { useHomepageBuilder } from "./useHomepageBuilder";

export function HomepageBuilder() {
  useHomepageBuilder();

  return (
    <div className={PAGE_CLASS}>
      <div>
        <h1 className={TITLE_CLASS}>{TITLE}</h1>
        <p className={SUBTITLE_CLASS}>{SUBTITLE}</p>
      </div>

      <div className={BUILDER_GRID_CLASS}>
        <div className={PANEL_CLASS}>
          <p className={PANEL_LABEL_CLASS}>{EDITOR_PANEL_LABEL}</p>
          <Card>
            <CardHeader>
              <CardTitle>{EMPTY_STATE_TITLE}</CardTitle>
              <CardDescription>{EMPTY_STATE_DESCRIPTION}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={EMPTY_STATE_CLASS}>
                <p className={EMPTY_STATE_TITLE_CLASS}>{EMPTY_STATE_TITLE}</p>
                <p className={EMPTY_STATE_DESCRIPTION_CLASS}>
                  {EMPTY_STATE_DESCRIPTION}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className={PANEL_CLASS}>
          <p className={PANEL_LABEL_CLASS}>{PREVIEW_PANEL_LABEL}</p>
          <div className={PREVIEW_PLACEHOLDER_CLASS}>{PREVIEW_PLACEHOLDER}</div>
        </div>
      </div>
    </div>
  );
}
