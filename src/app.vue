<template>
  <b-container>
    <Header></Header>
    <router-view></router-view>
  </b-container>
</template>

<script>
import Header from './components/Header.vue'
export default {
  components: {Header}
}
</script>
