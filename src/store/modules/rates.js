import Rates from '../../api/Rates'

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
    console.log('state.rateFilter', state.rateFilter)

    const rates = await Rates.getRates(
      rootState.auth.token,
      state.rateFilter,
      page
    )
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
