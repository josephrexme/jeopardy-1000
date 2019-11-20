import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle from './utils/GlobalStyle';
import ErrorBoundary from './utils/ErrorBoundary';
import { NotFound } from './utils/Errors';
import Board from './pages/Board';
import Clue from './pages/Clue';

export const SelectionContext = createContext();

const AppRouter = () => {
  const [selection, setSelection] = useState([]);

  return (
    <ErrorBoundary>
      <SelectionContext.Provider value={{
        set: selectionArray => setSelection(selectionArray),
        list: selection
      }}>
        <Router>
          <>
            <GlobalStyle />
            <Switch>
              <Route exact path="/">
                <Board />
              </Route>
              <Route path="/clue">
                <Clue />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </>
        </Router>
      </SelectionContext.Provider>
    </ErrorBoundary>
  );
}

export default AppRouter;