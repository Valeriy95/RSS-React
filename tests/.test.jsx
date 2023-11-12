const React = require('react');
const { render, screen } = require('@testing-library/react');
const { BrowserRouter: Router } = require(react-router-dom);
const ItemComponent = require('../src/components/ItemComponent');


test('отображает указанное количество карточек', () => {

  const mockContextValues = {
    data: [{ name: 'Card 1' }, { name: 'Card 2' }],
    inputValue: '',
    itemAllPages: 10,
    lastPage: 2,
    updateData: jest.fn(),
    updateArrAllPages: jest.fn(),
    updatePage: jest.fn(),
    updateSetDetailData: jest.fn(),
    arrAllPages: [1, 2],
  };

  render(
    <ContextProvider value={mockContextValues}>
      <ItemComponent />
    </ContextProvider>
  );

  expect(screen.getByText('Name: Card 1;')).toBeInTheDocument();
  expect(screen.getByText('Name: Card 2;')).toBeInTheDocument();
});

test('отображает сообщение, если карты отсутствуют', () => {

  const mockContextValues = {
    data: [],
    inputValue: '',
    itemAllPages: 10,
    lastPage: 1,
    updateData: jest.fn(),
    updateArrAllPages: jest.fn(),
    updatePage: jest.fn(),
    updateSetDetailData: jest.fn(),
    arrAllPages: [1],
  };

  render(
    <ContextProvider value={mockContextValues}>
      <ItemComponent />
    </ContextProvider>
  );

  expect(screen.getByText('Сообщение об отсутствии карт')).toBeInTheDocument();
});
