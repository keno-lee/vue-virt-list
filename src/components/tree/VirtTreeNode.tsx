import {
  defineComponent,
  type ExtractPropTypes,
  type PropType,
  type SetupContext,
} from 'vue-demi';
import type { ITreeNode } from './type';
import { _h, _h2Slot, getSlot } from '../../util';
import './tree.css';

export const treeNodeProps = {
  node: {
    type: Object as PropType<ITreeNode>,
    default: () => ({}),
    required: true,
  },
  expanded: {
    type: Boolean,
    default: false,
  },
  indent: {
    type: Number,
    default: 16,
    required: true,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
  showCheckbox: {
    type: Boolean,
    default: false,
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
  hiddenExpandIcon: {
    type: Boolean,
    default: false,
  },

  selectable: {
    type: Boolean,
    default: false,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
};

export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>;

export default defineComponent({
  name: 'VirtTreeNode',
  props: treeNodeProps,
  setup(props: TreeNodeProps, ctx: SetupContext) {
    const handleClick = (e: Event) => {
      e.stopPropagation();
      ctx.emit('select', props.node, e);
    };

    const handleToggle = (e: Event) => {
      e.stopPropagation();
      ctx.emit('toggle', props.node);
    };

    const onChange = (e: Event) => {
      e.stopPropagation();
      ctx.emit('check', props.node, !props.isChecked);
    };

    return {
      handleClick,
      onChange,
      handleToggle,
    };
  },
  render() {
    const { handleClick, onChange, handleToggle } = this;
    const {
      indent,
      isChecked,
      showCheckbox,
      indeterminate,
      expanded,
      node,
      hiddenExpandIcon,
      isSelected,
    } = this.$props as TreeNodeProps;

    const defaultIcon = _h(
      'svg',
      {
        width: '20',
        height: '20',
        viewBox: '0 0 20 20',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      _h('path', {
        d: 'M14.5632 7.72544L10.539 13.2587C10.2728 13.6247 9.72696 13.6247 9.46073 13.2587L5.43658 7.72544C5.11611 7.28479 5.43088 6.66666 5.97573 6.66666L14.024 6.66666C14.5689 6.66666 14.8837 7.28479 14.5632 7.72544Z',
        fill: '#6B7075',
      }),
    );

    const slotIcon = _h(
      'div',
      {
        class: {
          'virt-tree-icon-wrapper': true,
          'is-expanded': expanded,
        },
        style: {
          opacity: node.isLeaf || hiddenExpandIcon ? 0 : 1,
        },
        attrs: {
          onClick: handleToggle,
        },
      },
      [
        _h(
          'div',
          {
            class: 'virt-tree-icon',
          },
          getSlot(this, 'icon')
            ? getSlot(this, 'icon')?.(node, expanded)
            : defaultIcon,
        ),
      ],
    );

    const slotCheckbox = showCheckbox
      ? _h('div', {
          class: `checkbox ${isChecked ? 'is-checked' : ''} ${indeterminate ? 'is-indeterminate' : ''}`,
          onClick: onChange,
        })
      : null;

    const slotContent = getSlot(this, 'content')
      ? getSlot(this, 'content')?.(node)
      : _h(
          'div',
          {
            class: 'virt-tree-node-content',
          },
          node.title,
        );

    return getSlot(this, 'default')
      ? getSlot(this, 'default')?.(node, node!.data, expanded)
      : _h(
          'div',
          {
            class: {
              'virt-tree-node': true,
              'is-selected': isSelected,
              'is-disabled': node.disabled,
            },
            style: { paddingLeft: `${(node!.level - 1) * indent}px` },
            attrs: {
              onClick: handleClick,
            },
          },
          [slotIcon, slotCheckbox, slotContent],
        );
  },
});
