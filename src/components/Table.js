import React, { useContext, useEffect, useState } from 'react';
import PlanetProvider from '../context/PlanetProvider';

function Table() {
  const { planetsData, nameFilter, columnFilter,
    comparisonFilter, valueFilter,
    filtersColumnList, setFiltersColumnList } = useContext(PlanetProvider);
  const [dataList, setDataList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filteredListByNumber, setFilteredListByNumber] = useState([]);

  useEffect(() => {
    setDataList(planetsData);
  }, [planetsData]);

  const removeFilter = () => {
    setFiltersColumnList(filtersColumnList
      .filter((item) => item !== columnFilter));
  };

  const buttonClick = () => {
    const newFilteredList = filteredList.filter((item) => {
      if (comparisonFilter === 'maior que') {
        return +item[columnFilter] > +valueFilter;
      } if (comparisonFilter === 'menor que') {
        return +item[columnFilter] < +valueFilter;
      }
      return +item[columnFilter] === +valueFilter;
    });
    setFilteredListByNumber(newFilteredList);
    removeFilter();
  };

  useEffect(() => {
    setFilteredList(filteredListByNumber);
  }, [filteredListByNumber]);

  useEffect(() => {
    setFilteredList(dataList.filter(
      (item) => item.name.toUpperCase().includes(nameFilter.toUpperCase()),
    ));
  }, [nameFilter, dataList]);

  return (
    <div>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ buttonClick }
      >
        Filtrar
      </button>
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
          { filteredList.length === 0
            ? (dataList.map((planet) => (
              <tr key={ planet.name }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            )))
            : (filteredList.map((item) => (
              <tr key={ item.name }>
                <td>{item.name}</td>
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
            )))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
