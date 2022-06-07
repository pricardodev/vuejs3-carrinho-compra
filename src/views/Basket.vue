<template>
  <div class="basket">
    <div class="items">
      <template v-if="productsInBag.length">
        <div class="item" v-for="(productInBag, index) in productsInBag" :key="index">
          <div class="remove" @click="store.dispatch('removeFromBag', productInBag.id)">Remover Produto</div>
          <div class="photo"><img :src="productInBag.image" :alt="productInBag.title" :title="productInBag.title"></div>
          <div class="description">{{ productInBag.description }}</div>
          <div class="price">
            <span class="quantity-area">
              <button :disabled="productInBag.quantity <= 1" @click="productInBag.quantity--">-</button>
              <span class="quantity">{{ productInBag.quantity }}</span>
              <button @click="productInBag.quantity++">+</button>
            </span>
            <span class="amount">R$ {{ toConfigureLocale((productInBag.price * productInBag.quantity)) }}</span>
          </div>
        </div>
        <div class="grand-total"> Total do pedido: R$ {{ toConfigureLocale(orderTotal()) }}</div>
       </template>

       <template v-else>
         <h4>
           Nenhum item no seu carrinho!
         </h4>
       </template>

    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'Basket',
  setup(){
    const store = useStore()

    const productsInBag = computed(()=> {
      return store.state.productInBag
    })   

    function orderTotal()
    {
      var total = 0;
      const products = store.state.productInBag
      products.forEach(item => {
        total += item.price * item.quantity
      })
      return total

    }

    function toConfigureLocale(valor, locale='pt-BR')
    {
        return valor.toLocaleString(locale, { minimumFractionDigits: 2 } );
    }

    return { 
      store,
      productsInBag,
      orderTotal,
      toConfigureLocale

    }
  } 
}
</script>

<style lang="scss">

.basket {
  padding: 60px 0;  
  .items {
    max-width: 800px;
    margin: auto;
    .item {
      display: flex;
      justify-content: space-between;
      padding: 40px 0;
      border-bottom: 1px solid lightgrey;
      position: relative;

      .remove {
        position: absolute;
        top: 8px;
        right: 0;
        font-size: 11px;
        text-decoration: underline;
        cursor: pointer;
      }

      .quantity-area {
        margin: 8px auto;
        height: 14px;

        button {
          width: 16px;
          height: 16px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }

        .quantity {

            margin: 0 4px;
        }
      }

      .photo {
        img {
          max-width: 80px;
        }
      }

      .description {
        padding-left: 30px;
        box-sizing: border-box;
        max-width: 50%;

      }

      .price {
        .amount {
          font-size: 16px;
          margin-left: 8px;
          vertical-align: middle;

        }
      }
    }
      .grand-total {
          font-size: 24px;
          font-weight: bold;
          text-align: right;
          margin-top: 8px;
      }

  }

}

</style>
