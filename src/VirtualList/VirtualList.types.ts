import { CSSProperties } from "react";

export interface RowRendererProps {
  style: CSSProperties;
  index: number;
}

export interface RowRenderer {
  (args: RowRendererProps): JSX.Element;
}

export interface VirtualListProps {
  rowRenderer: RowRenderer;
  itemsCount: number;
  itemHeight: number;
}
