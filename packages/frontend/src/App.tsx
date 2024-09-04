import { useEffect, useState } from 'react'
import './App.css'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
// TODO: improve this to reference dist types reference only. We don't want to accidentally call controllers, etc
import { DataObject } from '@charts-react-express/backend/src/models/data.model';


function App() {
  const [data, setData] = useState<DataObject[]>([]);
    
    // TODO: move this to a separate component
    const series: Highcharts.Options['series'] = [
      {
        name: 'Trace',
        id: 'PIC',
        marker: {
          symbol: 'circle'
        },
        type: 'scatter',
        data: data.map((d: DataObject) => ({
          custom: d,
          x: d.HSCW,
          y: d.IMF
        }))
      }
    ]

    const options: Highcharts.Options = {
      colors: [
        '#29050e'
      ],
      chart: {
        type: 'scatter',
      },
      title: {
        text: 'Scatter Plot of HSCW vs IMF'
      },
      xAxis: {
        title: {
          text: 'HSCW'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
      },
      yAxis: {
        title: {
          text: 'IMF'
        }
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 5,
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)'
              }
            }
          },
          states: {
            hover: {
              enabled: true
            }
          },
          tooltip: {
            pointFormatter: function() {
              const info = Object.entries(this.options.custom as DataObject);
              return info.map(([key, value]) => `${key}: <b>${value}</b>`).join('<br/>');
            },
          }
        }
      },
      series
    };

  useEffect(() => {
    console.log('fetching data');
    // TODO: move to separate service
    fetch('/api/data').then((data) => {
      data.json().then((d) => {
        console.log('data', d);
        setData(d);
      });
    });
  }, []);

  return (
    <>
      <div>
        {data.length === 0 ? 
          <div>Fetching data</div> :
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
        }
      </div>
    </>
  )
}

export default App
