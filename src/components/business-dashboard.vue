<template>
  <div>
    <b-row>
        <b-col>
            <b-jumbotron>
                <h1 class='display-4'>Welcome to <b class='text-green'>geode</b>!</h1>
                <p class='lead'>Here, you can access your businesses, manage offers, and view historical statistics.</p>
            </b-jumbotron>
        </b-col>
    </b-row>

    <b-row class='flex align-items-center'>
      <b-col cols='12' md='5' class='text-center text-md-left'>
        <h1 class='mt-4 font-weight-light d-inline-block'>My Businesses</h1>
      </b-col>
      <b-col class='text-center text-md-right'>
        <b-button v-b-toggle.createForm variant='link' v-on:click="toggleCreateBtn">{{btnText}}</b-button>
      </b-col>
    </b-row>

    <b-row>
      <b-col class='mt-4 mb-4'>
        <b-collapse id="createForm">
          <BusinessCreate class='p-4 m-0 border border-primary rounded'></BusinessCreate>
        </b-collapse>
      </b-col>
    </b-row>

    <b-row>
        <b-col cols='10' offset='1' md='6' offset-md='0' lg='4'>
            <b-card img-src="https://lorempixel.com/600/300/" img-top no-body>
              <b-card-body class='text-center'>
                <h2 class='font-weight-light mb-4'>Pastry Peddler</h2>
                <p class='lead mb-0' style='font-size: 1rem'>619 Packard Street<br>Ann Arbor, Michigan</p>
              </b-card-body>
              <b-card-footer class='text-center pb-2 pt-2'>
                <b-badge variant='dark'>3 Scheduled Offers</b-badge>
              </b-card-footer>
            </b-card>
        </b-col>
        <b-col cols='10' offset='1' md='6' offset-md='0' lg='4'>
            <b-card img-src="https://lorempixel.com/600/300/" img-top no-body>
              <b-card-body class='text-center'>
                <h2 class='font-weight-light mb-4'>Ragstock</h2>
                <p class='lead mb-0' style='font-size: 1rem'>337 E Liberty St<br>Ann Arbor, MI</p>
              </b-card-body>
              <b-card-footer class='text-center pb-2 pt-2'>
                <b-badge variant='danger' class='mr-2'>1 Active Offers</b-badge>
                <b-badge variant='dark'>2 Scheduled Offers</b-badge>
              </b-card-footer>
            </b-card>
        </b-col>
        <b-col cols='10' offset='1' md='6' offset-md='0' lg='4'>
            <b-card img-src="https://lorempixel.com/600/300/" img-top no-body>
              <b-card-body class='text-center'>
                <h2 class='font-weight-light mb-4'>The Green Door</h2>
                <p class='lead mb-0' style='font-size: 1rem'>406 E Liberty St<br>Ann Arbor, MI</p>
              </b-card-body>
              <b-card-footer class='text-center pb-2 pt-2'>
                <b-badge variant='danger' class='mr-2'>2 Active Offers</b-badge>
              </b-card-footer>
            </b-card>
        </b-col>
    </b-row>
  </div>
</template>

<script>
  import BusinessCreate from './business-create.vue'
  export default {
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
      }
    },
    components: {BusinessCreate}
  }
</script>
