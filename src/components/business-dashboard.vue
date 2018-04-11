<template>
  <div>
    <b-row>
        <b-col>
            <b-jumbotron class='mb-4'>
                <h1 class='display-4'>Welcome to <b class='text-green'>geode</b>!</h1>
                <p class='lead'>Here, you can access your businesses, manage offers, and view historical statistics.</p>
            </b-jumbotron>
        </b-col>
    </b-row>

    <b-row class='flex align-items-center'>
      <b-col cols='12' md='5' class='text-center text-md-left'>
        <h1 class='mt-2 font-weight-light d-inline-block'>My Businesses</h1>
      </b-col>
      <b-col class='text-center text-md-right'>
        <b-button v-b-toggle.createForm variant='link' v-on:click="toggleCreateBtn">{{btnText}}</b-button>
      </b-col>
    </b-row>

    <b-row>
      <b-col class='mt-4 mb-4'>
        <b-collapse id="createForm">
          <BusinessCreate :getBusinesses='getBusinesses' class='p-4 m-0 border border-primary rounded'></BusinessCreate>
        </b-collapse>
      </b-col>
    </b-row>

    <b-row>
        <b-col cols='10' offset='1' md='6' offset-md='0' lg='4' v-for='business in businesses' :key='business.id'>
            <b-card class='business-card' img-src="https://lorempixel.com/600/300/" img-top no-body>
              <b-card-body class='text-center'>
                <h2 class='font-weight-light mb-4'>{{business.name}}</h2>
                <p class='lead mb-0' style='font-size: 1rem'>
                  {{business.store_address}}<br>
                  {{business.city.city_name}}, {{business.city.state_name}}
                </p>
              </b-card-body>
              <b-card-footer class='text-center pb-2 pt-2'>
                <b-badge variant='danger' v-if='activeOffers(business)'>{{activeOffers(business)}} Active Offers</b-badge>
                <b-badge variant='dark' class='ml-2'>{{scheduledOffers(business)}} Scheduled Offers</b-badge>
              </b-card-footer>
            </b-card>
        </b-col>
    </b-row>
  </div>
</template>

<script>
  import BusinessCreate from './business-create.vue'
  export default {
    props: ['businesses', 'getBusinesses'],
    data: function() {
      return {
        addText: '+ Add Business',
        hideText: '- Hide Form',
        btnText: '+ Add Business'
      }
    },
    methods: {
      toggleCreateBtn: function() {
        this.btnText = (this.btnText === this.addText) ? this.hideText : this.addText
      },
      activeOffers: function(business) {
        let now = new Date()
        return business.offers.filter((offer) => {
          let start = new Date(offer.start_time)
          let end = new Date(offer.end_time)
          return start <= now && now <= end
        }).length
      },
      scheduledOffers: function(business) {
        let now = new Date()
        return business.offers.filter((offer) => {
          let start = new Date(offer.start_time)
          return now < start
        }).length
      }
    },
    components: {BusinessCreate}
  }
</script>
