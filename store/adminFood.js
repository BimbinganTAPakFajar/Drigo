import { defineStore } from "pinia";

export const useFoodStore = defineStore("food", {
  state: () => ({
    foodList: [],
  }),
  actions: {
    pushFoodObj(value) {
      this.foodList.push(value);
    },

    deleteFoodObj(idx) {
      this.foodList.splice(idx, 1);
    },
  },
  persist: {
    storage: persistedState.sessionStorage,
  },
});
