<template>
<div>
    <b-row class='flex align-items-center'>
      <b-col cols='12' md='10' class='text-center text-md-left'>
        <h1 class='mt-2 font-weight-light d-inline-block'>Business Statistics</h1>

        <h2 class='font-weight-light'>Offer Performance</h2>
        <p class='lead'>Displays consumer engagement over all past and active offers:</p>
        <BusinessChart v-if='relevantOffers' :offers='relevantOffers'></BusinessChart>
      </b-col>
    </b-row>
</div>

</template>

<script>
import BusinessChart from '../components/business-chart.vue'
import moment from 'moment'

export default {
    components: {BusinessChart},
    data() {
        return {
            business_id: this.$route.params.id,
            offers: [],
            error: null,
        }
    },
    computed: {
      relevantOffers: function() {
        if (!this.offers) return
        return this.offers.filter(offer => {
          let now = moment().toDate()
          let start = moment(offer.start_time).toDate()
          return start < now
        })
      }
    },
    methods: {
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
