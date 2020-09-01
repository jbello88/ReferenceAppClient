import { action, thunk } from "easy-peasy";
import { pageService } from "@/_services";

const pagesStoreModel = {
  pages: [],
  cachedPages: new Map(),
  page: null,

  addLoadedPages: action((state, pages) => {
    console.log("Add loaded Pages");
    state.pages = pages;
  }),

  setPage: action((state, page) => {
    if (!state.cachedPages.has(page.slug)) {
      state.cachedPages.set(page.slug, page);
    }
    state.page = page;
  }),

  loadPages: thunk(async (actions, payload) => {
    const pages = await pageService.getAll();
    console.log(pages);
    actions.addLoadedPages(pages);
  }),

  loadPage: thunk(async (actions, slug, helpers) => {
    const localState = helpers.getState();
    if (localState.cachedPages.has(slug)) {
      console.log("using Cached version");
      actions.setPage(localState.cachedPages.get(slug));
      return;
    }

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
      title,
      subtitle,
      content,
    };
    const page = localState.cachedPages.get(slug);
    const updatedPage = await pageService.update(page._id, toUpdate);
    actions.setPage(updatedPage);
  }),
};

export default pagesStoreModel;
