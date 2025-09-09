<template>
  <div class="item" :class="{ 'item--keep-alive': useKeepAlive }">
    <div class="item-header">
      <div class="item-title">
        <span class="item-id">#{{ itemData.id }}</span>
        <span class="item-name">{{ itemData.name }}</span>
      </div>
      <!-- <div class="item-actions">
        <button class="delete-btn" @click="$emit('deleteItem', itemData.id)">
          删除
        </button>
      </div> -->
    </div>

    <div class="item-content">
      <p class="item-description">{{ itemData.description }}</p>
      <div class="item-meta">
        <span class="item-index">索引: {{ index }}</span>
        <span class="item-timestamp"
          >时间: {{ formatTimestamp(itemData.timestamp) }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface ListItem {
  id: number;
  name: string;
  description: string;
  timestamp: number;
}

interface Props {
  itemData: ListItem;
  index: number;
  useKeepAlive: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  deleteItem: [id: number];
}>();

function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString();
}
</script>

<style lang="scss" scoped>
.item {
  padding: 16px;
  border-bottom: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  transition: all 0.3s ease;

  &:hover {
    background: var(--vp-c-bg-soft);
  }

  &--keep-alive {
    border-left: 4px solid var(--vp-c-brand);
  }
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.item-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.item-id {
  font-weight: bold;
  color: var(--vp-c-brand);
  font-size: 16px;
}

.item-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 16px;
}

.item-actions {
  .delete-btn {
    padding: 4px 8px;
    border: 1px solid var(--vp-c-danger);
    border-radius: 4px;
    background: transparent;
    color: var(--vp-c-danger);
    cursor: pointer;
    font-size: 12px;

    &:hover {
      background: var(--vp-c-danger);
      color: white;
    }
  }
}

.item-content {
  margin-bottom: 12px;
}

.item-description {
  margin: 0 0 8px 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.5;
}

.item-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--vp-c-text-3);

  .item-index {
    font-weight: 500;
  }

  .item-timestamp {
    font-family: monospace;
  }
}

.item-status {
  display: flex;
  justify-content: flex-end;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &--keep-alive {
    background: var(--vp-c-brand);
    color: white;
  }

  &--normal {
    background: var(--vp-c-text-3);
    color: white;
  }
}
</style>
