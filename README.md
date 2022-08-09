# React Wonderful Tree

React component for expandable, sortable, and droppable file trees. 

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
 
 ## Examples
 
 https://codesandbox.io/s/react-wonderful-tree-example-1-cm2uop
 
 ## Data structure
 
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

### Example

```
const tree = {
  items: {
    apple: {
      id: "apple",
      data: { title: "Apple" }
    },
    fruits: {
      id: "fruits",
      data: { title: "Fruits" },
      children: ["apple"],
      isExpanded: true
    },
    root: {
      id: "root",
      children: ["fruits"],
      isExpanded: true
    }
  },
  rootId: "root"
});
```
 
 
 ## License
 
 MIT
 
