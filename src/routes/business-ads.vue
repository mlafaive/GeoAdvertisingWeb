<template>
	<div>
    <h1>Offers</h1>
    <b-form-input v-model="filter"
                  type="text"
                  placeholder="Search advertisements">
    </b-form-input>
                  <br>

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

export default {
  components: {
  },
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
      }
    };
  },
  methods: {
    formatDate: function(value){
      return moment(String(value)).format('MM/DD/YYYY [at] h:mm:ss a')
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
    console.log(this.offers);
  }
};
</script>
