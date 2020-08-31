import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
 
export const store = new Vuex.Store({
    state: {
        StoreCart:[]
    },
    getters: {
        StoreCart: (state) => state.StoreCart
      },
    mutations: {
        ADD_Item(state, id) {
            state.StoreCart.push(id);
          },
      
          REMOVE_Item(state, index) {
            state.StoreCart.splice(index, 1);
        },
    }
  })