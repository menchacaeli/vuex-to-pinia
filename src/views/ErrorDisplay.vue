<template>
  <h4>Oops! There was an error:</h4>
  <p>{{ props.error }}</p>
</template>

<script setup lang="ts">
const props = defineProps({
  error: String
})
</script>
