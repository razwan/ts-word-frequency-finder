import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarGraph: React.FunctionComponent = props => {
  const [ frequency, setFrequency ] = useState( [] );

  useEffect( () => {
    const fetchData = async () => {
      const response = await fetch( '/words' );
      const data = await response.json();
      setFrequency( data.slice( 0, 30 ) );
    }

    fetchData().catch( console.error );
  }, [] );

  const data = {
    labels: frequency.map( set => set[0] ),
    datasets: [ {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      label: 'Appearances',
      data: frequency.map( set => set[1] )
    } ]
  };

  if ( ! frequency.length ) {
    return null;
  }

  return (
    <div>
      <Bar data={ data } />
    </div>
  )
}

ReactDOM.render(
  <BarGraph />,
  document.getElementById('app')
);
