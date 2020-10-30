import React from 'react';
import PropTypes from 'prop-types';

export function UserMatchOrAdmin({ user, id, children }) {
  if (!user) return null;
  if (user?.role === 'Admin' || user?.id === id)
    return (
      <>
        {React.Children.map(children, child => {
          return child;
        })}
      </>
    );
  return null;
}

UserMatchOrAdmin.propTypes = {
  /**
   * The logged in user
   */
  user: PropTypes.object,
  /**
   * The owner-id of the current object to be edited....
   */
  id: PropTypes.string,
  /**
   * The elements (commands) that should only be rendered when user.id match
   * owner-id or the user has the role of Admin
   */
  children: PropTypes.array,
};

UserMatchOrAdmin.defaultProps = {
  user: undefined,
  id: undefined,
  children: [],
};
