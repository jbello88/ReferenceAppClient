import { fetchWrapper } from "../_helpers";

const baseUrlComment = `${process.env.API_URL}/comments`;

const update = async (pageId, comment) => {
  let updatedComment = await fetchWrapper.put(
    `${baseUrlComment}/${pageId}`,
    comment
  );
  return updatedComment;
};

const create = async (pageId, comment) => {
  let newComment = await fetchWrapper.post(
    `${baseUrlComment}/${pageId}`,
    comment
  );
  return newComment;
};

const _delete = async (pageId, comment) => {
  let res = await fetchWrapper.delete(
    `${baseUrlComment}/${pageId}/${comment._id}`
  );

  return res;
};

export const commentService = {
  create,
  update,
  delete: _delete,
};
