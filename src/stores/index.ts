import { createStore } from 'vuex'
import PackageService from '../services/package-service.js'

export default createStore({
  state: {
    packages: [],
    selectedPackage: {},
  },
  mutations: {
    SET_PACKAGES(state, packages) {
      state.packages = packages
    },
    SET_SELECTED_PACKAGE(state, selectedPackage) {
      state.selectedPackage = selectedPackage
    },
  },
  getters: {
    successfulPackages (state) {
      return state.packages.filter((x: any) => x.status === 'successful')
    }
  },
  actions: {
    async fetchPackages({ commit }) {
      return PackageService.getPackages()
        .then(response => {
          commit('SET_PACKAGES', response.data)
        })
        .catch(error => {
          throw error
        })
    },
    async fetchPackage({ commit, state }, id: string) {
      const existingPackage = state.packages
          .find((selectedPackage: any) => selectedPackage.id === Number(id))

      if (existingPackage) {
        commit('SET_SELECTED_PACKAGE', existingPackage)
      } else {
        return PackageService.getPackage(id)
          .then(response => {
            commit('SET_SELECTED_PACKAGE', response.data)
          })
          .catch(error => {
            throw error
          })
      }
    }
  },
  modules: {}
})
