import React, { useEffect, useState } from 'react';
import PlanetProvider from './context/PlanetProvider';
import './App.css';
import Table from './components/Table';

function App() {
  const [planetsData, setPlanetsData] = useState([]);
  const fetchData = async () => {
    const request = await fetch('https://swapi.dev/api/planets');
    const response = await request.json();
    const dataResult = response.results;
    const filteredData = dataResult.filter((item) => delete item.residents);
    setPlanetsData(filteredData);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <PlanetProvider.Provider value={ planetsData }>
      <Table />
    </PlanetProvider.Provider>
  );
}

export default App;
