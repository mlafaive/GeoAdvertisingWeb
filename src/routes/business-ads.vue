<template>
	<div>
    <h1>Offers</h1>
    <b-table hover :items="offers" :fields="ad_fields"></b-table>
	</div>
</template>

<script>
import moment from 'moment'

export default {
  components: {
  },
  data: function() {
    return {
      business_id: this.$route.params.id,
      offers: [],
      ad_fields: {
        description: {
          label: 'Offer',
          sortable: true
        },
        start_time: {
          label: 'Start Time',
          sortable: true
        },
        end_time: {
          label: 'End Time',
          sortable: true
        }
      }
    };
  },
  methods: { 
    formatDate: function(value){
      return moment(String(value)).format('MM/DD/YYYY [at] h:mm:ss a')
    },
    getOffers: function() {
      var url = `businesses/${this.business_id}/offers`;
      this.$http
        .get(url)
        .then(data => {
            this.offers = data.body.offers;
            for (var i = 0; i < this.offers.length; i++) { 
                this.offers[i].start_time= this.formatDate(this.offers[i].start_time);
                this.offers[i].end_time= this.formatDate(this.offers[i].end_time);
            }
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  mounted() { 
    this.getOffers()
    console.log(this.offers);
  }
};
</script>
