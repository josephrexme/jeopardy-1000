import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Text from '../atoms/Typography';

const ErrorStyle = styled.div`
  margin: 1rem 0;
  text-align: center;
`;

const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if(staticContext) {
      staticContext.statusCode = code;
    }
    return children;
  }}
  />
);

export const NotFound = () => (
  <Status code="404">
    <ErrorStyle>
      <Text as="h3" uppercase>
        The content you are looking for does not exist
      </Text>
      <Link to="/">Back to Home</Link>
    </ErrorStyle>
  </Status>
);

export const NoAccess = () => (
  <Status code="401">
    <ErrorStyle>
      <Text as="h3" uppercase>
        Restricted Access
      </Text>
      <Text>You are not authorized to view this page</Text>
      <Link to="/">Back to Home</Link>
    </ErrorStyle>
  </Status>
);

Status.propTypes = {
  code: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};