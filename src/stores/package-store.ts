import { defineStore} from 'pinia'
import { computed, ref } from 'vue'
import PackageService from '../services/package-service'

export interface IPackage {
    id: number
    title: string
    owner: string
    status: string
    description: string
    created: string
}

interface State {
    packages: Array<IPackage>
    selectedPackage: IPackage | null
}

export const usePackageStore = defineStore('PackageStore', {
    state: (): State => {
        return {
            packages: [],
            selectedPackage: null,
        }
    },
    getters: {
        successfulPackages: (state) => state.packages.filter((selectedPackage: IPackage) => selectedPackage.status === 'success'),
    },
    actions: {
        async fetchPackages() {
            return PackageService.getPackages()
                .then(response => {
                    this.packages = response.data
                })
                .catch(error => {
                    throw error
                })
        },
        async fetchPackage(id: string) {
            const existingPackage = this.packages.find((selectedPackage: IPackage) => selectedPackage.id === Number(id))
            if (existingPackage) {
                this.selectedPackage = existingPackage
            } else {
                return PackageService.getPackage(id)
                    .then(response => {
                        this.selectedPackage = response.data
                    })
                    .catch(error => {
                        throw error
                    })
            }
        }
    },
})

// SETUP PATTERN
// In Setup Stores:
//  ref()s become state properties
//  computed()s become getters
//  function()s become actions
//  Setup stores bring a lot more flexibility than Option Stores as you can create watchers within a store and freely use any composable.
//  However, keep in mind that using composables will get more complex when using SSR.
//  - Pinia Docs
// export const usePackageStore = defineStore('package', () => {
//     // State Properties
//     const packages = ref([])
//     const selectedPackage = ref(null)
//
//     // Getters
//     const successfulPackages = computed(() => packages.value
//         .filter((selectedPackage: IPackage) => selectedPackage.status === 'success'))
//
//     // Actions
//     const fetchPackages = async () => {
//         return PackageService.getPackages()
//             .then(response => {
//                 packages.value = response.data
//             })
//             .catch(error => {
//                 throw error
//             })
//     }
//
//     const fetchPackage = async (id: string) => {
//         const existingPackage = packages.value
//             .find((selectedPackage: IPackage) => selectedPackage.id === Number(id))
//
//         if (existingPackage) {
//             selectedPackage.value = existingPackage
//         } else {
//             return PackageService.getPackage(id)
//                 .then(response => {
//                     selectedPackage.value = response.data
//                 })
//                 .catch(error => {
//                     throw error
//                 })
//         }
//     }
//
//     return {
//         packages,
//         selectedPackage,
//         successfulPackages,
//         fetchPackages,
//         fetchPackage,
//     }
// })
