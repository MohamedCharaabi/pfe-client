import { useEffect, useState } from 'react'
import axios from 'axios'
import TinyChartStats from '@components/widgets/stats/TinyChartStats'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Auc', 'Nov', 'Des']
const ProfitLineChart = ({ info, props }) => {
  const [data, setData] = useState(null)

  useEffect(async () => {
    // axios.get('/card/card-statistics/profit-line-chart').then(res => setData(res.data))
    await axios.get('http://pfe-cims.herokuapp.com/stat').then(res => setData(res.data.monthRequest))

  }, [])

  const series = {
    title: 'theme par mois',
    statistics: '6,24k',
    series: [
      {
        data: props.map(th => th._id.topmonth)
      }
    ]
  }

  // const options = {
  //   chart: {
  //     toolbar: {
  //       show: false
  //     },
  //     zoom: {
  //       enabled: false
  //     }
  //   },
  //   grid: {
  //     borderColor: '#EBEBEB',
  //     strokeDashArray: 5,
  //     xaxis: {
  //       lines: {
  //         show: true
  //       }
  //     },
  //     yaxis: {
  //       lines: {
  //         show: false
  //       }
  //     },
  //     padding: {
  //       top: -20,
  //       bottom: -10
  //     }
  //   },
  //   stroke: {
  //     width: 3,
  //     curve: 'smooth'
  //   },

  //   colors: [info],
  //   series: [

  //     {
  //       data: [1, 5, 8, 4]
  //     }
  //   ],
  //   markers: {
  //     size: 2,
  //     colors: info,
  //     strokeColors: info,
  //     strokeWidth: 2,
  //     strokeOpacity: 1,
  //     strokeDashArray: 0,
  //     fillOpacity: 1,
  //     discrete: [
  //       {
  //         seriesIndex: 0,
  //         dataPointIndex: 5,
  //         fillColor: '#ffffff',
  //         strokeColor: info,
  //         size: 5
  //       }
  //     ],
  //     shape: 'circle',
  //     radius: 2,
  //     hover: {
  //       size: 3
  //     }
  //   },
  //   xaxis: {
  //     labels: {
  //       show: true,
  //       style: {
  //         fontSize: '0px'
  //       }
  //     },
  //     // axisBorder: {
  //     //   show: false
  //     // },
  //     // axisTicks: {
  //     //   show: false
  //     // },
  //     categories: data.map(dd => months[dd._id.month])
  //   },
  //   yaxis: {
  //     show: false
  //   },
  //   tooltip: {
  //     x: {
  //       show: false
  //     }
  //   }
  // }

  return data !== null ? (
    <TinyChartStats
      height={150}
      // width={500}
      type='area'
      options={{
        chart: {
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        grid: {
          borderColor: '#EBEBEB',
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: false
            }
          },
          padding: {
            top: -20,
            bottom: -10
          }
        },
        stroke: {
          width: 3,
          curve: 'smooth'
        },

        colors: [info],
        series: [

          {
            data: [1, 5, 8, 4]
          }
        ],
        markers: {
          size: 2,
          colors: info,
          strokeColors: info,
          strokeWidth: 2,
          strokeOpacity: 1,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [
            {
              seriesIndex: 0,
              dataPointIndex: 5,
              fillColor: '#ffffff',
              strokeColor: info,
              size: 5
            }
          ],
          shape: 'circle',
          radius: 2,
          hover: {
            size: 3
          }
        },
        xaxis: {
          labels: {
            show: true,
            style: {
              fontSize: '14px'
            }
          },
          // axisBorder: {
          //   show: false
          // },
          // axisTicks: {
          //   show: false
          // },
          categories: data.map(dd => months[dd._id.month])
        },
        yaxis: {
          show: false
        },
        tooltip: {
          x: {
            show: true
          }
        }
      }}
      title={'Demmandes par mois'}
      stats={data.statistics}
      series={[
        {
          name: "Demmandes",
          data: data.map(dd => dd.nubr)
          // data: [1, 2, 3, 1]
        }
      ]}
    />
  ) : null
}

export default ProfitLineChart
