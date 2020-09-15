import { action, thunk } from "easy-peasy";
import { accountService } from "../_services";

const accountsStoreModels = {
  accounts: [],
  account: null,
  editAccount: null,
  refreshTokenTimeout: null,

  addAccount: action((state, account) => {
    state.account = account;
    localStorage.setItem("account", JSON.stringify(account));
    window.account = account;
  }),

  addNewAccount: action((state, account) => {
    state.accounts.push(account);
    state.editAccount = account;
  }),

  setAccount: action((state, account) => {
    console.log("Account", account);
    localStorage.setItem("account", JSON.stringify(account));
    state.account = account;
    state.editAccount = account;
  }),

  setEditAccount: action((state, account) => {
    state.editAccount = account;
  }),

  replaceAccount: action((state, account) => {
    state.accounts = state.accounts.map((a) =>
      a.email === account.email ? account : a
    );
    if (state.account.email === account.email) {
      state.actions.setAccount(account);
    }
  }),

  removeAccount: action((state, id) => {
    const acc = state.accounts.filter((a) => a.id !== id);
    if (state.account.id === id) {
      state.actions.setAccount(acc);
    }
  }),

  setAccounts: action((state, accounts) => {
    state.accounts = accounts;
  }),

  clearAccount: action((state) => {
    localStorage.setItem("account", JSON.stringify({}));
    state.account = null;
    window.account = null;
  }),

  // Actions
  addLoadedPages: action((state, pages) => {
    state.pages = pages;
  }),

  startRefreshTokenTimer: action((state, refreshToken) => {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(state.account.jwtToken.split(".")[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;

    state.refreshTokenTimeout = setTimeout(() => {
      refreshToken(refreshToken);
    }, timeout);
  }),

  stopRefreshTokenTimer: action((state, pages) => {
    clearTimeout(state.refreshTokenTimeout);
  }),

  // Thunks

  login: thunk(async (actions, payload) => {
    const { email, password, refreshAction } = payload;
    console.log(email);
    const acc = await accountService.login(email, password);
    actions.setAccount(acc);
    actions.startRefreshTokenTimer(refreshAction);
  }),

  logout: thunk(async (actions) => {
    await accountService.logout();
    actions.stopRefreshTokenTimer();
    actions.clearAccount();
  }),

  refreshToken: thunk(async (actions, refreshAction) => {
    const acc = await accountService.refreshToken();
    actions.setAccount(acc);
    actions.startRefreshTokenTimer(refreshAction);
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
    actions.setAccounts(accs);
  }),

  getAccountById: thunk(async (actions, id) => {
    const acc = await accountService.getById(id);
    actions.setEditAccount(acc);
  }),

  createAccount: thunk(async (actions, newAccount) => {
    const acc = await accountService.create(newAccount);
    actions.addNewAccount(acc);
  }),

  updateAccount: thunk(async (actions, payload) => {
    const { id, params } = payload;
    const acc = await accountService.update(id, params);
    actions.replaceAccount(acc);
  }),

  deleteAccount: thunk(async (actions, id) => {
    await accountService.delete(id);
    actions.removeAccount(id);
  }),
};

export default accountsStoreModels;
