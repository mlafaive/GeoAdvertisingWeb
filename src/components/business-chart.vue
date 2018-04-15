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
                      fill: false
                  },
                  {
                      label: '# of Accepts',
                      data: offerData.map(offer => offer.accepts),
                      fill: false
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
