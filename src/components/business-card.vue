<template>
  <b-card class='business-card mb-4' v-on:click='route(business.id)' :img-src='business.img' img-top no-body>
    <b-card-body class='text-center'>
      <h2 class='font-weight-semilight mb-4 text-gray-dark'>{{business.name}}</h2>
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
</template>

<script>
  export default {
    props: ['business'],
    methods: {
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
      },
      route: function(id) {
        this.$router.push({name: `business-dashboard`, params: {id: id}})
      }
    }
  }
</script>
