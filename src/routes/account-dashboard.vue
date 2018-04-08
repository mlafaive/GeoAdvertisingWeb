<template>
	<b-row>
		<div>Account Dashboard</div>
		{{businesses}}
	</b-row>
</template>

<script>
import Header from '../components/Header.vue'

export default {
	name: 'AccountDashboard',
	components: {
		Header
	},
	data: function() {
		return {
			businesses: []
		}
	},
	methods: {
		getBusinesses: function() {
			var url = `users/${this.$store.state.email}/businesses`
			this.$http.get(url)
			.then((data) => {
				this.businesses = data.body.businesses
			})
			.catch(console.error)
		}
	},
	mounted() {
		this.getBusinesses()
	}
}
</script>

<style scoped></style>
