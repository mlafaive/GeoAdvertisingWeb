<script>
export default {
    name: 'Logout',
    methods : {
        logout: function() {
            // Delete local storage variables
            localStorage.removeItem("email")
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")

            // Send to home page
            window.location.href = "/"
        }
    },
    beforeMount() {this.logout()}
}
</script>
