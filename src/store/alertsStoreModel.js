import { action, thunk } from "easy-peasy";
import { AlertType } from "../_helpers";

const alertsStoreModel = {
  alerts: [],

  // Actions

  setAlertInternal: action((state, alert) => {
    state.alerts.push(alert);
  }),

  removeAlert: action((state, alert) => {
    state.alerts = state.alerts.filter((x) => x.id !== alert.id);
  }),

  clear: action((state) => {
    state.alerts = [];
  }),

  // Thunks

  alert: thunk(async (actions, alert) => {
    alert.id = Math.floor(Math.random() * 10000);
    alert.autoClose = alert.autoClose === undefined ? true : alert.autoClose;
    actions.setAlertInternal(alert);
    if (alert.autoClose) {
      setTimeout(() => actions.removeAlert(alert), 3500);
    }
  }),

  success: thunk(async (actions, alert) => {
    alert.type = AlertType.Success;
    await actions.alert(alert);
  }),

  error: thunk(async (actions, alert) => {
    alert.type = AlertType.Error;
    await actions.alert(alert);
  }),

  info: thunk(async (actions, alert) => {
    alert.type = AlertType.Info;
    await actions.alert(alert);
  }),

  warn: thunk(async (actions, alert) => {
    alert.type = AlertType.Warning;
    await actions.alert(alert);
  }),
};

export default alertsStoreModel;
