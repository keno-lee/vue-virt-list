<template>
  <div class="main">
    <div class="demo-header">
      <p>演示虚拟列表与Vue keep-alive组件的结合使用，支持tab切换保留列表状态</p>
    </div>

    <!-- Tab切换 -->
    <div class="tab-container">
      <div class="tab-header">
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'list1' }"
          @click="switchTab('list1')"
        >
          列表页面 1
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'list2' }"
          @click="switchTab('list2')"
        >
          列表页面 2
        </button>
      </div>

      <!-- Tab内容区域 -->
      <div class="tab-content">
        <keep-alive>
          <component
            :is="currentTabComponent"
            :key="activeTab"
            @update-status="updateStatus"
          />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, markRaw } from 'vue';
import ListPage1 from './ListPage1.vue';
import ListPage2 from './ListPage2.vue';

const activeTab = ref<'list1' | 'list2'>('list1');
const list1Status = ref('未初始化');
const list2Status = ref('未初始化');

const currentTabComponent = computed(() => {
  return activeTab.value === 'list1' ? markRaw(ListPage1) : markRaw(ListPage2);
});

function switchTab(tab: 'list1' | 'list2') {
  activeTab.value = tab;
}

function updateStatus(tab: 'list1' | 'list2', status: string) {
  if (tab === 'list1') {
    list1Status.value = status;
  } else {
    list2Status.value = status;
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 20px;
}

.demo-header {
  margin-bottom: 20px;

  h3 {
    margin: 0 0 10px 0;
    color: var(--vp-c-text-1);
  }

  p {
    margin: 0;
    color: var(--vp-c-text-2);
    font-size: 14px;
  }
}

.tab-container {
  margin-bottom: 20px;
}

.tab-header {
  display: flex;
  border-bottom: 2px solid var(--vp-c-border);
  margin-bottom: 20px;

  .tab-btn {
    padding: 12px 24px;
    border: none;
    background: transparent;
    color: var(--vp-c-text-2);
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;

    &:hover {
      color: var(--vp-c-text-1);
      background: var(--vp-c-bg-soft);
    }

    &.active {
      color: var(--vp-c-brand);
      border-bottom-color: var(--vp-c-brand);
      background: var(--vp-c-bg-soft);
    }
  }
}

.tab-content {
  height: 1000px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  overflow: hidden;
}

.status-info {
  margin-bottom: 20px;
  padding: 15px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}
</style>
