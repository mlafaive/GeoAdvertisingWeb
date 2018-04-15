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
      props: ['offer'],
      mixins: [mixins.reactiveData],
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
            this.chartData.labels = Object.keys(this.offer.accepted_segments)
            this.chartData.datasets = [
                {
                    data: this.chartData.labels.map(label => this.offer.accepted_segments[label]),
                    backgroundColor: [
                        '#eb3b5a',
                        '#fa8231',
                        '#f7b731',
                        '#20bf6b',
                        '#3867d6',
                        '#3B3B98',
                        '#8854d0',
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
          if (this.offer.accepted_segments) this.reloadChart()
      }
  }
</script>
