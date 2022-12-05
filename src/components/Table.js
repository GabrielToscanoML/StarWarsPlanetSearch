import React, { useContext, useEffect, useState } from 'react';
import PlanetProvider from '../context/PlanetProvider';

function Table() {
  const { planetsData, nameFilter, columnFilter,
    comparisonFilter, valueFilter,
    filtersColumnList, setFiltersColumnList,
    setColumnFilter } = useContext(PlanetProvider);
  const [filteredList, setFilteredList] = useState([]);
  const [filteredListByNumber, setFilteredListByNumber] = useState([]);
  // const [currFilters, setcurrFilters] = useState([]);
  const filters = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  useEffect(() => {
    setFilteredList(planetsData);
  }, [planetsData]);

  useEffect(() => {
    setFilteredList(filteredListByNumber);
  }, [filteredListByNumber]);

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

  // const addCurrFilter = () => {
  //   setcurrFilters([...currFilters, { columnFilter, comparisonFilter, valueFilter }]);
  // };
  const buttonClick = () => {
    const newFilteredList = filteredList.filter((item) => {
      if (comparisonFilter === 'maior que') {
        return +item[columnFilter] > +valueFilter;
      }
      if (comparisonFilter === 'menor que') {
        return +item[columnFilter] < +valueFilter;
      }
      return +item[columnFilter] === +valueFilter;
    });
    setFilteredListByNumber(newFilteredList);
    // addCurrFilter();
    removeFilter();
  };

  // const removeCurrFilter = (columnfilter) => {
  //   setFiltersColumnList(
  //     [...filtersColumnList,
  //       columnfilter],
  //   );
  //   setcurrFilters(currFilters
  //     .filter((item) => item.columnFilter !== columnfilter));

  //   if (currFilters.length === 0) {
  //     setFilteredList([]);
  //   } else {
  //     setFilteredList(filteredList
  //       .filter((item) => item.columnFilter >= 0)); // tá errado
  //   }
  // };

  const removeAllFilters = () => {
    setFiltersColumnList(filters);
    // setcurrFilters([]);
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
      {/* <ul>
        {
          currFilters.map((item) => (
            <li key={ item.columnFilter }>
              {item.columnFilter}
              {' '}
              {item.comparisonFilter}
              {' '}
              {item.valueFilter}
              {' '}
              <button
                type="button"
                data-testid="filter"
                onClick={ () => removeCurrFilter(item.columnFilter) }
              >
                X
              </button>
            </li>
          ))
        }
      </ul> */}
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
