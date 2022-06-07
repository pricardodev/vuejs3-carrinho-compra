<template>
    <div 
        class="product-image" 
        :style="{backgroundImage: 'url('+ state.product.image +')'}">
    </div>
    <h4>{{ state.product.title }}</h4>
    <p class="price">US$ {{ toConfigureLocale(state.product.price) }}</p>
    <button v-if="!isInBag(product)" @click="addProductBag(product)">Adicionar ao carrinho</button>
    <button v-else 
    class="remove"
     @click="store.dispatch('removeFromBag', product.id)">Remover do carrinho</button>
</template>
<script>
import { useStore } from 'vuex'
import { reactive } from 'vue'
export default {
  name: 'Products',
  props: {
      product: Object, default: []
  }, 
  setup(props)
  {
    const store = useStore();
    const state = reactive({
        product: props.product
    })

    function addProductBag(product)
    {
      product.quantity = 1
      // Ação no vuex precisa método dispatch
      return store.dispatch('addToBag', product);
      
    }

    function isInBag(product)
    {
      return store.state.productInBag.find(item => item.id === product.id)
    }

    function toConfigureLocale(valor, locale='pt-BR')
    {
        return valor.toLocaleString(locale, { minimumFractionDigits: 2 } );
    }

    return { 
      state,
      store,
      addProductBag,
      isInBag,
      toConfigureLocale
    }
    
  }
 
}
</script>
<style lang="scss">
     

</style>
