<script setup lang="ts">
const props = defineProps({
  pkg: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <router-link
    class="pkg-link"
    :to="{ name: 'PackageDetails', params: { id: props.pkg.id } }"
  >
    <div class="pkg-card">
      <h4>{{ props.pkg.title }}</h4>
    </div>
  </router-link>
</template>

<style scoped>
.pkg-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.pkg-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.pkg-link {
  color: #2c3e50;
  text-decoration: none;
}
</style>
