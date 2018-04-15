<template>
<div>
    <b-row class='flex align-items-center'>
      <b-col cols='12' md='10' class='text-center text-md-left'>
        <h1 class='mt-2 font-weight-light d-inline-block'>My Offers</h1>
        <p class='lead'>Click on an offer to manage details and view statistics.</p>
      </b-col>
      <b-col class='text-center text-md-right'>
        <b-button v-b-toggle.createForm variant='success' v-on:click='toggleCreateBtn'>{{btnText}}</b-button>
      </b-col>
    </b-row>

    <b-row>
      <b-col class='mt-4 mb-4'>
        <b-collapse id="createForm">
          <OfferCreate :getOffers='getOffers' class='p-4 m-0 border border-success rounded'></OfferCreate>
        </b-collapse>
      </b-col>
    </b-row>

    <!-- Active Offers -->
    <div v-if='activeOffers.length'>
        <b-row>
            <b-col>
                <h2 class='text-danger font-weight-light mb-4'>Active Offers ({{activeOffers.length}})</h2>
            </b-col>
        </b-row>

        <b-row>
            <b-col cols='10' offset='1' md='6' offset-md='0' lg='4' v-for='offer in activeOffers' :key='offer.id'>
                <OfferCard :offer='offer' :showFooter='true'></OfferCard>
            </b-col>
        </b-row>
        <hr class='mt-5 mb-5'/>
    </div>


    <!-- Scheduled Offers -->
    <div v-if='scheduledOffers.length'>
        <b-row>
            <b-col>
                <h2 class='text-primary font-weight-light mb-4'>Scheduled Offers ({{scheduledOffers.length}})</h2>
            </b-col>
        </b-row>

        <b-row>
            <b-col cols='10' offset='1' md='6' offset-md='0' lg='4' v-for='offer in scheduledOffers' :key='offer.id'>
                <OfferCard :offer='offer'></OfferCard>
            </b-col>
        </b-row>
        <hr class='mt-5 mb-5'/>
    </div>

    <!-- Past Offers -->
    <div v-if='pastOffers.length'>
        <b-row>
            <b-col>
                <h2 class='text-gray font-weight-light mb-4'>Past Offers ({{pastOffers.length}})</h2>
            </b-col>
        </b-row>

        <b-row>
            <b-col cols='10' offset='1' md='6' offset-md='0' lg='4' v-for='offer in pastOffers' :key='offer.id'>
              <OfferCard :offer='offer' :showFooter='true'></OfferCard>
            </b-col>
        </b-row>
    </div>
</div>

</template>

<script>

import OfferCreate from '../components/offer-create.vue'
import OfferCard from '../components/offer-card.vue'

export default {
    components: {OfferCreate, OfferCard},
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
    computed: {
        activeOffers: function() {
            let now = new Date()
            return this.offers.filter((offer) => {
                let start = new Date(offer.start_time)
                let end = new Date(offer.end_time)
                return start <= now && now <= end
            })
        },
        scheduledOffers: function() {
            let now = new Date()
            return this.offers.filter((offer) => {
                let start = new Date(offer.start_time)
                return now < start
            })
        },
        pastOffers: function() {
            let now = new Date()
            return this.offers.filter(offer => {
                let end = new Date(offer.end_time)
                return end < now
            })
        },
    },
    methods: {
        toggleCreateBtn: function() {
            this.btnText = (this.btnText === this.addText) ? this.hideText : this.addText
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
