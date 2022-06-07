<template>
  <div class="home products">

    <div class="loader-overlay" v-if="store.state.isLoading">
        <span class="loader">
          <fa icon="circle-notch" spin size="3x" :style="{ color: '#BAB8B5' }" /> 
        </span>
    </div>
    <div v-for="(product, index) in products" :key="index" 
    class="product"
    :class="{ inBag : isInBag(product) }"
    >
        <ProductsList :product="product" /> 
    </div>
   
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import ProductsList from '../components/Products.vue' 

export default {
  name: 'Home',
  components: {
    ProductsList
  },
  setup() {
      // acessando estado global vuex
      const store = useStore()

      const products = computed(() => {
        return store.state.products
      })  

      const productInBag = computed(() => {
        return store.state.productInBag
      })      

      function isInBag(product)
      {
       return store.state.productInBag.find(item => item.id === product.id)
      }


    return {
      store,
      products,
      productInBag,
      isInBag
    }
  }

}
</script>

<style lang="scss" scope>
  .products {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content:center;
  } 

   .product {
        flex: 0 0 25%;
        box-sizing: border-box;  
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        padding: 16px;
        margin: 8px;
        height: 360px;

        @media only screen and (max-width: 769px) {
          flex: 0 0 40%;
        }

        @media only screen and (max-width: 640px) {
          flex: 0 0 90%;
        }

        &.inBag {
          border: 1px solid #007bff;
        }
        
        .product-image {
          margin: 20px auto;
          width: 160px;
          height: 140px;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
        }
        h4 {
          margin: 22px auto;
          font-size: 12px;
          max-width: 60%;
          font-weight: normal;
        }

        p.price {
          font-size: 20px;
          font-weight: bold;
        }

        button {
          color: #fff;
          background-color: #007bff;
          border: 1px solid #007bff;
          border-radius: 100px;
          font-weight: 400;
          text-align: center;
          padding: 8px 16px;
          cursor: pointer;

          &:hover {
            opacity: 0.8;
          }

          &.remove {
            background-color: transparent;
            border: none;
            color: black;
            text-decoration: underline;
          }
        }
      }

    .loader {
            color: #fff;
            font-size: 12px;
            font-weight: bold;
            position: absolute;
            left: calc(50% - 40px);
            top: calc(50% - 40px);
        }
        @keyframes loader-animate {
            0% {
                transform: rotate(0deg)
            }
            100% {
                transform: rotate(220deg)
            }
        }
        @keyframes loader-animate-after {
            0% {
                box-shadow: inset #fff 0 0 0 17px;
                transform: rotate(-140deg);
            }
            50% {
                box-shadow: inset #fff 0 0 0 2px;
            }
            100% {
                box-shadow: inset #fff 0 0 0 17px;
                transform: rotate(140deg);
            }
        }
    
</style>
