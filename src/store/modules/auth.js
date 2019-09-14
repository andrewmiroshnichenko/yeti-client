import Authentication from '../../api/Authentication'

const state = {
  token: sessionStorage.getItem('yeti-token') || '',
  status: ''
}
const getters = {
  isAuthenticated: () => !!state.token,
  authStatus: () => state.status
}
const actions = {
  authRequest: async ({ commit }, { username, password }) => {
    const response = await Authentication.getToken(username, password)
    commit('authSuccess', response)
    sessionStorage.setItem('yeti-token', response.jwt)
  },
  logout: ({ commit }) => {
    return new Promise(resolve => {
      commit('logout')
      sessionStorage.removeItem('yeti-token')
      resolve()
    })
  }
}
const mutations = {
  authSuccess: (state, res) => {
    state.status = 'success'
    state.token = res.jwt
  },
  logout: state => {
    state.token = ''
    state.status = 'unauthorized'
  },
  setError: (state, res) => {
    state.error = res
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
