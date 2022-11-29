import React, { useEffect, useState, useMemo } from 'react';
import PlanetProvider from './context/PlanetProvider';
import './App.css';
import Table from './components/Table';

function App() {
  const [planetsData, setPlanetsData] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [filtersColumnList, setFiltersColumnList] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

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

  const values = useMemo(() => ({
    planetsData,
    nameFilter,
    columnFilter,
    comparisonFilter,
    valueFilter,
    filtersColumnList,
    setFiltersColumnList,
    setColumnFilter,
  }), [planetsData, nameFilter, columnFilter,
    comparisonFilter, valueFilter, filtersColumnList]);

  return (
    <PlanetProvider.Provider value={ values }>
      <input
        className="filter-input"
        type="text"
        data-testid="name-filter"
        name="nameFilter"
        value={ nameFilter }
        onChange={ ({ target }) => setNameFilter(target.value) }
      />
      <label htmlFor="coluna">
        <select
          data-testid="column-filter"
          name="columnFilter"
          onChange={ ({ target }) => setColumnFilter(target.value) }
          value={ columnFilter }
        >
          {
            filtersColumnList.map((item, index) => (
              <option key={ index }>{ item }</option>
            ))
          }
        </select>
      </label>
      <label htmlFor="operador">
        <select
          data-testid="comparison-filter"
          name="comparisonFilter"
          onChange={ ({ target }) => setComparisonFilter(target.value) }
          value={ comparisonFilter }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <input
        type="number"
        data-testid="value-filter"
        name="valueFilter"
        value={ valueFilter }
        onChange={ ({ target }) => setValueFilter(target.value) }
      />
      <Table />
    </PlanetProvider.Provider>
  );
}

export default App;
