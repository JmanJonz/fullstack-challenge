import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "tailwindcss"


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
            <div className='flex flex-col gap-2 mx-auto'>
            <h1 className='mx-auto text-[30px] text-blue-500 font-bold'>Deals:</h1>
            <div className='border mx-auto p-5'>{deals.map((deal) => {
              return <div className="text-[20px] font-bold mx-auto">{deal.deal_name + " $" + deal.value}</div>
            })}</div>
          </div>    
  )
}

export default Deals
