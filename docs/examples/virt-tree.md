# VirtTree

## Basic

<!<< @/demos/tree/Basic.vue

## Selectable

selectable 模式下只能点击图标进行展开/折叠

```ts
type Props = {
  selectable: boolean; // 开启 展开/折叠
  multi: boolean; // 开启多选
};
```

<!<< @/demos/tree/Selectable.vue

## Focus

Focus 状态切换完全交由外部处理，内部仅给Node节点加上`.is-focused`类名

<!<< @/demos/tree/Focus.vue

## Checkbox

<!<< @/demos/tree/Checkbox.vue

## Filter

<!<< @/demos/tree/Filter.vue

## ICON Slot

提供展开状态下的图标

<!<< @/demos/tree/Icon.vue

## Content Slot

<!<< @/demos/tree/Content.vue

## Default Slot

自定义整个node节点

<!<< @/demos/tree/Default.vue

## showLine

展示节点连接线

<!<< @/demos/tree/ShowLine.vue

## Operations

对 tree 的各种操作方式

<!<< @/demos/tree/Operate.vue

## header&footer Slot

<!<< @/demos/tree/Slots.vue

## css variable
