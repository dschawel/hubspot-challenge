
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.css';

function App() {

  let [data, setData] = useState({ partners: [] })
  let [firstName, setFirstName] = useState('')
  let [lastName, setLastName] = useState('')
  let [email, setEmail] = useState('')
  let [country, setCountry] = useState('')
  let [available, setAvailable] = useState('')

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

const handleSubmit = e => {
  e.preventDefault()
  let data = {
    firstName,
    lastName,
    email,
    country,
    available
  }
  fetch('https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=52bd2af9be7e3ae4e73d12de6325', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    }
  })
  .then(response => response.json())
  .then (result => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setCountry('')
    setAvailable('')
  })
  .catch(err => {
    console.log('Error', err)
  })
}
// NEED SOMEWAY TO FILTER THROUGH THE LIST OF AVAILABLE DATES
  // let available = data.partners.filter(date => {
  //     return (
  //       <p>{date}</p>
  //     )
  //   })
  

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
        <div>
          <form>
            <lable>First Name</lable>
            <input name={firstName} onChange={e => setFirstName(e.target.value)} />
            <lable>Last Name</lable>
            <input name={lastName} onChange={e => setLastName(e.target.value)} />
            <lable>Email</lable>
            <input name={email} onChange={e => setEmail(e.target.value)} />
            <lable>Country</lable>
            <input name={country} onChange={e => setCountry(e.target.value)} />
            <lable>Available Dates</lable>
            <input name={available} onChange={e => setAvailable(e.target.value)} />
            <button type="submit" onClick={handleSubmit}>Submit</button>
          </form>
        </div>
    </div>
  );
}

export default App;
