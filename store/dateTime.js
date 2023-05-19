import { defineStore } from "pinia";

export const useDateTimeStore = defineStore("DateTime", {
  state: () => ({
    dateTime: "",
  }),
  actions: {
    mutateDate(value) {
      this.dateTime = value;
    },
  },
  persist: {
    storage: persistedState.sessionStorage,
  },
});
