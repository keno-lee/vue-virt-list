<script lang="ts" setup>
import { onMounted, ref, shallowRef } from 'vue';
import { VirtTree } from 'vue-virt-list';

type Data = {
  id: string | number;
  name: string;
  disabled?: boolean;
  children?: Data;
}[];

const customFieldNames = {
  key: 'id',
  title: 'name',
};

const data = shallowRef<Data>([]);
onMounted(() => {
  data.value = Array.from({ length: 40 }).map((_, i) => ({
    id: String(i),
    name: `Node-${i}`,
    children: Array.from({ length: 3 }).map((_, index) => ({
      id: `${i}-${index}`,
      name: `Node-${i}-${index}`,
      children: Array.from({ length: 2 }).map((_, indexChild) => ({
        id: `${i}-${index}-${indexChild}`,
        name: `Node-${i}-${index}-${indexChild}`,
      })),
    })),
  }));

  data.value[0].disabled = true;
});

const virtTreeRef = ref<typeof VirtTree>();

// 可传可不传
const selectedKeys = ref<(number | string)[]>(['1']);

function onSelect(keys: number[]) {
  console.log('keys', keys);
}
</script>

<template>
  <div class="demo-tree">
    <div>
      <span>选中keys：</span>
      <span>[{{ selectedKeys.join(', ') }}]</span>
    </div>
    <VirtTree
      ref="virtTreeRef"
      :data="data"
      :fieldNames="customFieldNames"
      :indent="20"
      selectable
      multiple
      :selectedKeys="selectedKeys"
      @select="onSelect"
    >
    </VirtTree>
  </div>
</template>

<style scoped lang="scss">
.demo-tree {
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .tree-btn-container {
    display: flex;
    flex: 1;
    flex-direction: row-reverse;
    justify-content: space-between;
    padding: 12px 8px;
    gap: 8px;
    .input-label {
      font-size: 14px;
    }
    .btn-item {
      padding: 4px 12px;
      cursor: pointer;
      border: 1px solid #ececec;
      border-radius: 4px;
      font-size: 14px;
    }
    .input-container {
      display: flex;
      gap: 8px;
      align-items: center;
      input {
        height: 100%;
        border: 1px solid #ececec;
        border-radius: 4px;
        padding: 0 8px;
      }
    }
  }
}
</style>
