import { FC } from 'react';
import { TreeData, PlaceholderRefProps } from './types';
interface TreePlaceholderProps {
    tree: TreeData;
    flatTree: string[];
    itemHeight: number;
    placeholder: PlaceholderRefProps;
}
declare const TreePlaceholder: FC<TreePlaceholderProps>;
export default TreePlaceholder;
