import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const textStyle = (element) => ({
  h1: () => css`
    font-size: 3.2rem;
    @media(min-width: 520px) {
      font-size: 4.8rem;
    }
  `,
  h2: () => css`
    font-size: 4rem;
  `,
  h3: () => css`
    font-size: 3.6rem;
  `,
  h4: () => css`
    font-size: 2.4rem;
  `,
  h5: () => css`
    font-size: 1.8rem;
  `,
  h6: () => css`
    font-size: 1.6rem;
  `,
  p: () => css`
    font-size: 1.4rem;
  `,
  span: () => css`
    margin: 0;
  `,
  strong: () => css`
    margin: 0;
    font-weight: bolder;
  `,
  em: () => css`
    margin: 0;
    font-style: italic;
  `,
}[element]());

const Text = styled.p`
  margin: 1rem 0;
  line-height: 1.2;
  ${({ as }) => as && textStyle(as) }
  ${({ transform }) => transform && css`
    text-transform: ${transform};
  `}
  ${({ align }) => align && css`
    text-align: ${align};
  `}
  ${({ size }) => size && css`
    font-size: ${size};
  `}
`;

Text.propTypes = {
  as: PropTypes.string,
  transform: PropTypes.string,
  align: PropTypes.string,
};

export default Text;