<template>
	<div>
		<BusinessDashboard v-if="$store.state.businesses === null || $store.state.businesses.length"></BusinessDashboard>
		<NewBusinessDashboard v-else></NewBusinessDashboard>
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
}
</script>
