<template>
  <b-row class='flex align-items-center'>
    <b-col md='6'>
      <b-form v-on:submit.prevent='create'>

        <b-form-row>
          <b-col>
            <b-form-group label="Business Name:" label-for="dba">
              <b-form-input type="text" id="dba" v-model='dba' required autofocus></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col>
            <b-form-group label="Street Address:" label-for='address'>
              <b-form-input type="text" id="address" v-model='address' required></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col md='6'>
            <b-form-group label="City:" label-for='city'>
              <b-form-input type="text" id="city" v-model='city' required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md='6'>
            <b-form-group label="State:" label-for='state'>
              <b-form-input type="text" id="state" v-model='state' required></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col>
            <b-alert v-if="error !== null" show variant="danger" class='mt-2'>
              <b>Error:</b> {{error}}
            </b-alert>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col>
            <b-button type="submit" variant='primary' class='mt-2'>
              <i class='fa fa-plus mr-1'></i>
              Create Business
            </b-button>
          </b-col>
        </b-form-row>

      </b-form>
    </b-col>
    <b-col cols='6' offset='3' md='5' offset-md='1'>
      <b-card>Reactive google maps image</b-card>
    </b-col>
  </b-row>
</template>

<script>
  export default {
    data() {
      return {
        error: null,
        dba: '',
        address: '',
        city: '',
        state: ''
      }
    },
    methods: {
      create: function() {
        this.$http.post(
          'businesses',
          {
            name: this.dba,
            store_address: this.address,
            city_name: this.city,
            state_name: this.state
          }
        )
        .then((data) => {
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
          if (err.body.message)
            this.error = err.body.message
          else if (err.body.error)
            this.error = err.body.error
        })
      }
    }
  }
</script>
