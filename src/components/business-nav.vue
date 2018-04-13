<template>
  <b-navbar toggleable="md" type="light" variant="light" v-if="business">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">
      <router-link exact :to="{ name: 'business-dashboard', params: { id: business_id } }"> 
        {{ business.name }}
      </router-link>
    </b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="#">
          <router-link exact :to="{ name: 'business-ads', params: { id: business_id } }"> 
              Advertisements
          </router-link>
          </b-nav-item>
        <b-nav-item href="#">
          <router-link exact :to="{ name: 'business-settings', params: { id: business_id } }"> 
              Business Settings
          </router-link>
          </b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data: function() {
    return {
      business: {},
      business_id: this.$route.params.id
    };
  },
  methods: {
    getBusiness: function() {
      var url = `businesses/${this.business_id}/`;
      this.$http
        .get(url)
        .then(data => {
          this.business = data.body;

          console.log("offers");
          console.log(this.business.offers);
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.getBusiness();
  }
};
</script>
