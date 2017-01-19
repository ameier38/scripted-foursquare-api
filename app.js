/* global $ */
/* global Vue */

var CLIENT_ID = 'NAXPCGUCT1C11XHKSBSMS3NC5OPYB1E0D2KJ3ACQE44SNH1Y'
var CLIENT_SECRET = '3K2WYLQVRP0EF2YSOVDQPPVTURL53S55YBCWJFH05OMAC3T4'
var LIMIT = 10
var VERSION = '20161016'

var store = {
    debug: true,
    state: {
        restaurants: []
    },
    getRestaurants(address, foodType) {
        this.debug && console.log(`location: ${address}, foodType: ${foodType}`)
        var host = 'https://api.foursquare.com'
        var endpoint = '/v2/venues/search?'
        var version_param = `v=${VERSION}`
        var near_param = `near=${address}`
        var query_param = `query=${foodType}`
        var limit_param = `limit=${LIMIT}`
        var client_id_param = `client_id=${CLIENT_ID}`
        var client_secret_param = `client_secret=${CLIENT_SECRET}`
        var params = [
            version_param, near_param, query_param, limit_param,
            client_id_param, client_secret_param
        ].join('&')
        var url = host + endpoint + params
        this.debug && console.log(`url: ${url}`)
        Vue.http.get(url).then((response) => {
            this.state.restaurants = response.body.response.venues
        }, (response) => {
            console.log('Error!')
        });
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
        find: function() {
            store.getRestaurants(this.address, this.foodType)
        }
    }
})
