import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    pageNotes: "default notes",
  }),

  getters: {},

  actions: {},
});
