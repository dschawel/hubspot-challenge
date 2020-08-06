import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.css';

function App() {

  let [data, setData] = useState({ hits: [] })

  // API call via useEffect
  useEffect(() => {
    // Define a function to get the data
    const getData = async () => {
      let results = await Axios('https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=52bd2af9be7e3ae4e73d12de6325')
      console.log('Results:', results.data)
      setData(results.data)
    }

    // Call the function
    getData()
  }, []) // Onload only - just empty array

  // Format the data for the results
  let dates = data.hits.map((hit, i) => {
    return (
      <li key={i}>
        {hit.partners.availableDates}
      </li>
    )
  }) 

  return (
    <div className="App">
      <h1>Hubspot Challenge</h1>
        <div>
          {dates}
        </div>
    </div>
  );
}

export default App;
