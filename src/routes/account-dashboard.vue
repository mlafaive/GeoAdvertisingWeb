<template>
	<div>
		<NewBusinessDashboard v-if="$store.state.businesses === null  || !$store.state.businesses.length"></NewBusinessDashboard>
		<BusinessDashboard v-else></BusinessDashboard>
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
