import React, { useEffect, useState } from 'react';
import PlanetProvider from './context/PlanetProvider';
import './App.css';
import Table from './components/Table';

function App() {
  const [planetsData, setPlanetsData] = useState([]);
  const [nameFilter, setNameFilter] = useState('');

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

  // const handleChange = (e) => {
  //   setNameFilter({
  //     [e.target.name]: e.target.value,
  //   });
  // };

  return (
    <PlanetProvider.Provider value={ planetsData }>
      <input
        className="filter-input"
        type="text"
        data-testid="name-filter"
        name="nameFilter"
        value={ nameFilter }
        onChange={ ({ target }) => setNameFilter(target.value) }
      />
      <Table />
    </PlanetProvider.Provider>
  );
}

export default App;
