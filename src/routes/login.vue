<template>
	<b-row>
		<b-col md='6' offset-md='3' xl='4' offset-xl='4' class='text-center'>
			<h1 class='text-primary font-weight-light'>Business Login</h1>
			<b-form class='mt-5 mb-5' v-on:submit.prevent='login'>
				<b-alert v-if="error !== null" show variant="danger">
					<b>Error:</b> {{error}}
				</b-alert>
				<b-form-group label="Email Address:" label-for="email">
					<b-form-input type="email" id="email" v-model="email" required autofocus></b-form-input>
				</b-form-group>
				<b-form-group label="Password:" label-for='password'>
					<b-form-input type="password" id="password" v-model="password" required></b-form-input>
				</b-form-group>
				<b-button v-if="!loading" block type="submit" variant='primary'>Log In</b-button>
				<b-button v-else block disabled variant='primary'>
					<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
				</b-button>


			</b-form>
			<router-link to="/signup" class="link">
				<p>No account? Sign up your business with Geode!</p>
			</router-link>
		</b-col>
	</b-row>
</template>

<script>
import Header from '../components/Header.vue'

export default {
	name: 'Login',
	components: {
		Header
	},
	data: function() {
		return {
			loading: false,
			email: '',
			password: '',
			error: null
		}
	},
	methods: {
		login: function() {
			this.loading =  true;
			this.$http.post(
				'login',
				{
					email: this.email,
					password: this.password
				}
			)
			.then((data) => {
				// Save tokens and email locally
				this.$store.commit("email", this.email)
				this.$store.commit("access_token", data.body.access_token)
				this.$store.commit("refresh_token", data.body.refresh_token)

				// Get acocunt businesses
				this.$store.dispatch("getBusinesses")

				// Redirect to Dashboard
				this.$router.push({path: '/account-dashboard'})
			})
			.catch((err) => {
				console.error(err)
				this.error = err.body.error
			})
			.finally(() => this.loading = false)
		}
	}
}

</script>
