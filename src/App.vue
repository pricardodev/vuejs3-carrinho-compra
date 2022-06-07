<template>
  <div id="nav">
    <router-link to="/">Início</router-link> -
    <router-link to="/basket">Carrinho ({{ productInBag.length }})</router-link> 
  </div>
  <router-view/>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted, computed } from 'vue'
  export default {
    setup(){
      const store = useStore()

      const loadProducts = onMounted(() => { 
        store.dispatch('loadProducts')
        store.dispatch('loadProductsInBag')
      })

      const productInBag = computed(() => {
        return store.state.productInBag
      })      


      return {
        loadProducts,
        productInBag
      }
    }
  }
  
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1280px;
  margin: 80px auto;
}

#nav {
  padding: 16px 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  background-color: rgb(37, 37, 37);
  color: white;


  a {
    color: white;
    text-decoration: none;

    &.router-link-exact-active {
      color: #007bff;
    }
  }
}
</style>
