import React, { useEffect, useReducer, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { BoardRoot } from './Board';
import Text from '../atoms/Typography';
import Button from '../atoms/Button';

const loadReducer = (state, action) => {
  const { type, payload } = action
  switch(type) {
    case 'FETCH':
      return { ...state, status: 'loading', ...payload }
    case 'RESOLVE':
      return { ...state, status: 'success', ...payload }
    case 'FAIL':
      return { ...state, status: 'failed', error: payload }
    default:
      return state;
  }
};

const getClue = (categoryId, value) => {
  return fetch(`http://jservice.io/api/clues?category=${categoryId}&value=${value}`)
  .then(data => data.json());
};

const options = ['question', 'answer'];

const Clue = ({ location }) => {
  const [display, setDisplay] = useState('question');
  const [state, dispatch] = useReducer(loadReducer, {
    clue: {},
    status: 'loading',
    error: null
  });
  const getOpposite = (display) => options.find(option => option !== display)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    getClue(searchParams.get('category'), searchParams.get('value'))
    .then(response => {
      dispatch({ type: 'RESOLVE', payload: { clue: response[0] } });
    }).catch(error => dispatch({ type: 'FAIL', payload: error }));
  }, [location.search]);

  const toggleDisplay = () => {
    setDisplay((display) => getOpposite(display));
  };

  return (
    <BoardRoot>
      <main>
        { state.status === 'failed' && <Text align="center">An Error Occured</Text> }
        <Text as="h1" data-testid="title">{state.clue[display]}</Text>
        <Text>
          <Button onClick={toggleDisplay} data-testid="toggle-btn">Show <Text as="span" transform="capitalize">{getOpposite(display)}</Text></Button>
          <Button as={Link} to="/">Done</Button>
        </Text>
      </main>
    </BoardRoot>
  );
}

export default withRouter(Clue);