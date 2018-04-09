<template>
	<div>
		<BusinessDashboard v-if="businesses === null || businesses.length"></BusinessDashboard>
		<NewBusinessDashboard v-else></NewBusinessDashboard>
		{{businesses}}
	</div>
</template>

<script>
import Header from '../components/Header.vue'
import NewBusinessDashboard from '../components/new-business-dashboard.vue'
import BusinessDashboard from '../components/business-dashboard.vue'

export default {
	components: {
		Header,
		NewBusinessDashboard,
		BusinessDashboard
	},
	data: function() {
		return {
			businesses: null,
		}
	},
	methods: {
		getBusinesses: function() {
			var url = `users/${this.$store.state.email}/businesses`;
			this.request('get', url)
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
