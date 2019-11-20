import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  cleanup,
  waitForElement,
  waitForDomChange,
  render,
  fireEvent
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SelectionContext } from '../router';
import Board from '../pages/Board';

afterEach(cleanup);

it('Has a page heading', () => {
  const { queryByText } = render(<Board />);
  expect(queryByText(`Jeopardy - Let's Play`)).not.toBeNull();
});

it('starts with a default of 6 categories and 5 clues', () => {
  const { getByTestId } = render(<Board />);
  const categoryDropdown = getByTestId('category-count');
  const clueDropdown = getByTestId('clue-count');
  expect(categoryDropdown).toHaveValue('6');
  expect(clueDropdown).toHaveValue('5');
});

it('includes a way to change number of columns', () => {
  const { getByLabelText } = render(<Board />);
  expect(getByLabelText(/Categories to show/)).not.toBeNull();
});

it('includes a way to change number of clues in column', () => {
  const { getByLabelText } = render(<Board />);
  expect(getByLabelText(/Clues per column/)).not.toBeNull();
});

it('disables clicked cues and shows visual cue', async () => {
  // This test will show a log of the double jeopardy
  const history = createMemoryHistory();
  const { getByTestId, getAllByTestId } = render(
    <SelectionContext.Provider value={{
      set: selectionArray => undefined,
      list: []
    }}>
      <Router history={history}><Board /></Router>
    </SelectionContext.Provider>
  );
  const grid = getByTestId('grid');
  const gridButtons = await waitForElement(() => getAllByTestId('grid-btn'), { container: grid })
  console.log(gridButtons[0].textContent);
  fireEvent.click(gridButtons[0]);
  waitForDomChange({ container: grid }).then(() => {
    expect(gridButtons[0]).toBeDisabled();
  });
});
