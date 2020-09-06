import { action, thunk } from "easy-peasy";
import { accountService, alertService } from "@/_services";

const accountsStoreModels = {
  accounts: [],
  account: null,
  editAccount: null,
  refreshTokenTimeout: null,

  addAccount: action((state, account) => {
    state.account = account;
    localStorage.setItem("account", JSON.stringify(account));
  }),

  addNewAccount: action((state, account) => {
    state.accounts.push(account);
    state.editAccount = account;
  }),

  setAccount: action((state, account) => {
    localStorage.setItem("account", JSON.stringify(account));
    state.account = account;
    state.editAccount = account;
  }),

  setEditAccount: action((state, account) => {
    state.editAccount = account;
  }),

  replaceAccount: action((state, account) => {
    state.accounts = state.accounts.map((a) =>
      a.email === a.email ? account : a
    );
    if (state.account.email === account.email) {
      actions.setAccount(account);
    }
  }),

  removeAccount: action((state, id) => {
    state.accounts = state.accounts.filter((a) => a.id !== id);
    if (state.account.id === id) {
      actions.setAccount(account);
    }
  }),

  setAccounts: action((state, accounts) => {
    state.accounts = accounts;
  }),

  clearAccount: action((state) => {
    localStorage.setItem("account", null);
    state.account = null;
  }),

  removeAccount: action((state, account) => {
    state.account = null;
  }),

  // Actions
  addLoadedPages: action((state, pages) => {
    state.pages = pages;
  }),

  startRefreshTokenTimer: action((state, pages) => {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(state.account.jwtToken.split(".")[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    console.log(this);
    state.refreshTokenTimeout = setTimeout(() => {
      console.log("timeout expired");
    }, timeout);
  }),

  stopRefreshTokenTimer: action((state, pages) => {
    clearTimeout(state.refreshTokenTimeout);
  }),

  // Thunks

  login: thunk(async (actions, payload) => {
    const { email, password } = payload;
    console.log(email);
    const acc = await accountService.login(email, password);
    actions.setAccount(acc);
    actions.startRefreshTokenTimer();
  }),

  logout: thunk(async (actions) => {
    await accountService.logout();
    actions.stopRefreshTokenTimer();
    actions.clearAccount();
  }),

  refreshToken: thunk(async (actions) => {
    const acc = await accountService.refreshToken();
    actions.setAccount(acc);
    actions.startRefreshTokenTimer();
  }),

  register: thunk(async (actions, payload) => {
    await accountService.register(payload);
  }),

  verifyEmail: thunk(async (actions, token) => {
    await accountService.verifyEmail(token);
  }),

  forgotPassword: thunk(async (actions, email) => {
    await accountService.forgotPassword(email);
  }),

  validateResetToken: thunk(async (actions, token) => {
    await accountService.validateResetToken(token);
  }),

  resetPassword: thunk(async (actions, payload) => {
    const { token, password, confirmPassword } = payload;
    await accountService.resetPassword(token, password, confirmPassword);
  }),

  getAllAccounts: thunk(async (actions) => {
    const accs = await accountService.getAll();
    acctions.setAccounts(accs);
  }),

  getAccountById: thunk(async (actions, id) => {
    const acc = await accountService.getById(id);
    acctions.setEditAccount(acc);
  }),

  createAccount: thunk(async (actions, newAccount) => {
    const acc = await accountService.create(newAccount);
    acctions.addNewAccount(acc);
  }),

  updateAccount: thunk(async (actions, payload, helpers) => {
    const { id, params } = payload;
    const localState = helpers.getState();
    const acc = await accountService.update(id, params);
    acctions.replaceAccount(acc);
  }),

  deleteAccount: thunk(async (actions, id) => {
    await accountService.delete(id);
    acctions.removeAccount(id);
  }),
};

export default accountsStoreModels;
