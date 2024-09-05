import { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
// TODO: improve this to reference dist types reference only. We don't want to accidentally call controllers, etc
import { DataObject } from '@charts-react-express/backend/src/models/data.model';
import { DataApi } from '@services/api/data.api';
import { ScatterPlotXYDropdowns, ScatterPlotXYDropdownsProps } from './ScatterPlotXYDropdowns';

type DataObjectKey = keyof Omit<DataObject, 'DATE' | 'PIC'>;

export function ScatterPlotChart() {

    const [data, setData] = useState<DataObject[]>([]);

    const [error, setError] = useState<string>();
    const [scatterPlotSelections, setScatterPlotSelections] = useState<ScatterPlotXYDropdownsProps['dataItems'] |  undefined>();

  const [axis, setAxis] = useState<[string, string]>(['X', 'Y']);

//   const [selection, setSelection] = useState<DropdownProps['list']>([]);
    const [selectedX, selectedY] = axis;
    
    const series: Highcharts.Options['series'] = [
      {
        name: 'Trace',
        id: 'PIC',
        marker: {
          symbol: 'circle'
        },
        type: 'scatter',
        data: (selectedX !== 'X' && selectedY !== 'Y') ? data.map((d: DataObject) => ({
          custom: d,
          x: d[selectedX as DataObjectKey] as number,
          y: d[selectedY as DataObjectKey] as number,
        })) : []
      }
    ];

    

    const options: Highcharts.Options = {
      colors: [
        '#29050e'
      ],
      chart: {
        type: 'scatter',
      },
      title: {
        text: undefined
      },
      xAxis: {
        title: {
          text: selectedX
        },
      },
      yAxis: {
        title: {
          text: selectedY
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
    const fetchData = async () => {
        try {
            // TODO: improve this by using a state management such as Redux or Zustand so that data can also be accessible to subcomponents reducing re-renders
            const dataItems = await DataApi.fetchData();
            if (dataItems.length > 0) {
                // filtering list of items to be used for X,Y dropdown selections
                const listOfDataItems = Object.keys(dataItems[0]).filter(key => !['DATE', 'PIC'].includes(key)) as unknown as ScatterPlotXYDropdownsProps['dataItems'];
                // pre-selecting initial dropdown selections
                if (listOfDataItems.length >= 2) {
                    const [xAxisSelection, yAxisSelection] = listOfDataItems;
                    setAxis([xAxisSelection, yAxisSelection]);
                    console.log('selecting', xAxisSelection, yAxisSelection, listOfDataItems);
                }
                setScatterPlotSelections(listOfDataItems);
            }

            setData(dataItems);
        } catch (err) {
            setError('Failed to fetch data');
            console.error(err);
        }
    };

    fetchData();

  }, []);

  

  return (
    <>
        {error && <div className='text-red-500 font-bold'>{error}</div>}
        
        {!error && ((data.length === 0) ? 
            <div>Fetching data&hellip;</div> :
            <div className='w-full sm:w-full md:w-[75%] lg:w-[50%] m-0 ml-auto mr-auto'>
                <h2 className="text-slate-900 font-extrabold text-2xl text-center m-4">{selectedX} vs {selectedY} {error}</h2>
                {
                    scatterPlotSelections && axis && 
                    <div className='m-4'>
                        <ScatterPlotXYDropdowns 
                            dataItems={scatterPlotSelections}
                            axisSelections={axis}
                            onAxisSelections={setAxis}
                        />
                    </div>
                }
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
        )}
    </>
  )
} 