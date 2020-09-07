import { action, thunk } from "easy-peasy";
import { pageService } from "@/_services";

const pagesStoreModel = {
  pages: [],
  page: null,
  comment: null,

  addLoadedPages: action((state, pages) => {
    state.pages = pages;
  }),

  createComment: action((state, user) => {
    const newComment = {
      content: "",
      userName: user.userName,
      userId: user.id,
    };
    state.comment = newComment;
  }),

  createPage: action((state) => {
    const newPage = {
      title: "New Page Title",
      slug: "newPage",
      subtitle: "",
      content: "",
      comments: [],
    };
    state.page = newPage;
  }),

  removePage: action((state, page) => {
    state.pages = state.pages.filter((p) => p._id !== page._id);
    state.page = null;
  }),

  editComment: action((state, comment) => {
    state.comment = comment;
  }),

  clearComment: action((state) => {
    state.comment = null;
  }),

  setPage: action((state, page) => {
    state.page = page;
    state.pages = state.pages.map((p) => (p._id === page._id ? page : p));
  }),

  addPage: action((state, page) => {
    state.pages.push(page);
    state.page = page;
  }),

  replaceComment: action((state, comment) => {
    state.page.comments = state.page.comments.map((c) =>
      c._id == comment._id ? comment : c
    );
  }),

  removeComment: action((state, comment) => {
    state.page.comments = state.page.comments.filter(
      (c) => c._id !== comment._id
    );
  }),

  addComment: action((state, comment) => {
    state.page.comments.push(comment);
  }),

  // Thunks

  loadPages: thunk(async (actions, payload) => {
    const pages = await pageService.getAll();
    actions.addLoadedPages(pages);
  }),

  loadPage: thunk(async (actions, slug, helpers) => {
    const localState = helpers.getState();
    /*     if (localState.cachedPages.has(slug)) {
      console.log("using Cached version");
      actions.setPage(localState.cachedPages.get(slug));
      return;
    } */

    const smallPage = localState.pages.find((p) => p.slug === slug);

    if (!smallPage) return;
    const page = await pageService.getById(smallPage._id);
    actions.setPage(page);
  }),

  updatePageContent: thunk(async (actions, payload, helpers) => {
    const { _id, slug, title, subtitle, content } = payload;
    const localState = helpers.getState();
    const toUpdate = {
      slug,
      title,
      subtitle,
      content,
    };

    if (_id) {
      // this is an update
      const updatedPage = await pageService.update(_id, toUpdate);
      actions.setPage(updatedPage);
    } else {
      const newPage = await pageService.create(toUpdate);
      actions.addPage(newPage);
    }

    //alertService.success("Page was saved successfully");
  }),

  deletePage: thunk(async (actions, page, helpers) => {
    if (page._id) {
      await pageService.delete(page._id);
      actions.removePage(page);
    }
  }),

  saveComment: thunk(async (actions, comment, helpers) => {
    const localState = helpers.getState();

    if (comment._id) {
      // this is an update
      const updatedComment = await pageService.updateComment(
        localState.page._id,
        comment
      );
      actions.replaceComment(updatedComment);
    } else {
      const updatedComment = await pageService.addComment(
        localState.page._id,
        comment
      );

      actions.addComment(updatedComment);
    }
  }),

  deleteComment: thunk(async (actions, comment, helpers) => {
    const localState = helpers.getState();
    if (comment._id) {
      await pageService.deleteComment(localState.page._id, comment);
      actions.removeComment(comment);
    }
  }),
};

export default pagesStoreModel;
