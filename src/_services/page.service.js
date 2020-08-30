import config from "config";
import { fetchWrapper, history } from "@/_helpers";
const baseUrl = `${config.apiUrl}/pages`;

export const pageService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
};

const getAll = async () => {
  let pages = await fetch(baseUrl);
  pages = await pages.json();
  return pages;
};

const getById = async (id) => {
  let page = await fetch(baseUrl + id);
  page = await page.json();
  return page;
};

const create = async (page) => {
  /*     let page = await fetch(baseUrl +  id);
    page = await page.json(); 
    return page; */
};

const update = async (page) => {
  /*     let page = await fetch(baseUrl +  id);
        page = await page.json(); 
        return page; */
};

const _delete = async (page) => {
  /*     let page = await fetch(baseUrl +  id);
        page = await page.json(); 
        return page; */
};

export default pageService;
