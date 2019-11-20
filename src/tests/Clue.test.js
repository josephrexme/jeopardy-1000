import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter as Router } from 'react-router-dom';
import Clue from '../pages/Clue';

afterEach(cleanup);

it('Shows the question on initial load', () => {
  // Wrap in router because of withRouter
  const { getByTestId } = render(<Router><Clue /></Router>);
  const categoryDropdown = getByTestId('title');
  const toggleButton = getByTestId('toggle-btn');
  expect(categoryDropdown).not.toBeNull();
  expect(toggleButton).toHaveTextContent('Show answer');
});

it('allows toggling between question and answer', () => {
  const { getByTestId } = render(<Router><Clue /></Router>);
  const toggleButton = getByTestId('toggle-btn');
  fireEvent.click(toggleButton)
  expect(toggleButton).toHaveTextContent('Show question');
});
