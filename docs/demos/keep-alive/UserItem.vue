<template>
  <div class="user-item">
    <div class="user-header">
      <div class="user-avatar">
        <img :src="userData.avatar" :alt="userData.name" />
      </div>
      <div class="user-info">
        <div class="user-name">{{ userData.name }}</div>
        <div class="user-email">{{ userData.email }}</div>
        <div class="user-department">{{ userData.department }}</div>
      </div>
      <!-- <div class="user-actions">
        <button class="delete-btn" @click="$emit('deleteUser', userData.id)">
          删除
        </button>
      </div> -->
    </div>

    <div class="user-meta">
      <span class="user-index">索引: {{ index }}</span>
      <span class="user-join-date"
        >入职时间: {{ formatDate(userData.joinDate) }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  department: string;
  joinDate: number;
}

interface Props {
  userData: User;
  index: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  deleteUser: [id: number];
}>();

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('zh-CN');
}
</script>

<style lang="scss" scoped>
.user-item {
  padding: 16px;
  border-bottom: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  transition: all 0.3s ease;
  border-left: 4px solid var(--vp-c-brand);

  &:hover {
    background: var(--vp-c-bg-soft);
  }
}

.user-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.user-avatar {
  margin-right: 16px;

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
  }
}

.user-info {
  flex: 1;

  .user-name {
    font-weight: 600;
    color: var(--vp-c-text-1);
    font-size: 16px;
    margin-bottom: 4px;
  }

  .user-email {
    color: var(--vp-c-text-2);
    font-size: 14px;
    margin-bottom: 2px;
  }

  .user-department {
    color: var(--vp-c-brand);
    font-size: 12px;
    font-weight: 500;
  }
}

.user-actions {
  .delete-btn {
    padding: 6px 12px;
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

.user-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;

  .user-index {
    font-weight: 500;
  }

  .user-join-date {
    font-family: monospace;
  }
}

.user-status {
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
}
</style>
