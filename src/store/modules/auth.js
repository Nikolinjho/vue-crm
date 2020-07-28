import firebase from 'firebase/app';

export default {
    actions: {
        async register({ dispatch, commit }, { email, password, name }) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password);
                const uid = await dispatch('getUid');
                await firebase.database().ref(`/user/${uid}/info`).set({
                    build: 10000,
                    name: name
                })
            } catch (error) {
                console.log(1);
                commit('setError', error)
                throw error
            }
        },
        async login({ commit, dispatch }, { email, password }) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password);
            } catch (error) {
                commit('setError', error)
                throw error
            }
        },
        getUid() {
            const user = firebase.auth().currentUser;
            return user ? user.uid : null;
        },
        async logOut({commit}) {
            await firebase.auth().signOut()
            commit('clearInfo') 
        }
    }
}