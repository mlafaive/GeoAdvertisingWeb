<template>
    <div>
        <b-row>
            <b-col>
                <h1>Sample Business Chart</h1>
                <BusinessChart :offers='offers' class='mt-5'></BusinessChart>
            </b-col>
        </b-row>

        <b-row class='flex align-items-center mt-5 mb-5'>
            <b-col lg='6'>
                <h1 class='font-weight-light'>Consumer Engagement</h1>
                <p class='lead'>Categorizes the users who interacted with this offer into two categories:</p>
                <ul class='lead'>
                    <li><b>passed</b>: viewed the offer but did not accept.</li>
                    <li><b>accepted</b>: viewed the offer and accepted it.</li>
                </ul>
            </b-col>
            <b-col cols='8' offset='2' sm='6' offset-sm='3' lg='4' offset-lg='2'>
                <OfferAcceptChart :offer='offer'></OfferAcceptChart>
            </b-col>
        </b-row>

        <b-row class='flex align-items-center mt-5 mb-5'>
            <b-col lg='6'>
                <h1 class='font-weight-light'>Engagement by Segment</h1>
                <p class='lead'>Categorizes the users who <b>accepted</b> with this offer by their primary interest.</p>
            </b-col>
            <b-col cols='8' offset='2' sm='6' offset-sm='3' lg='4' offset-lg='2'>
                <OfferInterestChart :offer='offer'></OfferInterestChart>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import BusinessChart from '../components/business-chart.vue'
import OfferInterestChart from '../components/offer-interest-chart.vue'
import OfferAcceptChart from '../components/offer-accept-chart.vue'

export default {
	name: 'Sandbox',
    components: {BusinessChart, OfferInterestChart, OfferAcceptChart},
    data() {
        return {
            offers: this.$store.state.businesses[0].offers,
            offer: {
                        "accepted_segments": {
                            "Clothing": 10,
                            "Entertainment": 2,
                            "Food": 24,
                            "Home Goods": 13,
                            "Sports": 1,
                            "Technology": 16,
                            "Transportation": 9
                        },
                        "id": 2,
                        "accepts": 35,
                        "views": 100
                    }
        }
    }
}

</script>
