/* global $ */
/* global Vue */

var store = {
    debug: true,
    state: {
        restaurants: []
    },
    getRestaurants(address, foodType) {
        this.debug && console.log(`location: ${address}, foodType: ${foodType}`)
    }
}

new Vue({
    el: "#app",
    data: {
        store: store.state,
        foodType: '',
        address: '',
    },
    computed: {
        message: function() {
            return `looking for ${this.foodType} in ${this.address}`
        }
    },
    methods: {
        find: function(){
            store.getRestaurants(this.address, this.foodType)
        }
    }
})
