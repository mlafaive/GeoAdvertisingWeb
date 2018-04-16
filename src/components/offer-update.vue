<template>
<div>
    <b-row class='flex align-items-center'>
        <b-col>
            <h3 class='font-weight-light mb-4'>Update offer</h3>

            <b-form v-on:submit.prevent='update' id="updateOffer">
                <b-form-row>
                <b-col>
                    <b-form-group label="Offer Description:" label-for="offer_name">
                        <b-form-input type="text" id="offer_name" v-model='offer_name' required></b-form-input>
                    </b-form-group>
                </b-col>
                </b-form-row>

                <b-form-row>
                <b-col md='6'>
                    <b-form-group label="Start Time:" label-for='start' description='MM/DD/YYYY hh:mm am/pm'>
                      <datetime v-model='start' type='datetime' input-class='form-control' :use12-hour='true'></datetime>
                    </b-form-group>
                </b-col>
                <b-col md='6'>
                    <b-form-group label="End Time:" label-for='end' description='MM/DD/YYYY hh:mm am/pm'>
                      <datetime v-model='end' type='datetime' input-class='form-control' :use12-hour='true'></datetime>
                    </b-form-group>
                </b-col>
                </b-form-row>

                <b-form-row>
                <b-col>
                    <b-form-group label="Interests:" label-for='address'>
                        <b-form-checkbox-group :options="interest_options" v-model='interests' />
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
                    <b-button v-if="!loading" type="submit" variant='warning' class='mt-2'>
                    + Update Offer
                    </b-button>
                    <b-button v-else disabled variant='warning' class='mt-2'>
                        <i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
                    </b-button>
                    <b-button @click="showModal" variant='danger' class='mt-2 badge-left'>
                    - Delete Offer
                    </b-button>
                </b-col>
                </b-form-row>

            </b-form>
        </b-col>
    </b-row>

    <b-modal ref="deleteOfferModal" centered title="Delete Offer">
        <p classs="mb-2"><b>Offer: </b><i>{{offer_name}}</i></p>
        <p class="my-4">Are you sure you want to delete this offer?</p>
       <div slot="modal-footer" class="w-100 text-center">
           <b-button class="mr-3" @click="hideModal" variant="primary">Keep Offer</b-button>
           <b-button variant="danger"  v-on:click="delete_offer">Delete Offer</b-button>
       </div>
    </b-modal>
</div>

</template>

<script>
import moment from "moment";

export default {
  props: ["offer", "getOffer", 'modal', 'toggleBtn'],
  data() {
    return {
        loading: false,
        business_id: this.$route.params.id,
        interest_options: [],
        error: null,
        offer_name: this.offer.description,
        start: moment(this.offer.start_time).format("YYYY-MM-DDTHH:mm"),
        end: moment(this.offer.end_time).format("YYYY-MM-DDTHH:mm"),
        interests: this.offer.interests.map(i => i.id)
    };
  },
  methods: {
    update: function() {
      this.loading = true;
      let url = `offers/${this.offer.id}`;
      this.$http
        .patch(url, {
          description: this.offer_name,
          start_time: moment(this.start).toISOString(),
          end_time: moment(this.end).toISOString(),
          interests: this.interests
        })
        .then(data => {
            console.log(data);
            this.loading = false;
            // Refresh the offer on the parent page
            this.getOffer();
            // Refresh the businesses
            this.$store.dispatch("getBusinesses");
            // clear error
            this.error = null
            // Collapse the modal
            if (this.modal) {
              this.$root.$emit('bv::toggle::collapse', this.modal)
            }
            // toggle the button text
            if (this.toggleBtn)
              this.toggleBtn()
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
          if (err.body.message) this.error = err.body.message;
          else if (err.body.error) this.error = err.body.error;
        });
    },
    showModal () {
      this.$refs.deleteOfferModal.show()
    },
    hideModal () {
      this.$refs.deleteOfferModal.hide()
    },
    delete_offer: function() {
      let url = `offers/${this.offer.id}`;
      this.$http
        .delete(url, {})
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
          if (err.body.message) this.error = err.body.message;
          else if (err.body.error) this.error = err.body.error;
        });
        this.hideModal();
        this.$router.push({name: `business-ads`, params: {id: this.business_id}})
    }
  },
  created() {
    // populate interest_options
    this.$http
      .get("interests")
      .then(data => {
        this.interest_options = data.body.interests.map(option => {
          return { value: option.id, text: option.name };
        });
      })
      .catch(console.error);
  }
};
</script>
