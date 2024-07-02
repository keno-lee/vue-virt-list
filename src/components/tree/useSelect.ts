import {
  nextTick,
  shallowRef,
  triggerRef,
  watch,
  type SetupContext,
  type ShallowRef,
} from 'vue-demi';
import { NODE_SELECT, type TreeEmits, type TreeProps } from './useTree';
import type { ITreeInfo, ITreeNode, TreeKey, TreeNodeData } from './type';

export const useSelect = (
  props: TreeProps,
  emits: SetupContext<typeof TreeEmits>['emit'],
  flattenList: any,
) => {
  const { multiple, selectedKeys, fieldNames } = props;
  const selectedKeysSet = shallowRef<Set<TreeKey>>(new Set(selectedKeys));
  // const { key } = fieldNames;
  // console.log('key', key);
  // console.log('flattenList', flattenList.value);
  // const selectedNodes = flattenList.value.filter(
  //   (item: any) => selectedKeys.indexOf(item[key]) !== -1,
  // );
  // console.log('selectedNodes', selectedNodes);
  // const selectedNodesSet = shallowRef<Set<TreeNodeData>>(new Set());
  const isSelected = (node: ITreeNode) => selectedKeysSet.value.has(node.key);

  const toggleSelect = (node: ITreeNode) => {
    const selected = isSelected(node);
    if (isSelected(node)) {
      selectedKeysSet.value.delete(node.key);
    } else {
      if (!multiple) {
        selectedKeysSet.value.clear();
      }
      selectedKeysSet.value.add(node.key);
    }
    triggerRef(selectedKeysSet);
    selectedKeys.splice(0, selectedKeys.length, ...selectedKeysSet.value);
    // expose
    // TODO data 传什么
    emits(NODE_SELECT, selectedKeys, {
      // 当前节点
      node,
      // 当前节点是否被选中
      selected,
      // 所有被选中节点的集合
      selectedNodes: [],
    });
  };

  return {
    isSelected,
    toggleSelect,
  };
};
