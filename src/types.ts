import React, { FC } from 'react';

//
// Tree
//

export interface TreeData {
  items: { [index: string]: ItemProps };
  rootId: string;
}

export interface TreeProps {
  tree: TreeData;
  itemHeight: number;
  itemOffset?: number;
  renderItem: ({ item, level, order, provided, snapshot }: RenderItemProps) => React.ReactElement;
  nestFiles?: boolean;
  replaceFiles?: boolean;
  disableItemDrop?: boolean;
  disableFileDrop?: boolean;
  onItemDrop: ItemDropEvent;
  onFileDrop?: FileDropEvent;
  onCollapse?: FolderCollapseEvent;
  onExpand?: FolderExpandEvent;
  onNestError?: NestErrorEvent;
}

export interface ItemProps {
  id: string;
  data?: any;
  children?: string[];
  isExpanded?: boolean;
}

export interface RenderItemProps {
  item: ItemProps;
  level: number;
  order: number;
  provided: DraggableProvidedProps;
  snapshot: DraggableSnapshotProps;
}

//
// Droppable
//

export interface DroppableProps {
  tree: TreeData;
  flatTree: string[];
  itemHeight: number;
  itemOffset: number;
  nestFiles: boolean;
  replaceFiles: boolean;
  disableItemDrop: boolean;
  disableFileDrop: boolean;
  onItemDrop: ItemDropEvent;
  onFileDrop: FileDropEvent;
  onNestError: NestErrorEvent;
  children: (props: DroppableChildrenFunctionProps) => React.ReactNode;
}

export interface DroppableDraggableProps {
  droppableRef: React.RefObject<HTMLDivElement>;
  rect: RectRefProps;
  items: RenderedItemsRefProps;
  source: DragSourceRefProps;
  target: DragTargetRefProps;
  currentOrderState: number[];
  setCurrentOrderState: (order: number[]) => void;
  dropOrderState: number;
  isDragInProgress: { current: boolean };
  isDragInProgressState: boolean;
  setDragInProgressState: (isDragInProgress: boolean) => void;
  handleMove: (e) => void;
  handleEnd: (e) => void;
  disableItemDrop: boolean;
}

export interface DroppablePlaceholderProps {
  placeholder: PlaceholderRefProps;
}

export interface DroppableProvidedProps {
  draggableProps: DroppableDraggableProps;
  placeholderProps: DroppablePlaceholderProps;
}

export interface DroppableChildrenFunctionProps {
  provided: DroppableProvidedProps;
}

//
// Draggable
//

export interface DraggableProps {
  flatTree: string[];
  item: ItemProps;
  id: string;
  pid: string;
  index: number;
  order: number;
  level: number;
  itemHeight: number;
  itemOffset: number;
  onCollapse: FolderCollapseEvent;
  onExpand: FolderExpandEvent;
  isExpanded: boolean;
  tabIndex: number;
  droppableRef: React.RefObject<HTMLDivElement>;
  rect: RectRefProps;
  items: RenderedItemsRefProps;
  source?: DragSourceRefProps;
  target?: DragTargetRefProps;
  currentOrderState?: number[];
  setCurrentOrderState?: (state: number[]) => void;
  dropOrderState?: number;
  isDragInProgress?: { current: boolean };
  isDragInProgressState?: boolean;
  setDragInProgressState?: (state: boolean) => void;
  handleMove: (e) => void;
  handleEnd: (e) => void;
  disableItemDrop?: boolean;
  children: (props: DraggableChildrenFunctionProps) => React.ReactNode;
}

export interface DraggableDragHandleProps {
  style: React.CSSProperties;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
}

export interface DraggableCollapseProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  isExpanded: boolean;
}

export interface DraggableProvidedProps {
  dragHandleProps: DraggableDragHandleProps;
  collapseProps: DraggableCollapseProps;
}

export interface DraggableSnapshotProps {
  isDragging: boolean;
  isDropping: boolean;
}

export interface DraggableChildrenFunctionProps {
  provided: DraggableProvidedProps;
  snapshot: DraggableSnapshotProps;
}

//
// Collapse
//

export interface CollapseProps {
  height: number;
  isSmooth: boolean;
  isExpanded: boolean;
  children: React.ReactNode;
}

export enum CollapseState {
  entering = 'entering',
  entered = 'entered',
  exiting = 'exiting',
  exited = 'exited',
}

//
// Block
//

export interface BlockProps {
  tree: TreeData;
  flatTree: string[];
  id: string;
  pid: string;
  index: number;
  level: number;
  itemHeight: number;
  itemOffset: number;
  renderItem: FC<RenderItemProps>;
  onCollapse: FolderCollapseEvent;
  onExpand: FolderExpandEvent;
  draggableProps: DroppableDraggableProps;
}

//
// Item
//

export interface RenderedItemProps {
  ref: React.RefObject<HTMLDivElement>;
  id?: string;
  pid?: string;
  index?: number;
  order: number;
  level?: number;
  children?: string[];
  isExpanded?: boolean;
  rect: Rect;
}

//
// Drag source and target
//

export interface DragSourceProps {
  order: number;
  mouse?: { x: number; y: number };
}

export interface DragTargetProps {
  order: number;
  hover?: 'top' | 'bottom';
}

//
// Final source and target
//

export interface SourceItemProps {
  index: number;
  pid: string | undefined;
}

export interface TargetItemProps {
  index: number;
  pid: string | undefined;
  replace?: boolean;
}

//
// Rect
//

export interface Rect {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
}

//
// Refs
//

export interface DragSourceRefProps {
  current: DragSourceProps;
}

export interface DragTargetRefProps {
  current: DragTargetProps;
}

export interface PlaceholderRefProps {
  current: RenderedItemProps;
}

export interface RenderedItemsRefProps {
  current: RenderedItemProps[];
}

export interface RectRefProps {
  current: Rect;
}

//
// Events
//

export type FolderExpandEvent = (id: string, isSmooth?: boolean) => void;
export type FolderCollapseEvent = (id: string, isSmooth?: boolean) => void;
export type ItemDropEvent = (source: SourceItemProps, target: TargetItemProps) => void;
export type FileDropEvent = (data: React.DragEvent<HTMLDivElement>, target: TargetItemProps) => void;
export type NestErrorEvent = () => void;
