<template>
  <b-row class='flex align-items-center'>
    <b-col md='6'>
      <h3 class='font-weight-light mb-4'>Create a business</h3>
      <b-form v-on:submit.prevent='create' id="createBusiness">
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
              <b-form-input type="text" id="address" v-model='address' v-on:change='updateCoordinates()' required></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col md='6'>
            <b-form-group label="City:" label-for='city'>
              <b-form-input type="text" id="city" v-model='city' v-on:change='updateCoordinates()' required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md='6'>
            <b-form-group label="State:" label-for='state'>
              <b-form-input type="text" id="state" v-model='state' v-on:change='updateCoordinates()' required></b-form-input>
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
            <b-button v-if="!loading" type="submit" variant='success' class='mt-2'>
              + Create Business
            </b-button>
            <b-button v-else disabled variant='success' class='mt-2'>
              <i class="fa fa-spinner fa-spin"></i>
            </b-button>
          </b-col>
        </b-form-row>

      </b-form>
    </b-col>
    <b-col class='mt-4 mt-md-0' md='5' offset-md='1'>
        <p v-if='coordinates === null' class='text-center text-gray-dark'>
            <i class='fa fa-circle-notch fa-spin'></i> Waiting for location
        </p>
        <gmap-map v-else :center='coordinates' :options='{disableDefaultUI: true}' :zoom='address ? 19 : 14' style='width: 100%; height: 250px'>
            <gmap-marker v-if='city && state && address' :position='coordinates' :clickable='false' :draggable='false'></gmap-marker>
        </gmap-map>
    </b-col>
  </b-row>
</template>

<script>
    // googlemaps: for static google maps objects (static, or street view)
    var GoogleMapsAPI = require('googlemaps')
    var googleMapsConfig = {
        key: 'AIzaSyA63AaNQeuLoZi5OjR4O2MFy2ReWo420kM',
        secure: true
    }
    var gmAPI = new GoogleMapsAPI(googleMapsConfig)

    export default {
        props: ['modal', 'toggleBtn'],
        data() {
          return {
            loading: false,
            error: null,
            dba: '',
            address: '',
            city: '',
            state: '',
            coordinates: null
          }
        },
        methods: {
            updateCoordinates: function() {
                var self = this
                if (this.address && this.city && this.state) {
                    gmAPI.geocode({address: `${this.address}, ${this.city}, ${this.state}`}, function(err, result) {
                        console.log(result.results[0].geometry.location)
                        self.coordinates = result.results[0].geometry.location
                    })
                }
                else if (!this.address && this.city && this.state) {
                    gmAPI.geocode({address: ` ${this.city}, ${this.state}`}, function(err, result) {
                        console.log(result.results[0].geometry.location)
                        self.coordinates = result.results[0].geometry.location
                    })
                }
                else {
                    self.coordinates = null
                }
            },
            create: function() {
              this.loading = true;
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
                this.loading = false;
                console.log(data)
                // Refresh the businesses
                this.$store.dispatch('getBusinesses')
                // Clear the form
                document.getElementById("createBusiness").reset()
                // clear errors
                this.error = null
                // Collapse the modal
                if (this.modal) {
                  this.$root.$emit('bv::toggle::collapse', this.modal)
                }
                // toggle the button text
                if (this.toggleBtn)
                  this.toggleBtn()
              })
              .catch((err) => {
                this.loading = false;
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
