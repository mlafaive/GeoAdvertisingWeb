<template>
  <div>
    <b-row>
      <b-col>
        <h1 class='font-weight-light'>Account Settings</h1>
        <p class='lead'>Manage your personal info, interests, and account credentials.</p>
      </b-col>
    </b-row>
    <hr class='mt-4'/>
    <b-row>
      <b-col md='6' xl='4' class='mt-4'>
        <h2 class='font-weight-light'>Personal Information</h2>
        <b-alert v-if="infoError !== null" show variant="danger">
					<b>Error:</b> {{infoError}}
				</b-alert>
        <b-form v-on:submit.prevent='validate("info")' data-vv-scope='info'>
          <b-form-group label='Name:' label-for='name'>
            <b-form-input v-validate="'required|max:50'" :class="{'is-invalid': errors.has('info.name') }" type='text' name='name' v-model='user.name' :value='user.name'></b-form-input>
          </b-form-group>
          <b-form-group label='Interests:' label-for='interests'>
            <b-checkbox-group name='interests' v-model='checked' :options='options'></b-checkbox-group>
          </b-form-group>
          <b-button type='submit' variant='success'>Save Info</b-button>
        </b-form>
      </b-col>
    </b-row>
    <hr class='mt-5'/>
    <b-row>
      <b-col md='6' xl='4' class='mt-4 mb-4'>
        <h2 class='font-weight-light'>Account Credentials</h2>
        <b-alert v-if="credError !== null" show variant="danger">
					<b>Error:</b> {{credError}}
				</b-alert>
        <b-form v-on:submit.prevent='validate("credentials")' data-vv-scope='credentials'>
          <b-form-group label='Old Password:' label-for='oldPassword'>
            <b-form-input v-validate="'required|min:8|max:50'" :class="{'is-invalid': errors.has('credentials.oldPassword') }" type='password' name='oldPassword' v-model='oldPassword' :value='oldPassword'></b-form-input>
            <span v-show="errors.has('credentials.oldPassword')" class="invalid-feedback">{{errors.first("credentials.oldPassword")}}</span>
          </b-form-group>
          <b-form-group label='New Password:' label-for='newPassword'>
            <b-form-input v-validate="'required|min:8|max:50'" :class="{'is-invalid': errors.has('credentials.newPassword') }" type='password' name='newPassword' v-model='newPassword' :value='newPassword'></b-form-input>
            <span v-show="errors.has('credentials.newPassword')" class="invalid-feedback">{{errors.first("credentials.newPassword")}}</span>
          </b-form-group>
          <b-form-group label='Confirm Password:' label-for='confirmPassword'>
            <b-form-input v-validate="'required|min:8|max:50|confirmed:newPassword'" :class="{'is-invalid': errors.has('credentials.confirmPassword') }" type='password' name='confirmPassword' v-model='confirmPassword' :value='confirmPassword'></b-form-input>
            <span v-show="errors.has('credentials.confirmPassword')" class="invalid-feedback">Passwords must match</span>
          </b-form-group>
          <b-button type='submit' variant='warning'>Change Password</b-button>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      infoError: null,
      credError: null,
      oldPassword: null,
      newPassword: null,
      confirmPassword: null,
      checked: [],
      options: [],
      user: {
        name: '',
      }
    }
  },
  methods: {
    validate: function(scope) {
			this.$validator.validateAll(scope)
			.then((result) => {
				if (result) {

          if (scope === 'info')
            this.updateInfo()
          else if (scope === 'credentials')
            this.updateCredentials()
        }
				else {
					// Autofocus the first error
					var invalid = document.getElementsByClassName("is-invalid");
					invalid[0].focus();
				}
			})
			.catch(console.error)
		},
    updateInfo: function() {
      let self = this
      let patch = {
        name: self.user.name,
        interests: self.checked
      }

      let url = `users/${this.$store.state.email}`
      this.$http.patch(url, patch)
      .then(data => {
        this.user = data.body
        this.setChecked()
      })
    },
    updateCredentials: function() {
      let self = this
      let patch = {
        old_password: self.oldPassword,
        password: self.newPassword
      }


      let url = `users/${this.$store.state.email}`
      this.$http.patch(url, patch)
      .then((data) => {
        self.credError = null
        // Clear Form
        self.oldPassword = null
        self.newPassword = null
        self.confirmPassword = null
        // Reset Vee-Validate errors
        this.$validator.reset('credentials')
      })
      .catch(err => {
        console.log(err)
        self.credError = err.body.error
      })
    },
    setChecked: function() {
      this.checked = []
      this.user.interests.forEach(interest => {
        this.checked.push(interest.id)
      })
    }
  },
  created() {
    let self = this

    // Get current user
    let url = `users/${this.$store.state.email}`
    this.$http.get(url)
    .then(data => {
      self.user = data.body
      return this.$http.get('interests')
    })
    .then(data => {
      self.options = data.body.interests.map(option => {return {value: option.id, text: option.name}})
      self.options.sort((a,b) => {
        if (a.text < b.text) return -1
        else if (a.text > b.text) return 1
        return 0
      })
      this.setChecked()
    })
    .catch(console.error)
  }
}
</script>
