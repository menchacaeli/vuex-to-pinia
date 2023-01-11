<script setup lang="ts">
import {computed, onMounted, onUnmounted} from "vue";
import { usePackageStore } from "../stores/package-store";
import { useRouter } from "vue-router";

const router = useRouter()
const packageStore = usePackageStore()

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

// Computed property to get selectedPackage
const selectedPackage = computed(() => packageStore.selectedPackage)

onMounted(async () => {
  packageStore.fetchPackage(props.id).catch(error => {
    router.push({
      name: 'ErrorDisplay',
      params: { error: error }
    })
  })
})

// The $patch function allows you to apply multiple changes at the same time.
// You can also change one property like -> packageStore.selectedPackage = null
onUnmounted(() => packageStore.$patch({ selectedPackage: null }))
</script>

<template>
  <div v-if="selectedPackage">
    <h1>{{ selectedPackage.title }}</h1>
    <p>owner: {{ selectedPackage.owner }} created: {{ selectedPackage.created }} status: {{ selectedPackage.status }}</p>
    <p>{{ selectedPackage.description }}</p>
  </div>
</template>
