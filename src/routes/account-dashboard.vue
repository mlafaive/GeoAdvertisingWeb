<template>
	<div>
		<Header></Header>
		<div>Account Dashboard</div>
		{{businesses}}
	</div>
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
			this.$http.get(`users/${this.$store.state.email}/businesses`)
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
