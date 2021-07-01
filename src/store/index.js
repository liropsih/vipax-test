import Vue from 'vue'
import Vuex from 'vuex'
import $axios from '@/http'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    repos: null,
    subscriptions: null,
    team: null,
    users: null
  },
  mutations: {
    setUserInfo(state, data) {
      state.user = data
    },
    setUserRepos(state, data) {
      state.repos = data
    },
    setUserSubscriptions(state, data) {
      state.subscriptions = data
    },
    setTeam(state, data) {
      state.team = data
    },
    setUsers(state, data) {
      state.users = data
    }
  },
  actions: {
    async getUserInfo({ commit }) {
      try {
        const { data } = await $axios('https://api.github.com/users/liropsih')
        const options = {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }
        data.created_at = new Intl.DateTimeFormat('ru-RU', options).format(new Date(data.created_at))
        commit('setUserInfo', data)
      } catch (e) {
        throw e
      }
    },
    async getUserRepos({ commit }, repos_url) {
      try {
        const { data } = await $axios(repos_url)
        const options = {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }
        data.forEach(async repo => {
          const { data } = await $axios(repo.languages_url)
          repo.languages = data
          repo.created_at = new Intl.DateTimeFormat('ru-RU', options).format(new Date(repo.created_at))
        })
        commit('setUserRepos', data)
      } catch (e) {
        throw e
      }
    },
    async getUserSubscriptions({ commit }) {
      try {
        const { data } = await $axios('https://api.github.com/users/liropsih/following')
        commit('setUserSubscriptions', data)
      } catch (e) {
        throw e
      }
    },
    async getTeam({ commit }) {
      try {
        const { data } = await $axios('https://api.github.com/users?since=50000000')
        commit('setTeam', data)
      } catch (e) {
        throw e
      }
    },
    async updateTeam({ commit }, data) {
      try {
        commit('setTeam', data)
      } catch (e) {
        throw e
      }
    },
    async getUsers({ commit }) {
      try {
        const { data } = await $axios('https://api.github.com/users?since=30000000')
        commit('setUsers', data)
      } catch (e) {
        throw e
      }
    },
    async updateUsers({ commit }, data) {
      try {
        commit('setUsers', data)
      } catch (e) {
        throw e
      }
    }
  },
  getters: {
    user: s => s.user,
    repos: s => s.repos,
    subscriptions: s => s.subscriptions,
    team: s => s.team,
    users: s => s.users
  }
})
