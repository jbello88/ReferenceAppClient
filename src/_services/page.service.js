import { fetchWrapper } from "../_helpers";

const baseUrl = `${process.env.REACT_APP_API_URL}/pages`;

const getAll = async () => {
  let pages = await fetch(baseUrl);
  pages = await pages.json();
  return pages;
};

const getById = async (id) => {
  let page = await fetch(baseUrl + "/" + id);
  page = await page.json();
  return page;
};
const create = async (page) => {
  const newPage = fetchWrapper.post(`${baseUrl}`, page);
  return newPage;
};

const update = async (id, page) => {
  let updatedPage = await fetchWrapper.put(`${baseUrl}/${id}`, page);
  return updatedPage;
};

const _delete = async (pageId) => {
  let res = await fetchWrapper.delete(`${baseUrl}/${pageId}`);
  return res;
};

export const pageService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};
