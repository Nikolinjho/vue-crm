import firebase from 'firebase/app';
import { get } from 'jquery';

export default {
    state: {
        info: {}
    },
    actions: {
        async fetchInfo({ dispatch, commit }) {
            try {
                const uid = await dispatch('getUid')
                const info = (await firebase.database().ref(`/user/${uid}/info`).once('value')).val()
                commit('setInfo', info)
            } catch (error) {

            }
        },
        async updateInfo({ dispatch, commit, getters }, toUpdate) {
            try {
                const uid = await dispatch('getUid');
                const updateData = { ...getters.info, ...toUpdate };
                console.log(getters.info)
                await firebase.database().ref(`user/${uid}/info`).update(toUpdate);
                commit('setInfo', updateData);
            } catch (error) {
                commit('setError');
                throw error;
            }
        }
    },
    mutations: {
        setInfo(state, info) {
            state.info = info;
        },
        clearInfo(state) {
            state.info = {};
        }
    },
    getters: {
        info: state => state.info
    }
}