import React from 'react';
import PropTypes from 'prop-types';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { AlertType } from '../_helpers';

const propTypes = {
  id: PropTypes.string,
  fade: PropTypes.bool,
};

const defaultProps = {
  id: 'default-alert',
  fade: true,
};

function Alert({ id, fade }) {
  const alerts = useStoreState(s => s.iStore.alerts);
  const removeAlert = useStoreActions(a => a.iStore.removeAlert);

  function cssClasses(alert) {
    if (!alert) return;

    const classes = ['notification', 'alert-dismissable'];

    const alertTypeClass = {
      [AlertType.Success]: 'notification is-light is-success',
      [AlertType.Error]: 'notification is-light is-danger',
      [AlertType.Info]: 'notification is-light is-info',
      [AlertType.Warning]: 'notification is-light is-warning',
    };

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }

  if (!alerts.length) return null;

  return (
    <div className="container">
      <div className="m-3">
        {alerts.map((alert, index) => (
          <div key={index} className={cssClasses(alert)}>
            <button className="delete" onClick={() => removeAlert(alert)}>
              &times;
            </button>
            <span dangerouslySetInnerHTML={{ __html: alert.message }}></span>
          </div>
        ))}
      </div>
    </div>
  );
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;
export { Alert };
