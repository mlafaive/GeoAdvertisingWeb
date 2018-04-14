<template>
	<div>
		<OfferCreate></OfferCreate>
		<OfferDashboard></OfferDashboard>
	</div>
</template>

<script>
import OfferCreate from "../components/offer-create.vue";
import OfferDashboard from "../components/offer-dashboard.vue";

export default {
  components: {
    OfferCreate,
    OfferDashboard
  },
  data: function() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>
