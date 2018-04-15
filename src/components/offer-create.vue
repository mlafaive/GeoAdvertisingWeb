<template>
<div>
    <b-row class='flex align-items-center'>
        <b-col>
            <h3 class='font-weight-light mb-4'>Create an offer</h3>

            <b-form v-on:submit.prevent='create' id="createOffer">
                <b-form-row>
                <b-col>
                    <b-form-group label="Offer Description:" label-for="offer_name">
                        <b-form-input type="text" id="offer_name" v-model='offer_name' required autofocus></b-form-input>
                    </b-form-group>
                </b-col>
                </b-form-row>

                <b-form-row>
                <b-col md='6'>
                    <b-form-group label="Start Time:" label-for='start' description='MM/DD/YYYY hh:mm am/pm'>
                        <b-form-input type="datetime-local" id="start" v-model='start' required></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md='6'>
                    <b-form-group label="End Time:" label-for='end' description='MM/DD/YYYY hh:mm am/pm'>
                        <b-form-input type="datetime-local" id="end" v-model='end' required></b-form-input>
                    </b-form-group>
                </b-col>
                </b-form-row>

                <b-form-row>
                <b-col>
                    <b-form-group label="Interests:" label-for='address'>
                        <b-form-checkbox-group :options="interest_options" v-model='interests' />
                    </b-form-group>
                </b-col>
                </b-form-row>

                <b-form-row>
                <b-col>
                    <b-alert v-if="error !== null" show variant="danger" class='mt-2'>
                        <b>Error:</b>
                        {{error}}
                    </b-alert>
                </b-col>
                </b-form-row>


                <b-form-row>
                <b-col>
                    <b-button type="submit" variant='success' class='mt-2'>
                    + Create Offer
                    </b-button>
                </b-col>
                </b-form-row>

            </b-form>
        </b-col>
    </b-row>
</div>

</template>

<script>
import moment from 'moment'

export default {
    props: ['getOffers'],
  data() {
    return {
      business_id: this.$route.params.id,
      interest_options: [],
      error: null,
      offer_name: "",
      start: "",
      end: "",
      interests: []
    };
  },
  methods: {
    create: function() {
        let url = `businesses/${this.business_id}/offers`
        this.$http.post(url, {
          description: this.offer_name,
          start_time: moment(this.start).toISOString(),
          end_time: moment(this.end).toISOString(),
          interests: this.interests
        })
        .then(data => {
          console.log(data);
          // Refresh the offers
          this.getOffers();
          // Refresh the businesses
          this.$store.dispatch('getBusinesses')
          // Clear the form
          document.getElementById("createOffer").reset();
          this.interests = []
          // clear errors
          this.error = null
        })
        .catch(err => {
          console.log(err);
          if (err.body.message) this.error = err.body.message;
          else if (err.body.error) this.error = err.body.error;
        });
        }
  },
  created() {
      // populate interest_options
      this.$http.get('interests')
      .then(data => {
        this.interest_options = data.body.interests.map(option => {return {value: option.id, text: option.name}})
      })
      .catch(console.error)
  }
};
</script>
