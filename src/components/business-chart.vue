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
              chartData: {},
              options: {
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
      methods: {
          reloadChart() {
              let offerData = this.offers.map(offer => {
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

              this.chartData.labels = offerData.map(offer => offer.start.format('MMM DD, YYYY'))
              this.chartData.datasets = [
                  {
                      label: '# of Views',
                      data: offerData.map(offer => offer.views),
                      fill: false,
                      borderColor: '#f7b731',
                      backgroundColor: 'rgba(247, 183, 49,0.75)'
                  },
                  {
                      label: '# of Accepts',
                      data: offerData.map(offer => offer.accepts),
                      fill: false,
                      borderColor: '#20bf6b',
                      backgroundColor: 'rgba(32, 191, 107,0.75)'
                  }
              ]
              this.renderChart(this.chartData, this.options)
          }
      },
      watch: {
          offers: function(val, old) {
              if (this.$data._chart)
                this.$data._chart.destroy()
              this.reloadChart()
          }
      },
      mounted() {
          if (this.offers.length) this.reloadChart()
      }
  }
</script>
