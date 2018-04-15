<template>
<div>
    <b-row class='flex align-items-center'>
      <b-col cols='12' md='5' class='text-center text-md-left'>
        <h1 class='mt-2 font-weight-light d-inline-block'>My Offers</h1>
      </b-col>
      <b-col class='text-center text-md-right'>
        <b-button v-b-toggle.createForm variant='link'>{{btnText}}</b-button>
      </b-col>
    </b-row>

    <b-row>
      <b-col class='mt-4 mb-4'>
        <b-collapse id="createForm">
          <OfferCreate :getOffers='getOffers' class='p-4 m-0 border border-success rounded'></OfferCreate>
        </b-collapse>
      </b-col>
    </b-row>

    <b-row>
        <b-col cols='10' offset='1' md='6' offset-md='0' lg='4' v-for='offer in offers' :key='offer.id'>
          <router-link exact :to="{ name: 'business-offer', params: { id: business_id, oid: offer.id } }">
            <b-card class='offer-card' no-body>
              <b-card-body class='text-center'>
                <h2 class='font-weight-light mb-4'>{{offer.description}}</h2>
                <p class='lead mb-0' style='font-size: 1rem'>
                  <b>Starts:</b>
                  {{ formatDate(offer.start_time) }}
                  <br>
                  <b>Ends:</b>
                  {{ formatDate(offer.end_time) }}
                </p>
              </b-card-body>
            </b-card>
            </router-link>
        </b-col>
    </b-row>

</div>

</template>

<script>

import moment from 'moment'
import OfferCreate from '../components/offer-create.vue'

export default {
  components: {OfferCreate},
  data() {
    return {
        addText: '+ Create new',
        hideText: '- Hide form',
        btnText: '+ Create new',
        business_id: this.$route.params.id,
        offers: [],
        error: null,
        offer_name: "",
        start: "",
        end: "",
        interests: []
    }
  },
  methods: {
    formatDate: function(value){
      return moment(String(value)).format('dddd MMMM Do, YYYY [at] h:mm A')
    },
    create: function() {
      this.$http
        .post("businesses", {
          description: this.offer_name,
          start_time: this.start,
          end_time: this.end,
          interests: this.interests
        })
        .then(data => {
          console.log(data);
          // Refresh the businesses
          this.getBusinesses();
          // Clear the form
          document.getElementById("createOffer").reset();
        })
        .catch(err => {
          console.log(err);
          if (err.body.message) this.error = err.body.message;
          else if (err.body.error) this.error = err.body.error;
        });
    },

    getOffers: function() {
      var url = `businesses/${this.business_id}/offers`;
      this.$http
        .get(url)
        .then(data => {
            this.offers = data.body.offers;
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
	mounted() {
		this.getOffers()
	}
};
</script>
