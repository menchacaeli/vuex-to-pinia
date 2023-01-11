<script setup lang="ts">
import { onMounted } from "vue"
import { usePackageStore } from "../stores/package-store"
import { useRouter } from "vue-router"
import PackageCard from "../components/PackageCard.vue"

// Access State
const router = useRouter()
const { packages, fetchPackages } = usePackageStore()

fetchPackages().catch(error => {
  router.push({
    name: 'ErrorDisplay',
    params: { error: error }
  })
})

onMounted(async () => {

})
</script>

<template>
  <div class="package-list">
    <PackageCard v-for="item in packages" :key="item.id" :pkg="item" />
  </div>
</template>

<style scoped>
.package-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
