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
          <BusinessCreate class='p-4 m-0 border border-success rounded'></BusinessCreate>
        </b-collapse>
      </b-col>
    </b-row>

    <b-row>
        <b-col cols='10' offset='1' md='6' offset-md='0' lg='4' v-for='business in $store.state.businesses' :key='business.id'>
          <BusinessCard :business='business'></BusinessCard>
        </b-col>
    </b-row>
  </div>
</template>

<script>
  import BusinessCreate from './business-create.vue'
  import BusinessCard from './business-card.vue'
  export default {
    components: {BusinessCreate, BusinessCard},
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
    },
  }
</script>
