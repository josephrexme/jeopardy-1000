import React, { useEffect, useState, useContext, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import _zip from 'lodash/zip';
import _flatten from 'lodash/flatten';
import _take from 'lodash/take';
import { SelectionContext } from '../router';
import Text from '../atoms/Typography';
import Button from '../atoms/Button';

export const BoardRoot = styled.div`
  display: grid;
  height: 100vh;
  main{
    width: 90%;
    max-width: 80rem;
    margin: auto;
  }
  section{
    @media(min-width: 300px) {
      display: flex;
      justify-content: space-between;
    }
  }
`;

const Modal = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: var(--color-bg);
  text-align: center;
  transform: scale(0);
  transform-origin: center;
  will-change: transform;
  transition: transform 2s var(--animation-easing);
  ${({ show }) => show && css`
    transform: scale(1);
  `}
`;

const Grid = styled.div`
  display: grid;
  ${({ cols }) => cols && css`
    grid-template-columns: repeat(${cols}, 1fr);
  `}
  ${({ rows }) => rows && css`
    grid-template-rows: repeat(${Number(rows) + 1}, minmax(80px, 1fr));
  `}
  grid-gap: .1rem;
  margin: 2rem 0;
  border: solid thin var(--color-fg);
  background: var(--color-fg);
  > div, button{
    appearance: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .5rem;
    border: 0;
    background: var(--color-bg);
    color: var(--color-fg);
    text-align: center;
  }
  button{
    cursor: pointer;
    &:disabled{
      background: var(--color-selection);
    }
  }
`;

const Item = ({ clue, setDouble, children }) => {
  const selection = useContext(SelectionContext);
  const history = useHistory();

  const captureClick = () => {
    selection.set(selection.list.concat(clue.id));
    const nextPath = `/clue?category=${clue.category.id}&value=${clue.value}`;
    if(!!clue.double) {
      setDouble(true);
      setTimeout(() => {
        setDouble(false);
        history.push(nextPath);
      }, 2000);
    } else {
      history.push(nextPath);
    }
  };

  return (
    <button disabled={selection.list.includes(clue.id)} onClick={captureClick}>{children}</button>
    );
};

const random = (min, max) => Math.round(Math.random() * (max - min) + min);

const getCategories = (count, offset) => {
  const append = offset ? `&offset=${offset}` : ''
  return fetch(`http://jservice.io/api/categories?count=${count}${append}`)
  .then(data => data.json());
};

const getClues = (count, category) => {
  return fetch(`http://jservice.io/api/clues?count=${count}&category=${category}`)
  .then(data => data.json());
};

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

const Board = () => {
  const selection = useContext(SelectionContext);
  const [showDouble, setShowDouble] = useState(false);
  const [state, dispatch] = useReducer(loadReducer, {
    status: 'loading',
    error: null,
    fetches: 1,
    categories: [],
    clues: [],
    categoryCount: 6,
    clueCount: 5,
  });

  useEffect(() => {
    if(state.status === 'loading') {
      getCategories(state.categoryCount, (state.fetches - 1) * 10)
      .then(categoryResponse => {
        const clueResponses = categoryResponse.map(async (category) => {
          return await getClues(state.clueCount, category.id);
        });
        Promise.all(clueResponses).then((values) => {
          const flattened = _flatten(_zip(...values.map(value => _take(value, state.clueCount))));
          const doubleJeopardyClue = flattened[random(0, state.clueCount * state.categoryCount)];
          if(doubleJeopardyClue) {
            console.log('Log of double jeopardy:', doubleJeopardyClue);
            doubleJeopardyClue.double = true;
          }
          dispatch({ type: 'RESOLVE', payload: {
            categories: categoryResponse,
            clues: flattened
          }});
        });
      }).catch(error => dispatch({ type: 'REJECT', payload: error }));
    }
  }, [state]);

  const reset = () => {
    selection.set([]);
    dispatch({ type: 'FETCH', payload: { fetches: state.fetches === 9 ? 1 : state.fetches + 1 }});
  };

  return (
    <BoardRoot>
      <Modal show={showDouble}>
        <Text as="h2" size="10rem">Double<br />Jeopardy!!!</Text>
      </Modal>
      <main>
        <Text as="h1" align="center">Jeopardy - Let's Play</Text>
        { state.status === 'failed' && <Text align="center">An Error Occured</Text> }
        <Grid cols={state.categoryCount} rows={state.clueCount}>
          {
            state.categories.map(category => (
              <div key={category.id}>
                <Text as="strong" transform="capitalize">{category.title}</Text>
              </div>
            ))
          }
          {
            state.clues.map(clue => (
              <Item key={clue.id} clue={clue} setDouble={setShowDouble}>
                <Text as="span">${clue.value}</Text>
              </Item>
            ))
          }
        </Grid>
        <section>
          <form>
            <Text as="p">
              Categories to show:{` `}
              <select onChange={e => dispatch({ type: 'FETCH', payload: { categoryCount: e.target.value }})} defaultValue="6">
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </Text>
            <Text as="p">
              Clues per column:{` `}
              <select onChange={e => dispatch({ type: 'FETCH', payload: { clueCount: e.target.value }})} defaultValue="5">
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </Text>
          </form>
          <div>
            {state.status === 'loading' && 'Loading...  '}
            <Button onClick={reset}>Reset</Button>
          </div>
        </section>
      </main>
    </BoardRoot>
  );
  }

export default Board;