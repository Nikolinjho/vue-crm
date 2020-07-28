import firebase from 'firebase/app';

export default {
    state: {

    },
    actions: {
        async createCategory({ commit, dispatch }, { title, limit }) {

            try {
                const uid = await dispatch('getUid');
                const category = await firebase.database().ref(`/user/${uid}/categories`).push({ title, limit })
                return { title, limit, id: category.key }
            } catch (error) {
                throw error
            }
        },
        async fetchCategories({ commit, dispatch }) {
            try {
                const uid = await dispatch('getUid');
                const categories = (await firebase.database().ref(`/user/${uid}/categories`).once('value')).val() || {}
                return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
            } catch (error) {
                throw error
            }
        },
        async fetchCategoryById({ commit, dispatch }, id) {
            try {
                const uid = await dispatch('getUid');
                const category = (await firebase.database().ref(`/user/${uid}/categories`).child(id).once('value')).val() || {}
                return {
                    ...category,
                    id: id
                }
            } catch (error) {
                throw error
            }
        },
        async editCategory({ commit, dispatch }, { id, title, limit }) {
            try {
                const uid = await dispatch('getUid');
                await firebase.database().ref(`/user/${uid}/categories`).child(id).update({ title, limit })
            } catch (error) {
                throw error
            }
        }
    }
}