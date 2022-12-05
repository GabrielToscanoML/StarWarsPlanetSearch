import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import MockResult from './MockResult';

describe('Testes da aplicação', () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(MockResult),
    });
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('1 - Testa resultado com o filtro menor que aplicado', async () => {
    render(<App />);
    await waitFor (() => {
      const tatooine = screen.queryByText('Tatooine');
      expect(tatooine).toBeInTheDocument();
    })
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '5000');
    userEvent.click(buttonFilter);
    const endor = await screen.findByText('Endor');
    expect(endor).toBeInTheDocument();
  });
  test('2 - Testa resultado com o filtro maior que aplicado', async () => {
    render(<App />);
    await waitFor (() => {
      const tatooine = screen.queryByText('Tatooine');
      expect(tatooine).toBeInTheDocument();
    })
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.selectOptions(columnFilter, 'rotation_period');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, 26);
    userEvent.click(buttonFilter);
    const Kamino = await screen.findByText('Kamino');
    expect(Kamino).toBeInTheDocument();
  });

  test('3 - Testa resultado com o filtro maior que aplicado', async () => {
    render(<App />);
    await waitFor (() => {
      const tatooine = screen.queryByText('Tatooine');
      expect(tatooine).toBeInTheDocument();
    })
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.selectOptions(columnFilter, 'surface_water');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, 0);
    userEvent.click(buttonFilter);
    const bespin = await screen.findByText('Bespin');
    expect(bespin).toBeInTheDocument();
  });
  test('4 - Testa o filtro por nome vazio', async () => {
    render(<App />);
    await waitFor (() => {
      const tatooine = screen.queryByText('Tatooine');
      expect(tatooine).toBeInTheDocument();
    })
    const planetsName = screen.getAllByTestId('planets-name');
    const nameFilter = screen.getByTestId('name-filter');
    userEvent.type(nameFilter, 'ta');
    const tatooine = await screen.findByText('Tatooine');
    expect(tatooine).toBeInTheDocument();
    userEvent.clear();
    expect(planetsName).toHaveLength(10);
  });
});
