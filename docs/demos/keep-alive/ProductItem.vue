<template>
  <div class="product-item">
    <div class="product-header">
      <div class="product-image">
        <img :src="productData.image" :alt="productData.name" />
      </div>
      <div class="product-info">
        <div class="product-name">{{ productData.name }}</div>
        <div class="product-description">{{ productData.description }}</div>
        <div class="product-category">{{ productData.category }}</div>
      </div>
      <!-- <div class="product-actions">
        <button
          class="delete-btn"
          @click="$emit('deleteProduct', productData.id)"
        >
          删除
        </button>
      </div> -->
    </div>

    <div class="product-details">
      <div class="product-price">¥{{ productData.price }}</div>
      <div class="product-stock">库存: {{ productData.stock }}</div>
      <div class="product-meta">
        <span class="product-index">索引: {{ index }}</span>
        <span class="product-create-date"
          >创建时间: {{ formatDate(productData.createDate) }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  createDate: number;
}

interface Props {
  productData: Product;
  index: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  deleteProduct: [id: number];
}>();

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('zh-CN');
}
</script>

<style lang="scss" scoped>
.product-item {
  padding: 16px;
  border-bottom: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  transition: all 0.3s ease;
  border-left: 4px solid var(--vp-c-brand);

  &:hover {
    background: var(--vp-c-bg-soft);
  }
}

.product-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
}

.product-image {
  margin-right: 16px;

  img {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    object-fit: cover;
  }
}

.product-info {
  flex: 1;

  .product-name {
    font-weight: 600;
    color: var(--vp-c-text-1);
    font-size: 16px;
    margin-bottom: 4px;
  }

  .product-description {
    color: var(--vp-c-text-2);
    font-size: 14px;
    line-height: 1.4;
    margin-bottom: 4px;
  }

  .product-category {
    color: var(--vp-c-brand);
    font-size: 12px;
    font-weight: 500;
  }
}

.product-actions {
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

.product-details {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;

  .product-price {
    font-size: 18px;
    font-weight: 600;
    color: var(--vp-c-brand);
  }

  .product-stock {
    font-size: 14px;
    color: var(--vp-c-text-2);
  }

  .product-meta {
    margin-left: auto;
    display: flex;
    gap: 16px;
    font-size: 12px;
    color: var(--vp-c-text-3);

    .product-index {
      font-weight: 500;
    }

    .product-create-date {
      font-family: monospace;
    }
  }
}

.product-status {
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
