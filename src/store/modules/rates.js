import { jsonApi } from '../../api'
import { RESOURCES } from '../../static/constants/api'

jsonApi.addRelationship(RESOURCES.RATE)

const state = {
  rates: {},
  rateFilter: {}
}
const getters = {
  rates: state => state.rates,
  rateFilter: state => state.rateFilter
}
const actions = {
  getRates: async ({ commit, rootState }, page) => {
    const rates = await jsonApi.findAllResources({
      resourceName: RESOURCES.RATE,
      filter: state.rateFilter,
      page
    })
    commit('setRates', rates)
  },
  setRateFilter: ({ commit, rootState }, filter) => {
    if (filter) {
      commit('saveRateFilter', filter)
    }
  }
}
const mutations = {
  setRates: (state, rates) => {
    state.rates = rates
  },
  saveRateFilter: (state, filter) => {
    state.rateFilter = filter
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
