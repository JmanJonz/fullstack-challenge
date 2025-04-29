import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Deals() {


    const {id} = useParams();
    console.log(id, "this is the id passed in")
    const [deals, setDeals] = useState([])  // fetch the deals data

useEffect(() => {
  async function fetchData() {
    try {
      const response = await fetch(`http://localhost:3000/deals/${id}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Data from API:', data);
      setDeals(data.rows);

      console.log("rows", deals)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  // Call the async function to start the data fetching
  fetchData();
}

,[])

  return (
            <div>
            <h1>Here are the fetched deals from the backend api: </h1>
            {deals.map((deal) => {
              return <div>{deal.deal_name}</div>
            })}
          </div>    
  )
}

export default Deals
