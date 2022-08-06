import React, { FC } from 'react';

interface TreeData {
    items: {
        [index: string]: ItemProps;
    };
    rootId: string;
}
interface TreeProps {
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
interface ItemProps {
    id: string;
    data?: any;
    children?: string[];
    isExpanded?: boolean;
}
interface RenderItemProps {
    item: ItemProps;
    level: number;
    order: number;
    provided: DraggableProvidedProps;
    snapshot: DraggableSnapshotProps;
}
interface DroppableProps {
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
interface DroppableDraggableProps {
    droppableRef: React.RefObject<HTMLDivElement>;
    rect: RectRefProps;
    items: RenderedItemsRefProps;
    source: DragSourceRefProps;
    target: DragTargetRefProps;
    currentOrderState: number[];
    setCurrentOrderState: (order: number[]) => void;
    dropOrderState: number;
    isDragInProgress: {
        current: boolean;
    };
    isDragInProgressState: boolean;
    setDragInProgressState: (isDragInProgress: boolean) => void;
    handleMove: (e: any) => void;
    handleEnd: (e: any) => void;
    disableItemDrop: boolean;
}
interface DroppablePlaceholderProps {
    placeholder: PlaceholderRefProps;
}
interface DroppableProvidedProps {
    draggableProps: DroppableDraggableProps;
    placeholderProps: DroppablePlaceholderProps;
}
interface DroppableChildrenFunctionProps {
    provided: DroppableProvidedProps;
}
interface DraggableProps {
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
    isDragInProgress?: {
        current: boolean;
    };
    isDragInProgressState?: boolean;
    setDragInProgressState?: (state: boolean) => void;
    handleMove: (e: any) => void;
    handleEnd: (e: any) => void;
    disableItemDrop?: boolean;
    children: (props: DraggableChildrenFunctionProps) => React.ReactNode;
}
interface DraggableDragHandleProps {
    style: React.CSSProperties;
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
    onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
}
interface DraggableCollapseProps {
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    isExpanded: boolean;
}
interface DraggableProvidedProps {
    dragHandleProps: DraggableDragHandleProps;
    collapseProps: DraggableCollapseProps;
}
interface DraggableSnapshotProps {
    isDragging: boolean;
    isDropping: boolean;
}
interface DraggableChildrenFunctionProps {
    provided: DraggableProvidedProps;
    snapshot: DraggableSnapshotProps;
}
interface BlockProps {
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
interface RenderedItemProps {
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
interface DragSourceProps {
    order: number;
    mouse?: {
        x: number;
        y: number;
    };
}
interface DragTargetProps {
    order: number;
    hover?: 'top' | 'bottom';
}
interface SourceItemProps {
    index: number;
    pid: string | undefined;
}
interface TargetItemProps {
    index: number;
    pid: string | undefined;
    replace?: boolean;
}
interface Rect {
    top: number;
    right: number;
    bottom: number;
    left: number;
    width: number;
    height: number;
}
interface DragSourceRefProps {
    current: DragSourceProps;
}
interface DragTargetRefProps {
    current: DragTargetProps;
}
interface PlaceholderRefProps {
    current: RenderedItemProps;
}
interface RenderedItemsRefProps {
    current: RenderedItemProps[];
}
interface RectRefProps {
    current: Rect;
}
declare type FolderExpandEvent = (id: string, isSmooth?: boolean) => void;
declare type FolderCollapseEvent = (id: string, isSmooth?: boolean) => void;
declare type ItemDropEvent = (source: SourceItemProps, target: TargetItemProps) => void;
declare type FileDropEvent = (data: React.DragEvent<HTMLDivElement>, target: TargetItemProps) => void;
declare type NestErrorEvent = () => void;

declare const Tree: FC<TreeProps>;

declare const TreeBlock: FC<BlockProps>;

declare const TreeDraggable: FC<DraggableProps>;

declare const TreeDroppable: FC<DroppableProps>;

interface TreePlaceholderProps {
    tree: TreeData;
    flatTree: string[];
    itemHeight: number;
    placeholder: PlaceholderRefProps;
}
declare const TreePlaceholder: FC<TreePlaceholderProps>;

declare function collapseTree$1(tree: TreeData, id: string): TreeData;

declare function collapseTree(tree: TreeData, id: string): TreeData;

declare function flattenTree(tree: TreeData, children: string[]): string[];

declare function getChildrenCount(tree: TreeData, id: string, counter?: number): number;

declare function updateTreeFiles(tree: TreeData, files: ItemProps[], target: TargetItemProps): TreeData;

declare function updateTreeItems(tree: TreeData, source: SourceItemProps, target: TargetItemProps): TreeData;

export { Tree, TreeBlock, TreeDraggable, TreeDroppable, TreePlaceholder, collapseTree$1 as collapseTreeItem, collapseTree as expandTreeItem, flattenTree, getChildrenCount, updateTreeFiles, updateTreeItems };
