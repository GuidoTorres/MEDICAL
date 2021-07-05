import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const PrivateRoutes = ({
  isAuthenticated,
  roles,
  component: Component,
  ...rest
}) => {
  let history = useHistory();

  return (
    <Route
      {...rest}
      render={(...props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return isAuthenticated === false ? history.goBack() : '';
        }
      }}
    />
  );
};
PrivateRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

export default PrivateRoutes;
