# React Wonderful Tree

React component for expandable, sortable, and droppable file trees.

[Demo](https://codesandbox.io/s/react-wonderful-tree-example-1-cm2uop)

## Features

 * File upload support
 * Animated tree reorganization by DnD
 * Animated folder collapse/expand behavior
 * Mouse & touch support
 * Customizable node rendering
 * No opinionated styles
 
## Installation
 
```
npm i react-wonderful-tree
```

or

```
yarn add react-wonderful-tree
```

## Usage

```
const tree = {
  items: {
    apple: {
      id: 'appple,
      data: { title: 'Apple' }
    },
    fruits: {
      id: 'fruits',
      data: { title: 'Fruits' },
      children: ['apple'],
      isExpanded: true
    },
    root: {
      id: 'root',
      children: ['fruits'],
      isExpanded: true
    }
  },
  rootId: 'root'
}

<Tree
  tree={tree}
  itemHeight=24
  itemOffset=16
  renderItem={({ item, level, order, provided, snapshot } => {}}
  nestFiles={false}
  disableItemDrop={false}
  disableFileDrop={false}
  onItemDrop={({ source, target }) => {}}
  onFileDrop={({ data, target }) => {}}
  onCollapse={(id) => {}}
  onExpand={(id) => {}}
  onNestError={() => {}}
/>
```

## Configuration

### tree

**Type:**

```
interface TreeData {
  items: { [index: string]: ItemProps };
  rootId: string;
}

interface ItemProps {
  id: string;
  data?: any;
  children?: string[];
  isExpanded?: boolean;
}
```

**Description:**: Tree data object.

### itemHeight

**Type** `number`

**Description:** Item height.

### itemOffset (optional)

**Type** `number`

**Description:** Nested items offset. Set to `16` by default.

### renderItem

**Type**

```
({ item, level, order, provided, snapshot }: RenderItemProps) => React.ReactElement;

interface RenderItemProps {
  item: ItemProps;
  level: number;
  order: number;
  provided: DraggableProvidedProps;
  snapshot: DraggableSnapshotProps;
}
```
**Description:** Item rendering function.

### nestFiles (optional)

**Type** `boolean`

**Description:** If set to `true`, only folders will be allowed at the top level. Set to `false` by default.

### disableItemDrop (optional)

**Type** `boolean`

**Description:** If set to `true`, item reordering will be disabled. Set to `false` by default.

### disableFileDrop (optional)

**Type** `boolean`

**Description:** If set to `true`, file dropping will be disabled. Set to `false` by default.

### onItemDrop (optional)

**Type**

```
(source: SourceItemProps, target: TargetItemProps) => void;

interface SourceItemProps {
  index: number;
  pid: string | undefined;
}

interface TargetItemProps {
  index: number;
  pid: string | undefined;
}
```

**Description:** Function to run on item drop.

### onFileDrop (optional)

**Type**

```
(data: React.DragEvent<HTMLDivElement>, target: TargetItemProps) => void;
```

**Description:** Function to run on file drop.

### onCollapse (optional)

**Type**

```
(id: string) => void;
```

**Description:** Function to run on folder collapse.

### onExpand (optional)

**Type**

```
(id: string) => void;
```

**Description:** Function to run on folder expand.

### onNestError (optional)

**Type**

```
() => void;
```

**Description:** Function to run on item drop at the top level with `nestFiles` property set to `true`.

## Helpers

### collapseTreeItem

**Type**

```
(tree: TreeData, id: string): TreeData
```

**Description:** Collapses a folder and returns an updated `tree` object.

### expandTreeItem

**Type**

```
(tree: TreeData, id: string): TreeData
```

**Description:** Expands a folder and returns an updated `tree` object.

### updateTreeItems

**Type**

```
(tree: TreeData, source: SourceItemProps, target: TargetItemProps): TreeData
```

**Description:** Reorders items and returns an updated `tree` object.

### updateTreeFiles

**Type**

```
(tree: TreeData, files: ItemProps[], target: TargetItemProps): TreeData
```

**Description:** Inserts new files at a given position and returns an updated `tree` object.

## License

MIT

