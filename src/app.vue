<template>
  <b-container class='mb-5'>
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
