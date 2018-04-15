<template>
	<div>
		<BusinessDashboard></BusinessDashboard>
	</div>
</template>

<script>
import OfferCreate from "../components/offer-create.vue";
import BusinessDashboard from "../components/business-dashboard.vue";

export default {
  components: {
    OfferCreate,
    BusinessDashboard
  },
  data: function() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>
