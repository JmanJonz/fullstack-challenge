function App() {
  // fetch the deals data
  async function fetchData() {
    try {
      const response = await fetch('http://localhost:3000/deals');
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Data from API:', data);
      // Now you can work with your API data here!
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  // Call the async function to start the data fetching
  fetchData();

  return (
    <div>
      <h1>Here are the fetched deals from the backend api: </h1>
      {data.rows.map((row) => {
        
      })}

    </div>
  )
}

export default App
