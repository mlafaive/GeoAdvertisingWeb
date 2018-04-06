<template>
	<div>
		<Header></Header>
		<section id="login">
			<div class="fbox">
				<h1 class="tagline">Business Sign On</h1>
				<form id="login-form" v-on:submit.prevent='login'>
					<fieldset>
						<div v-if="error !== null" class="error">{{error}}</div>
						<label for="email">Email Address:</label>
						<input type="text" id="email" v-model="email" required>

						<label for="password">Password:</label>
						<input type="password" id="password" v-model="password" required>

					</fieldset>
					<button type="submit">Log In</button>
				</form>
				<a href="/signup" class="link">
					<p>No account? Sign up your business with Geode!</p>
				</a>
			</div>
		</section>
	</div>
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
			email: '',
			password: '',
			error: null
		}
	},
	methods: {
		login: function(event) {
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

				// Redirect to Home
				// window.location.href = "/"
			})
			.catch((err) => {
				console.error(err)
				this.error = err.body.error
			})
		}
	}
}

</script>

<style scoped>
</style>
