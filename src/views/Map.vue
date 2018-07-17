<template>
  <div>
    <WebMap msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import WebMap from '@/components/Map.vue';

export default {
  name: 'webmap',
  components: {
    WebMap,
  },
};
</script>
