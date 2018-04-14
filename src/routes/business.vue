<template>
	<div>
    <BusinessNav></BusinessNav>
    <router-view></router-view>
	</div>
</template>

<script>
import BusinessNav from "../components/business-nav.vue";
import BusinessDashboard from "../components/business-dashboard.vue";

export default {
  components: {
    BusinessNav,
    BusinessDashboard
  },
  data: function() {
    return {};
  },
  methods: { },
  mounted() { }
};
</script>
