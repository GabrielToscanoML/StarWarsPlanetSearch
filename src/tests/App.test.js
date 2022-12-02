import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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

  test('1 - Testa resultado com filtros aplicados', async () => {
    render(<App />);
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.type(valueFilter, '5000');
    userEvent.click(buttonFilter);

    const endor = await screen.findByText('Endorr');
    expect(endor).not.toBeInTheDocument();
  });
});
