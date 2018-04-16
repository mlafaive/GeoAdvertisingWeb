<template>
	<div>
		<NewMyBusinesses v-if="$store.state.businesses === null  || !$store.state.businesses.length"></NewMyBusinesses>
		<MyBusinesses v-else></MyBusinesses>
	</div>
</template>

<script>
import Header from '../components/Header.vue'
import NewMyBusinesses from '../components/new-my-businesses.vue'
import MyBusinesses from '../components/my-businesses.vue'

export default {
	components: {
		Header,
		NewMyBusinesses,
		MyBusinesses
	},
	beforeMount() {
		if (!this.$store.state.email)
			this.$router.push({path: '/login'})
	}
}
</script>
