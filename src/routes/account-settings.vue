<template>
  <div>
    <b-row>
      <b-col>
        <h1 class='font-weight-light'>Account Settings</h1>
        <p class='lead'>Manage your personal info, interests, and account credentials.</p>

      </b-col>
    </b-row>
    <b-row>
      <b-col md='6' xl='4'>
        <b-form>
          <b-form-group label='Name:' label-for='name'>
            <b-form-input type='text' name='name' v-model='name' :value='user.name'></b-form-input>
          </b-form-group>
          <b-form-group label='Interests:' label-for='interests'>
            <b-checkbox-group name='interests' v-model='interests' :options='options'></b-checkbox-group>
          </b-form-group>
          <b-button type='submit' variant='success'>Save</b-button>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      name: '',
      interests: [],
      options: [],
      user: {
        name: '',
      }
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
      self.options = data.body.interests.map(option => {return {value: option.id, text: option.name, checked: false}})

      self.user.interests.forEach(interest => {
        self.options.forEach(option => {
          if (interest.id === option.id) {
            option.checked = true
          }
        })
      })
    })
    .catch(console.error)
  }
}
</script>
