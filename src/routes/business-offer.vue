<template>
	<div>
		<b-row class='flex align-items-center'>
	      <b-col cols='12' md='10' class='text-center text-md-left'>
	        <h1 class='mt-2 font-weight-light d-inline-block'>{{offer.description}}</h1>
	      </b-col>
	      <b-col class='text-center text-md-right'>
	        <b-button v-b-toggle.createForm variant='link' v-on:click="toggleCreateBtn">{{btnText}}</b-button>
	      </b-col>
	    </b-row>

		<b-row>
			<b-col>
				<p class='lead'><b>Starting</b>: {{formatDate(offer.start_time)}}</p>
				<p class='lead'><b>Ending</b>: {{formatDate(offer.end_time)}}</p>
				<p class='lead'><b>Interests</b>: {{offer.interests}}</p>
				{{offer}}
			</b-col>
		</b-row>

		<b-row>
			<b-col>
				<h1 class='font-weight-light mt-5'>Offer Statistics</h1>
				<p class='lead'>View information about consumer interaction with this offer.</p>
			</b-col>
		</b-row>

		<b-row class='flex align-items-center mt-5 mb-5'>
            <b-col lg='6'>
                <h2 class='font-weight-light'>Consumer Engagement</h2>
                <p class='lead'>Categorizes the users who interacted with this offer into two categories:</p>
                <ul class='lead'>
                    <li><b>passed</b>: viewed the offer but did not accept.</li>
                    <li><b>accepted</b>: viewed the offer and accepted it.</li>
                </ul>
            </b-col>
            <b-col cols='8' offset='2' sm='6' offset-sm='3' lg='4' offset-lg='2'>
                <OfferAcceptChart :offer='offer'></OfferAcceptChart>
            </b-col>
        </b-row>

        <b-row class='flex align-items-center mt-5 mb-5'>
            <b-col lg='6'>
                <h2 class='font-weight-light'>Engagement by Segment</h2>
                <p class='lead'>Categorizes the users who <b>accepted</b> with this offer by their primary interest.</p>
            </b-col>
            <b-col cols='8' offset='2' sm='6' offset-sm='3' lg='4' offset-lg='2'>
                <OfferInterestChart :offer='offer'></OfferInterestChart>
            </b-col>
        </b-row>
	</div>
</template>

<script>
import moment from 'moment'
import OfferAcceptChart from '../components/offer-accept-chart.vue'
import OfferInterestChart from '../components/offer-interest-chart.vue'

export default {
  components: {OfferAcceptChart, OfferInterestChart},
  data: function() {
    return {
      business_id: this.$route.params.id,
      offer_id: this.$route.params.oid,
      offer: {},
	  editText: '+ Edit offer',
	  hideText: '- Hide form',
	  btnText: '+ Edit offer'
    };
  },
  methods: {
    getOffer: function() {
      var url = `offers/${this.offer_id}/`;
      this.$http
        .get(url)
        .then(data => {
          this.offer = data.body;
        })
        .catch(err => {
          console.error(err);
        });
    },
	toggleCreateBtn: function() {
	  this.btnText = (this.btnText === this.editText) ? this.hideText : this.editText
  	},
	formatDate: function(value){
		if (!value) return
      return moment(String(value)).format('dddd MMMM Do, YYYY [at] h:mm A')
    },
  },
  mounted() {
    this.getOffer();
  }
};
</script>