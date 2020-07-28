import firebase from 'firebase/app'

export default {
    actions: {
        async createRecord({ dispatch, commit }, record) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/user/${uid}/records`).push(record)
            } catch (error) {
                commit('setError', e);
                throw error
            }
        },
        async fetchRecords({ dispatch, commit }) {
            try {
                const uid = await dispatch('getUid')
                const records = (await firebase.database().ref(`/user/${uid}/records`).once('value')).val() || {}
                return Object.keys(records).map(key => ({ ...records[key], id: key }))
            } catch (error) {
                commit('setError', error);
                throw error;
            }
        },
        async fetchRecordById({ dispatch, commit }, id) {
            try {
                const uid = await dispatch('getUid')
                const records = (await firebase.database().ref(`/user/${uid}/records`).child(id).once('value')).val() || {}
                return {
                    ...records,
                    id: id
                }

            } catch (error) {
                commit('setError', error);
                throw error;
            }
        }
    }
}