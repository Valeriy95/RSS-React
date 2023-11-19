import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ItemComponent } from '../src/components/ItemComponent';

const mockStore = configureStore();

it('отображает указанное количество карточек', () => {
  const mockStoreState = {
    app: {
      data: [{ name: 'Card 1' }, { name: 'Card 2' }],
      inputValue: '',
      itemAllPages: 10,
      lastPage: 2,
      updateData: jest.fn(),
      updateArrAllPages: jest.fn(),
      updatePage: jest.fn(),
      updateSetDetailData: jest.fn(),
      arrAllPages: [1, 2],
    },
  };

  const store = mockStore(mockStoreState);

  render(
    <Provider store={store}>
      <BrowserRouter>
        <ItemComponent />
      </BrowserRouter>
    </Provider>,
  );

  expect(screen.getByText('Name: Card 1;')).toBeInTheDocument();
  expect(screen.getByText('Name: Card 2;')).toBeInTheDocument();
});

it('отображает сообщение, если карты отсутствуют', () => {
  const mockStoreState = {
    app: {
      data: [],
      inputValue: '',
      itemAllPages: 10,
      lastPage: 1,
      updateData: jest.fn(),
      updateArrAllPages: jest.fn(),
      updatePage: jest.fn(),
      updateSetDetailData: jest.fn(),
      arrAllPages: [1],
    },
  };

  const store = mockStore(mockStoreState);

  render(
    <Provider store={store}>
      <BrowserRouter>
        <ItemComponent />
      </BrowserRouter>
    </Provider>,
  );

  expect(screen.getByText('Сообщение об отсутствии карт')).toBeInTheDocument();
});
