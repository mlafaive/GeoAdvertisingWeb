<template>
	<div>
    <h1>Settings</h1>
	</div>
</template>

<script>

export default {
  components: {
  },
  data: function() {
    return {};
  },
  methods: { },
  mounted() { },
	beforeMount() {
    if (!this.$store.state.email)
      this.$router.push({path: '/login'})
  }
};
</script>
