<template>
<div>
    <b-row class='flex align-items-center'>
        <b-col>
        <b-form v-on:submit.prevent='create' id="createOffer">
            <b-form-row>
            <b-col>
                <b-form-group label="Offer:" label-for="offer_name">
                <b-form-input type="text" id="offer_name" v-model='offer_name' required autofocus></b-form-input>
                </b-form-group>
            </b-col>
            </b-form-row>

            <b-form-row>
            <b-col md='6'>
                <b-form-group label="Start Time:" label-for='start'>
                <b-form-input type="text" id="start" v-model='start' required></b-form-input>
                </b-form-group>
            </b-col>
            <b-col md='6'>
                <b-form-group label="End Time:" label-for='end'>
                <b-form-input type="text" id="end" v-model='end' required></b-form-input>
                </b-form-group>
            </b-col>
            </b-form-row>

            <b-form-row>
            <b-col>
                <b-form-group label="Interests:" label-for='address'>
                <b-form-checkbox-group :options="interest_options" />
                </b-form-group>
            </b-col>
            </b-form-row>

            <b-form-row>
            <b-col>
                <b-alert v-if="error !== null" show variant="danger" class='mt-2'>
                    <b>Error:</b> 
                    {{error}}
                </b-alert>
            </b-col>
            </b-form-row>


            <b-form-row>
            <b-col>
                <b-button type="submit" variant='primary' class='mt-2'>
                + Create Offer
                </b-button>
            </b-col>
            </b-form-row>

        </b-form>
        </b-col>
    </b-row>    
</div>

</template>

<script>
export default {
  props: ["getBusinesses"],
  data() {
    return {
      business_id: this.$route.params.id,
      offers: [
        {
          accepts: 0,
          business: {
            id: 2,
            name: "University of Michigan Museum of Natural History"
          },
          description:
            "Night at the museum -- Watch as everything comes to life!",
          end_time: "2019-03-29T05:00:00+00:00",
          id: 3,
          interests: [
            {
              id: 4,
              name: "Entertainment"
            }
          ],
          start_time: "2016-03-28T20:00:00+00:00",
          views: 1
        }
      ],
      interest_options: [
        {
          value: 1,
          text: "Sports"
        },
        {
          value: 2,
          text: "Clothing"
        },
        {
          value: 3,
          text: "Food"
        },
        {
          value: 4,
          text: "Entertainment"
        },
        {
          value: 5,
          text: "Technology"
        },
        {
          value: 6,
          text: "Home Goods"
        },
        {
          value: 7,
          text: "Transportation"
        }
      ],
      error: null,
      offer_name: "",
      start: "",
      end: "",
      interests: []
    };
  },
  methods: {
    create: function() {
      this.$http
        .post("businesses", {
          description: this.offer_name,
          start_time: this.start,
          end_time: this.end,
          interests: this.interests
        })
        .then(data => {
          console.log(data);
          // Refresh the businesses
          this.getBusinesses();
          // Clear the form
          document.getElementById("createOffer").reset();
        })
        .catch(err => {
          console.log(err);
          if (err.body.message) this.error = err.body.message;
          else if (err.body.error) this.error = err.body.error;
        });
    }
  }
};
</script>
