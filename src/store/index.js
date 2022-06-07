import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  // propriedades de dados 
  state: {
    products: [],
    isLoading: false,
    productInBag: []
  },
  mutations: {
    loadProducts (state, products) {
      state.products = products;
    },

    loadProductsInBag (state, products) {
      state.productInBag = products;
    },

    addToBag (state, product) {
      state.productInBag.push(product)
      localStorage.setItem('productsInBag', JSON.stringify(state.productInBag))
    },

    removeFromBag (state, productId) {
      // cria um novo array com os valores da condição atendida
      let updatedBag = state.productInBag.filter(item => productId != item.id)
      state.productInBag = updatedBag
      localStorage.setItem('productsInBag', JSON.stringify(state.productInBag))
    }

  },
  actions: {
    // commit nesse contexto recebe ja os dados dentro da ação, envia para mutations
    loadProducts({ commit }){
      this.state.isLoading = true;
      axios
      .get( 'https://fakestoreapi.com/products')
      .then(response => {
        this.state.isLoading = false;
        commit('loadProducts', response.data)
      })
    },

    loadProductsInBag({ commit }){
      if(localStorage.getItem('productsInBag'))
      {
        commit('loadProductsInBag', JSON.parse(localStorage.getItem('productsInBag')));
      }
        
    },
    // nesse caso o commit já recebe os dados quando a ação é invocada no component, envia para mutations
    addToBag({ commit }, product){
        commit('addToBag', product)
    },

    removeFromBag({ commit}, productId){
      if(confirm('Deseja remover item do carrinho?')) {
        commit('removeFromBag', productId)
      }
    }

  },
  modules: {
  }
})
