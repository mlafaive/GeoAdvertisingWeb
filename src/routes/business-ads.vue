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
          <OfferCreate :getOffers='getOffers' modal='createForm' class='p-4 m-0 border border-success rounded'></OfferCreate>
        </b-collapse>
      </b-col>
    </b-row>

    <b-form-input v-model="filter"
                  type="text"
                  placeholder="Search advertisements"
									class='mb-4'>
    </b-form-input>

    <b-table hover
              :items="offers"
              :fields="ad_fields"
              :filter="filter"
              @row-clicked="clicked"
              sort-by="status"
              sort-order="asc"
     >
      <template slot="status" slot-scope="row">
        <div v-if="row.value == 'Active'">
					<b-badge class='font-weight-regular' style='font-size: 1rem;' variant="success">{{row.value}}</b-badge> {{row.item.time_desc}}
				</div>

        <div v-if="row.value == 'Scheduled'">
					<b-badge class='font-weight-regular' style='font-size: 1rem;' variant="primary">{{row.value}}</b-badge> {{row.item.time_desc}}
				</div>

        <div v-if="row.value == 'Past'">
					<b-badge class='font-weight-regular' style='font-size: 1rem;'>{{row.value}}</b-badge> {{row.item.time_desc}}
				</div>

      </template>

			<template slot="views" slot-scope="row">
				<b-badge class='font-weight-regular' style='font-size: 1rem;' variant='warning'>{{row.value}}</b-badge>
      </template>

			<template slot="accepts" slot-scope="row">
				<b-badge class='font-weight-regular' style='font-size: 1rem;' variant='success'>{{row.value}}</b-badge>
      </template>

     </b-table>
	</div>
</template>

<script>
import moment from 'moment'
import OfferCreate from '../components/offer-create.vue'

export default {
  components: {OfferCreate},
  data: function() {
    return {
      filter: "",
      business_id: this.$route.params.id,
      offers: [],
      ad_fields: {
        description: {
          label: 'Offer',
          sortable: true
        },
        status: {
          label: 'Status',
          sortable: true
        },
				views: {
					label: '# Viewed',
					sortable: true
				},
				accepts: {
					label: '# Accepted',
					sortable: true
				}
      },
			addText: '+ Create new',
			hideText: '- Hide form',
			btnText: '+ Create new',
    };
  },
  methods: {
		toggleCreateBtn: function() {
				this.btnText = (this.btnText === this.addText) ? this.hideText : this.addText
		},
    clicked: function(item){
      var id = item.id
      this.$router.push({ name: 'business-offer', params: { id: this.business_id, oid: id }})

    },
    offerStatus: function(start_d, end_d) {
      let now = new Date()
      let start = new Date(start_d)
      let end = new Date(end_d)

      if (end <= now) {
        return "Past"
      } else if (start > now) {
        return "Scheduled"
      } else {
        return "Active"
      }
    },
    getOffers: function() {
      var url = `businesses/${this.business_id}/offers`;
      this.$http
        .get(url)
        .then(data => {
            this.offers = data.body.offers;
						this.offers.forEach(offer => {
							offer.status = this.offerStatus(offer.start_time, offer.end_time)
							let now = moment()
							if (offer.status === 'Scheduled')
								offer.time_desc = 'starts in ' + moment(offer.start_time).from(now)
							else if (offer.status === 'Active')
								offer.time_desc = 'ends in ' + moment(offer.end_time).from(now)
							else
								offer.time_desc = 'ended ' + moment(offer.end_time).from(now)
						})
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  mounted() {
    this.getOffers()
  },
	beforeMount() {
    if (!this.$store.state.email)
      this.$router.push({path: '/login'})
  }
};
</script>
