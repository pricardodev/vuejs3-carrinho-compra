## This folder has been created just in case someday the Fake Store API becomes unavailable

If it happens, just load the data from the JSON file instead of the API. See the instructions below.

### Change this action in the store/index.js file:

```
loadProducts ({ commit }) {
    axios
        .get('https://fakestoreapi.com/products'
        )
        .then(response => {
        commit('setProducts', response.data)
    })
},
```
### To this:

```
loadProducts ({ commit }) {
      
        commit('setProducts',productsData)
    
},
```

###  Don't forget to import the json file at the top of the store/index.js file::

```
import productsData from "@/assets/FallbackData/products.json";
```

