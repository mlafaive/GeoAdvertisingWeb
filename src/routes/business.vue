<template>
	<div>
        <!--
		<BusinessDashboard v-if="businesses === null || businesses.length"></BusinessDashboard>
		<NewBusinessDashboard v-else></NewBusinessDashboard>
		{{businesses}} what is this
        -->
    <BusinessNav></BusinessNav>
	</div>
</template>

<script>
import BusinessNav from "../components/business-nav.vue";
/*
import NewBusinessDashboard from "../components/new-business-dashboard.vue";
import BusinessDashboard from "../components/business-dashboard.vue";
*/ 

export default {
  components: {
    BusinessNav
  },
  data: function() {
    return {
      businesses: null
    };
  },
  methods: {
    getActive: function() {
      console.log(this.$route.params);
        /*
      var url = `users/${this.$store.state.email}/businesses`;
      this.$http
        .get(url)
        .then(data => {
          this.businesses = data.body.businesses;
        })
        .catch(err => {
          console.error(err);
        });
        */
    },

    getUpcoming: function() {
      console.log("get upcoming");
    }
  },
  mounted() {
    this.getActive();
    this.getUpcoming();
  }
};
</script>
