import React, { useContext, useEffect, useState } from 'react';
import PlanetProvider from '../context/PlanetProvider';

function Table() {
  const { planetsData, nameFilter, columnFilter,
    comparisonFilter, valueFilter,
    filtersColumnList, setFiltersColumnList,
    setColumnFilter } = useContext(PlanetProvider);
  const [filteredList, setFilteredList] = useState([]);
  const [filteredListByNumber, setFilteredListByNumber] = useState([]);
  const [currFilters, setcurrFilters] = useState([]);
  const filters = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  useEffect(() => {
    setFilteredList(planetsData);
  }, [planetsData]);

  useEffect(() => {
    setFilteredList(filteredListByNumber);
  }, [filteredListByNumber]);

  useEffect(() => {
    if (currFilters.length === 0) {
      setFilteredList(planetsData);
    }
  }, [currFilters, planetsData]);

  useEffect(() => {
    setFilteredList(planetsData.filter(
      (item) => item.name.toUpperCase().includes(nameFilter.toUpperCase()),
    ));
    if (nameFilter.length === 0) {
      setFilteredList(planetsData);
    }
  }, [nameFilter, planetsData]);

  const removeFilter = () => {
    setFiltersColumnList(filtersColumnList
      .filter((item) => item !== columnFilter));
    setColumnFilter(filtersColumnList[0]);
  };

  const addCurrFilter = () => {
    setcurrFilters([...currFilters, { columnFilter, comparisonFilter, valueFilter }]);
  };

  const buttonClick = () => {
    setFilteredListByNumber(filteredList.filter((item) => {
      if (comparisonFilter === 'maior que') {
        return +item[columnFilter] > +valueFilter;
      }
      if (comparisonFilter === 'menor que') {
        return +item[columnFilter] < +valueFilter;
      }
      return +item[columnFilter] === +valueFilter;
    }));
    addCurrFilter();
    removeFilter();
  };

  function updateFilteredList(list, filter) {
    let newFilter = [];
    switch (filter.comparisonFilter) {
    case 'menor que':
      newFilter = list
        .filter((item) => +item[filter.columnFilter] < +filter.valueFilter);
      return newFilter;
    case 'igual a':
      newFilter = list
        .filter((item) => +item[filter.columnFilter] === +filter.valueFilter);
      return newFilter;
    default:
      newFilter = list
        .filter((item) => +item[filter.columnFilter] > +filter.valueFilter);
    }
    setFilteredList(newFilter);
  }

  const removeCurrFilter = (item) => {
    setFiltersColumnList(
      [...filtersColumnList,
        item.columnFilter],
    );
    const newFilters = currFilters
      .filter((element) => element.columnFilter !== item.columnFilter);
    console.log(newFilters);
    setcurrFilters(newFilters);
    newFilters.map((filter) => updateFilteredList(planetsData, filter));
  };

  const removeAllFilters = () => {
    setFiltersColumnList(filters);
    setcurrFilters([]);
    setFilteredList(planetsData);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ buttonClick }
      >
        Filtrar
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remover Filtros
      </button>
      {currFilters.map((item, index) => (
        <div key={ index } data-testid="filter">
          <span>
            {`${item.columnFilter} ${item.comparisonFilter} ${item.valueFilter}`}
          </span>
          <button
            type="button"
            data-testid="button-remove-filter"
            onClick={ () => removeCurrFilter(item) }
          >
            X
          </button>
        </div>
      ))}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredList.map((item) => (
              <tr key={ item.name }>
                <td data-testid="planets-name">{item.name}</td>
                <td>{item.rotation_period}</td>
                <td>{item.orbital_period}</td>
                <td>{item.diameter}</td>
                <td>{item.climate}</td>
                <td>{item.gravity}</td>
                <td>{item.terrain}</td>
                <td>{item.surface_water}</td>
                <td>{item.population}</td>
                <td>{item.films}</td>
                <td>{item.created}</td>
                <td>{item.edited}</td>
                <td>{item.url}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
