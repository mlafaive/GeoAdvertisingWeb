<template>
	<div>
    <BusinessNav></BusinessNav>
    <OfferCreate></OfferCreate>
    <OfferDashboard></OfferDashboard>
	</div>
</template>

<script>
import BusinessNav from "../components/business-nav.vue";
import OfferCreate from "../components/offer-create.vue";
import OfferDashboard from "../components/offer-dashboard.vue";

export default {
  components: {
    BusinessNav,
    OfferCreate,
    OfferDashboard
  },
  data: function() {
    return {};
  },
  methods: { },
  mounted() { }
};
</script>
