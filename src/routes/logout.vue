<template>
    <h1 class='text-warning display-4'>Redirecting...</h1>
</template>

<script>
export default {
    name: 'Logout',
    methods : {
        logout: function() {
            // Clear all Vuex variables
            this.$store.commit("logout")

            // Send to home page
            this.$router.push({path: '/'})
        }
    },
    beforeMount() {this.logout()}
}
</script>
