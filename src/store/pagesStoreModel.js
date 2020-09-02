import { action, thunk } from "easy-peasy";
import { pageService } from "@/_services";
import { commentService } from "@/_services";

const pagesStoreModel = {
  pages: [],
  cachedPages: new Map(),
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

  createPage: action((state, user) => {
    const newPage = {
      title: "New Page Title",
      slug: "newPage",
      subtitle: "",
      content: "",
      comments: [],
    };
    state.page = newPage;
  }),

  editComment: action((state, comment) => {
    state.comment = comment;
  }),

  setPage: action((state, page) => {
    if (!state.cachedPages.has(page.slug)) {
      state.cachedPages.set(page.slug, page);
    }

    state.page = page;
    state.pages = state.pages.map((p) => (p._id === page._id ? page : p));
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
    //console.log(state.page.comments.length);
    state.page.comments.push(comment);
    //state.cachedPages.set(page.slug, page);
    //console.log(state.page.comments.length);
  }),

  // Thunks

  loadPages: thunk(async (actions, payload) => {
    const pages = await pageService.getAll();
    console.log(pages);
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
    console.log(smallPage);

    if (!smallPage) return;
    const page = await pageService.getById(smallPage._id);
    actions.setPage(page);
  }),

  updatePageContent: thunk(async (actions, payload, helpers) => {
    const { slug, title, subtitle, content } = payload;
    const localState = helpers.getState();
    const toUpdate = {
      slug,
      title,
      subtitle,
      content,
    };
    const page = localState.cachedPages.get(slug);
    if (page) {
      // this is an update
      const updatedPage = await pageService.update(page._id, toUpdate);
      actions.setPage(updatedPage);
    } else {
      const newPage = await pageService.update(page._id, toUpdate);
      actions.setPage(updatedPage);
    }
  }),

  saveComment: thunk(async (actions, comment, helpers) => {
    const localState = helpers.getState();
    console.log(comment);

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
      console.log(updatedComment);
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
