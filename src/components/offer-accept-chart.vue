<script>
/**
 * TO USE:
 *      render: <OfferInterestStats :offer='offer'></OfferInterestStats>
 *      where: offer = a single offer
 */

import {Doughnut, mixins} from 'vue-chartjs'
import moment from 'moment'

export default {
      extends: Doughnut,
      mixins: [mixins.reactiveData],
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
      methods: {
        reloadChart() {
            this.chartData.labels = ['Passed', 'Accepted']
            this.chartData.datasets = [
                {
                    data: [this.offer.views - this.offer.accepts, this.offer.accepts],
                    backgroundColor: [
                        '#f7b731',
                        '#20bf6b',
                    ]
                }
            ]
            this.renderChart(this.chartData, this.options)
        }
      },
      watch: {
          offer: function(newVal, oldVal) {
              if (this.$data._chart)
                this.$data._chart.destroy()
              this.reloadChart()
          }
      },
      mounted() {
          if (this.offer.accepts) this.reloadChart()
      }
  }
</script>
