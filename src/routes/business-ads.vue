<template>
	<div>
    <BusinessNav></BusinessNav>
    <BusinessAds></BusinessAds>
	</div>
</template>

<script>
import BusinessNav from "../components/business-nav.vue";
import BusinessAds from "../components/business-ads.vue";

export default {
  components: {
    BusinessNav,
    BusinessAds
  },
  data: function() {
    return {};
  },
  methods: { },
  mounted() { }
};
</script>
