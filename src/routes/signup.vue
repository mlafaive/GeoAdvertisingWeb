<template>
	<b-row>
		<b-col class='text-center'>
			<h1 class='text-primary font-weight-light'>Account Sign Up</h1>
			<b-form class='mt-4 mb-4' v-on:submit.prevent="validate">
				<b-form-row>
					<b-col md='6' offset-md='3' xl='4' offset-xl='4' class='text-center'>
						<b-form-group label-for="name" label="Name:">
							<b-form-input v-validate="'required|max:50'" :class="{'is-invalid': errors.has('name') }" type="text" name="name" v-model="name" autofocus></b-form-input>
						</b-form-group>

						<b-form-group label-for="email" label="Email Address:">
							<b-form-input v-validate="'required|email|max:50'" :class="{'is-invalid': errors.has('email') }" type="text" name="email" v-model="email"></b-form-input>
							<span v-show="errors.has('email')" class="invalid-feedback">Email address must be valid</span>
						</b-form-group>

						<b-form-group label-for="password" label="Password:">
							<b-form-input v-validate="'required|min:8|max:50'" :class="{'is-invalid': errors.has('password') }" type="password" name="password" v-model="password"></b-form-input>
							<span v-show="errors.has('password')" class="invalid-feedback">{{errors.first("password")}}</span>
						</b-form-group>

						<b-form-group label-for="confirm" label="Confirm Password:">
							<b-form-input v-validate="'required|min:8|max:50|confirmed:password'" :class="{'is-invalid': errors.has('confirm') }" type="password" name="confirm" v-model="confirm"></b-form-input>
							<span v-show="errors.has('confirm')" class="invalid-feedback">Passwords must match</span>
						</b-form-group>

						<b-alert v-if="error !== null" class='mt-4' show variant="danger">
							<b>Error:</b> {{error}}
						</b-alert>

						<b-button type="submit" variant="primary" class='mt-4 mb-4' block>Sign Up</b-button>

						<router-link to="/login">
							<p>Already have an account? Login!</p>
						</router-link>
					</b-col>
				</b-form-row>
			</b-form>
		</b-col>
	</b-row>
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
				else {
					// Autofocus the first error
					var invalid = document.getElementsByClassName("is-invalid");
					invalid[0].focus();
				}
			})
			.catch(console.error)
		},
		signup: function() {
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

				// Send to dashboard
				window.location.href = '/account-dashboard'
			})
			.catch((err) => {
				console.error(err)
				this.error = err.body.error
			})
		}
	}
}
</script>
