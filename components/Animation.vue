<template>
    <div>
      <div ref="animationContainer"></div>
    </div>
</template>

<script setup lang="ts">
import lottie from 'lottie-web'

const props = defineProps({
  name: String,
})

const animationContainer = ref(null)

onMounted(() => {
  lottie.loadAnimation({
      container: animationContainer.value, // use `.value` with `ref()`
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: props.name
  })
})

</script>