<template>
  <div>
    <b-row>
      <b-col>
        <b-jumbotron>
          <h1 class='display-4'>Welcome to <span class='text-green'>geode</span>!</h1>
          <p class='lead'>Get started by creating your first business. [More info??]</p>
        </b-jumbotron>
      </b-col>
    </b-row>
    <h3 class='font-weight-light mb-4'>Create a business</h3>
    <BusinessCreate :getBusinesses='getBusinesses'></BusinessCreate>
  </div>
</template>

<script>
  import BusinessCreate from './business-create.vue'
  export default {
    props: ['getBusinesses'],
    components: {BusinessCreate}
  }
</script>
