<template>
<b-navbar toggleable="md" type="light" variant="light">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="#">
    <router-link exact to="#">{{ business_name }}</router-link>
  </b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item href="#">Advertisements</b-nav-item>
      <b-nav-item href="#">Business Settings</b-nav-item>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
</template>

<script>
export default {
  data: function() {
    return {
      business_name: "mystery"
    };
  },
  methods: {
    getActive: function() {
      console.log(this.$route.params);
    }
  },
  mounted() {
    this.getActive();
  }
};
</script>
