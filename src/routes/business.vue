<template>
	<div>
    <BusinessNav class='mb-4'></BusinessNav>
    <router-view></router-view>
	</div>
</template>

<script>
import BusinessNav from "../components/business-nav.vue";

export default {
  components: {
    BusinessNav
  },
  data: function() {
    return {};
  },
  methods: { },
  mounted() { }
};
</script>
