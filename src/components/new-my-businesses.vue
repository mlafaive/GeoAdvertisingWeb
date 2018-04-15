<template>
  <div>
    <b-row>
      <b-col>
        <b-jumbotron>
          <h1 class='display-4'>Welcome to <span class='text-green'>geode</span>!</h1>
          <p class='lead'>Get started by creating your first business.</p>
        </b-jumbotron>
      </b-col>
    </b-row>
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
