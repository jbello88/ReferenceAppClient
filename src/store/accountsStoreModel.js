import { action } from "easy-peasy";

const accountsStoreModels = {
  account: null,

  addAccount: action((state, account) => {
    state.account = account;
  }),

  removeAccount: action((state, account) => {
    state.account = null;
  }),
};

export default accountsStoreModel;
