import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useStoreState, useStoreActions } from "easy-peasy";
import { AlertType } from "@/_helpers";

const propTypes = {
  id: PropTypes.string,
  fade: PropTypes.bool,
};

const defaultProps = {
  id: "default-alert",
  fade: true,
};

function Alert({ id, fade }) {
  const alerts = useStoreState((s) => s.iStore.alerts);
  const logout = useStoreActions((a) => a.aStore.logout);

  function cssClasses(alert) {
    if (!alert) return;

    const classes = ["alert", "alert-dismissable"];

    const alertTypeClass = {
      [AlertType.Success]: "alert alert-success",
      [AlertType.Error]: "alert alert-danger",
      [AlertType.Info]: "alert alert-info",
      [AlertType.Warning]: "alert alert-warning",
    };

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push("fade");
    }

    return classes.join(" ");
  }

  if (!alerts.length) return null;

  return (
    <div className="container">
      <div className="m-3">
        {alerts.map((alert, index) => (
          <div key={index} className={cssClasses(alert)}>
            <a className="close" onClick={() => removeAlert(alert)}>
              &times;
            </a>
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
