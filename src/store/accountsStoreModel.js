import { action, thunk } from "easy-peasy";
import { accountService } from "../_services";

const accountsStoreModels = {
  accounts: [],
  account: null,
  editAccount: null,
  refreshTokenTimeout: null,
  refreshToken: null,

  // Actions

  addAccount: action((state, account) => {
    state.account = account;
    state.refreshToken = account?.jwtToken;
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
    state.refreshToken = account?.jwtToken;
    state.editAccount = account;
    window.account = account;
  }),

  setEditAccount: action((state, account) => {
    state.editAccount = account;
  }),

  replaceAccount: action((state, account) => {
    state.accounts = state.accounts.map((a) =>
      a.id === account.id || !a.id ? account : a
    );
    if (state.account.id === account.id || !state.account.id) {
      state.account = account;
      state.refreshToken = account?.jwtToken;
      state.editAccount = account;
    }
  }),

  removeAccount: action((state, id) => {
    const acc = state.accounts.filter((a) => a.id !== id);
    if (state.account.id === id) {
      state.account = acc;
      state.editAccount = acc;
    }
  }),

  setAccounts: action((state, accounts) => {
    state.accounts = accounts;
  }),

  clearAccount: action((state) => {
    localStorage.setItem("account", JSON.stringify({}));
    state.account = null;
    state.refreshToken = null;
    window.account = null;
  }),

  // Thunks

  login: thunk(async (actions, payload) => {
    const { email, password } = payload;
    console.log(email);
    const acc = await accountService.login(email, password);
    actions.setAccount(acc);
  }),

  logout: thunk(async (actions) => {
    await accountService.logout();
    actions.clearAccount();
  }),

  refreshTheToken: thunk(async (actions, refreshAction) => {
    const acc = await accountService.refreshToken();
    actions.setAccount(acc);
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
    console.log(newAccount);
    const acc = await accountService.create(newAccount);
    console.log(acc);
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
