<script>
/**
 * TO USE:
 *      render: <BusinessStats :offers='offers'></BusinessStats>
 *      where: offers = an array of all offers for a given businesses
 */

import {Line} from 'vue-chartjs'
import moment from 'moment'

export default {
      extends: Line,
      props: ['offers'],
      data () {
          return {
              offerData: {},
              chartData: {},
              options: {
                  title: {
                      display: true,
                      text: 'Consumer engagement over all offers',
                      fontSize: 20
                  },
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true
                          }
                      }]
                  },
                  responsive: true,
                  maintainAspectRatio: false
              }
          }
      },
      mounted () {
          this.renderChart(this.chartData, this.options)
      },
      beforeMount() {
          this.offerData = this.offers.map(offer => {
                      return {
                          views: offer.views,
                          accepts: offer.accepts,
                          start: new moment(offer.start_time)
                      }
                  }).sort(function(a,b) {
                      if (a.start < b.start) return -1
                      if (b.start < a.start) return 1
                      return 0
                  })

          this.chartData.labels = this.offerData.map(offer => offer.start.format('MMM DD, YYYY'))
          this.chartData.datasets = [
              {
                  label: '# of Views',
                  data: this.offerData.map(offer => offer.views),
                  fill: false
              },
              {
                  label: '# of Accepts',
                  data: this.offerData.map(offer => offer.accepts),
                  fill: false
              }
          ]
      }
  }
</script>
