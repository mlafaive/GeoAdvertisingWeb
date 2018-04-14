<template>
	<div>    
    <h1 class='mt-2 font-weight-light d-inline-block'>{{offer.description}}</h1>
	</div>
</template>

<script>

export default {
  components: {
  },
  data: function() {
    return {
      business_id: this.$route.params.id,
      offer_id: this.$route.params.oid,
      offer: {}
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
    }
  },
  mounted() { 
    this.getOffer();
  }
};
</script>
