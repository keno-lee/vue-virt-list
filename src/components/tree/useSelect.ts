import {
  nextTick,
  shallowRef,
  triggerRef,
  watch,
  type SetupContext,
  type ShallowRef,
} from 'vue-demi';
import {
  NODE_CHECK,
  NODE_CHECK_CHANGE,
  type TreeEmits,
  type TreeProps,
} from './useTree';
import type { ITreeInfo, ITreeNode, TreeKey, TreeNodeData } from './type';

export const useSelect = (
  props: TreeProps,
  emits: SetupContext<typeof TreeEmits>['emit'],
  tree: ShallowRef<ITreeInfo | undefined>,
) => {
  const selectedKeys = shallowRef<Set<TreeKey>>(new Set(['0']));
  const isSelected = (node: ITreeNode) => selectedKeys.value.has(node.key);

  return {
    isSelected,
  };
};
