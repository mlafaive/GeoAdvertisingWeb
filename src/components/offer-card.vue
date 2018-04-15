<template>
    <b-card v-on:click='route(offer.business.id, offer.id)' class='offer-card mb-4' no-body>
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
      <b-card-footer class='text-center pb-2 pt-2' v-if='showFooter'>
          <b-badge variant='dark' v-if='offer.views'>{{offer.views}} viewed</b-badge>
          <b-badge variant='success' class='ml-2' v-if='offer.accepts'>{{offer.accepts}} accepted</b-badge>
      </b-card-footer>
    </b-card>
</template>

<script>
import moment from 'moment'

export default {
    props: ['offer', 'showFooter'],
    methods: {
        route: function(bid, oid) {
          this.$router.push({name: `business-offer`, params: {business_id: bid, oid: oid}})
      },
      formatDate: function(value){
        return moment(String(value)).format('dddd MMMM Do, YYYY [at] h:mm A')
      },
    }
}
</script>
