import config from "config";
import { fetchWrapper } from "@/_helpers";
const baseUrl = `${config.apiUrl}/pages`;
const baseUrlComment = `${config.apiUrl}/comments`;

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

const updateComment = async (pageId, comment) => {
  let updatedComment = await fetchWrapper.put(
    `${baseUrlComment}/${pageId}`,
    comment
  );
  return updatedComment;
};

const addComment = async (pageId, comment) => {
  let updatedComment = await fetchWrapper.post(
    `${baseUrlComment}/${pageId}`,
    comment
  );
  return updatedComment;
};

const _delete = async (pageId) => {
  let res = await fetchWrapper.delete(`${baseUrl}/${pageId}`);

  return res;
};

const deleteComment = async (pageId, comment) => {
  let res = await fetchWrapper.delete(
    `${baseUrlComment}/${pageId}/${comment._id}`
  );

  return res;
};

export const pageService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  updateComment,
  addComment,
  deleteComment,
};
