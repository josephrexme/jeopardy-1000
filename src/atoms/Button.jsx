import styled from 'styled-components';

const Button = styled.button`
  --button-color: rgba(0, 0, 0, .2);
  @media(prefers-color-scheme: dark) {
    --button-color: rgba(255, 255, 255, .2);
  }
  display: inline-block;
  min-width: 10rem;
  padding: 1rem;
  border: 0;
  border-radius: .4rem;
  background: var(--button-color);
  color: var(--color-fg);
  text-align: center;
  cursor: pointer;
  + a, + button{
    margin-left: 1rem;
  }
`;

export default Button;