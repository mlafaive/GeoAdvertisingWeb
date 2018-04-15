<script>
/**
 * TO USE:
 *      render: <OfferInterestStats :offer='offer'></OfferInterestStats>
 *      where: offer = a single offer
 */

import {Doughnut} from 'vue-chartjs'
import moment from 'moment'

export default {
      extends: Doughnut,
      props: ['offer'],
      data () {
          return {
              chartData: {},
              options: {
                  legend: {
                      position: 'right',
                      labels: {
                          usePointStyle: true,
                      }
                  }
              },
          }
      },
      mounted () {
          this.renderChart(this.chartData, this.options)
      },
      beforeMount() {
          this.chartData.labels = ['Passed', 'Accepted']
          this.chartData.datasets = [
              {
                  data: [this.offer.views - this.offer.accepts, this.offer.accepts],
                  backgroundColor: [
                      '#eb3b5a',
                      '#20bf6b',
                  ]
              }
          ]
      }
  }
</script>
