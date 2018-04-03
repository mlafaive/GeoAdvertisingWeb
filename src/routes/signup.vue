<template>
	<div>
		<Header></Header>
		<section id="signup">
			<div class="fbox">
				<h1 class="tagline">Business Sign Up</h1>
				<form id="login-form" v-on:submit.prevent="signup">
					<fieldset>
						<div v-if="error !== null" class="error">{{error}}</div>

						<h1><small>Account Info</small></h1>

						<label for="name">Name:</label>
						<input type="text" id="name" v-model="name" required>

						<label for="name">Email Address:</label>
						<input type="text" id="email" v-model="email" required>

						<label for="mail">Password:</label>
						<input type="password" id="password" v-model="password" required>

						<label for="mail">Confirm Password:</label>
						<input type="password" id="confirm" v-model="confirm" required>

						<h1 class="mt-1"><small>Business Info</small></h1>

						<label for="name">Business Name:</label>
						<input type="text" id="business-name" v-model="business" required>

						<label for="mail">Street Address:</label>
						<input type="text" id="address" v-model="address" required>

						<label for="name">City:</label>
						<input type="text" id="city" v-model="city" required>

						<label for="name">State:</label>
						<input type="text" id="state" v-model="state" required>

					</fieldset>
					<button type="submit">Sign Up</button>
				</form>
				<a href="/login" class="link">
					<p>Already have an account? Log in to manage your business!</p>
				</a>
			</div>
		</section>
	</div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
	name: 'Signup',
	components: {
		Header
	},
	data: function() {
		return {
			error: null,
			name: null,
			email: null,
			password: null,
			confirm: null,
			business: null,
			address: null,
			city: null,
			state: null
		}
	},
	methods: {
		signup: function() {
			// Return if passwords don't match
			if (this.password !== this.confirm) {
				this.error = "Passwords do not match"
				return
			}

			// Create the user
			this.$http.post(
				'users',
				{
					name: this.name,
					email: this.email,
					password: this.password,
					confirm: this.confirm
				}
			)
			.then((data) => {
				// Set local storage variables
				localStorage.setItem("email", this.email)
				localStorage.setItem("access_token", data.body.access_token)
				localStorage.setItem("refresh_token", data.body.refresh_token)

				// Create the business on user create success
				this.$http.post(
					'businesses',
					{
						name: this.business,
						store_address: this.address,
						city_name: this.city,
						state_name: this.state
					},
					{
						headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
					}
				)
				.then((data) => {
					console.log(data)
				})
				.catch((err) => {
					console.error("Error creating business.")
					console.error(err)
					this.error = err.body.error

					// attempt to delete the user
					this.$http.delete(`users/${this.email}`, {headers: {'Authorization': `Bearer ${localStorage.getItem("access_token")}`}})

					// Remove local storage variables
					localStorage.removeItem("email")
					localStorage.removeItem("access_token")
					localStorage.removeItem("refresh_token")
				})
			})
			.catch((err) => {
				console.error("Error creating user account.")
				console.error(err)
				this.error = err.body.error
			})
		}
	}
}
</script>

<style scoped></style>
