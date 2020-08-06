
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.css';

function App() {

  let [data, setData] = useState({ partners: [] })

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


// NEED SOMEWAY TO FILTER THROUGH THE LIST OF AVAILABLE DATES
  // let available
  // if (data.partners.availableDates) {
  //   available = data.partners.availableDates.filter(date => {
  //     return (
  //       <p>{date}</p>
  //     )
  //   })
  // }

  // Format the data for the results
  let dates = data.partners.map((p, i) => {
    return (
      <div key={i}>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>Available Dates</th>
            </tr>
          </thead>
            <tbody>
              <td>{p.firstName}</td>
              <td>{p.lastName}</td>
              <td>{p.email}</td>
              <td>{p.country}</td>
              <td>{p.availableDates}</td>
            </tbody>
        </table>
      </div>
    )
  }) 

  return (
    <div className="App">
      <h1>Hubspot Challenge</h1>
        <div>
          {dates}
          {/* {available} */}
        </div>
    </div>
  );
}

export default App;
