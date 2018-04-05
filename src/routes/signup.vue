<template>
	<div>
		<Header></Header>
		<section id="signup">
			<div class="fbox">
				<h1 class="tagline">Business Sign Up</h1>
				<form id="login-form" v-on:submit.prevent="validate">
					<fieldset>
						<div v-if="error !== null" class="error">{{error}}</div>

						<h1><small>Account Info</small></h1>

						<p class="control">
							<label for="name">Name:</label>
							<input v-validate="'required|max:50'" :class="{'invalid': errors.has('name') }" type="text" name="name" v-model="name">
							<span v-show="errors.has('name')" class="help invalid">{{ errors.first('name') }}</span>
						</p>

						<p class="control">
							<label for="email">Email Address:</label>
							<input v-validate="'required|email|max:50'" :class="{'invalid': errors.has('email') }" type="text" name="email" v-model="email">
							<span v-show="errors.has('email')" class="help invalid">{{ errors.first('email') }}</span>
						</p>

						<p class="control">
							<label for="password">Password:</label>
							<input v-validate="'required|min:8|max:50'" :class="{'invalid': errors.has('password') }" type="password" name="password" v-model="password">
							<span v-show="errors.has('password')" class="help invalid">{{ errors.first('password') }}</span>
						</p>

						<p class="control">
							<label for="confirm">Confirm Password:</label>
							<input v-validate="'required|min:8|max:50|confirmed:password'" :class="{'invalid': errors.has('confirm') }" type="password" name="confirm" v-model="confirm">
							<span v-show="errors.has('confirm')" class="help invalid">Passwords must match</span>
						</p>

						<h1 class="mt-1"><small>Business Info</small></h1>

						<p class="control">
							<label for="business-name">Business Name:</label>
							<input v-validate="'required|max:50'" :class="{'invalid': errors.has('business-name') }" type="text" name="business-name" v-model="business">
							<span v-show="errors.has('business-name')" class="help invalid">{{ errors.first('business-name') }}</span>
						</p>

						<p class="control">
							<label for="address">Street Address:</label>
							<input v-validate="'required|max:50'" :class="{'invalid': errors.has('address') }" type="text" name="address" v-model="address">
							<span v-show="errors.has('address')" class="help invalid">{{ errors.first('address') }}</span>
						</p>

						<p class="control">
							<label for="city">City:</label>
							<input v-validate="'required|max:50'" :class="{'invalid': errors.has('city') }" type="text" name="city" v-model="city">
							<span v-show="errors.has('city')" class="help invalid">{{ errors.first('city') }}</span>
						</p>

						<p class="control">
							<label for="state">State:</label>
							<input v-validate="'required|max:50'" :class="{'invalid': errors.has('state') }" type="text" name="state" v-model="state">
							<span v-show="errors.has('state')" class="help invalid">{{ errors.first('state') }}</span>
						</p>

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
		validate: function() {
			this.$validator.validateAll()
			.then((result) => {
				if (result) this.signup()
				else return
			})
			.catch(console.error)
		},
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
				this.$store.commit("email", this.email)
				this.$store.commit("access_token", data.body.access_token)
				this.$store.commit("refresh_token", data.body.refresh_token)

				// Create the business on user create success
				this.$http.post(
					'businesses',
					{
						name: this.business,
						store_address: this.address,
						city_name: this.city,
						state_name: this.state
					}
				)
				.then((data) => {
					console.log(data)
					window.location.href = "/"
				})
				.catch((err) => {
					console.error("Error creating business.")
					console.error(err)
					this.error = err.body.error

					// attempt to delete the user
					this.$http.delete(`users/${this.email}`)

					// Remove local storage variables
					this.$store.commit("logout")
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

<style lang="scss">
p.control {
	margin: 0 0 1em;
	input {
		background: #f3f3f3;
		margin: 5px 0;
		outline: none !important;
    	border: 2px solid transparent;
		border-radius: 2px;
	}
	input:focus {
		border-color: var(--primary)
	}
	input.invalid {
		border-color: var(--p-red);
	}
	span.help {
		display: block;
		font-size: 12px;
		color: #333;
	}
	span.help.invalid {
		color: var(--p-red);
	}
}
</style>
