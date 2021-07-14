import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PublicRoutes = ({ isAuthenticated, component: Component, ...rest }) => {
  console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      component={(props) => {
        return !isAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};
PublicRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

export default PublicRoutes;
