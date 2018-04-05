<script>
export default {
    name: 'Logout',
    methods : {
        logout: function() {
            // Clear all Vuex variables
            this.$store.commit("logout")

            // Send to home page
            window.location.href = "/"
        }
    },
    beforeMount() {this.logout()}
}
</script>
