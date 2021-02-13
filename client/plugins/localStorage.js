import createPersistedState from 'vuex-persistedstate';

export default({ store }) => {
    window.onNuxtReady(() => {              //when nuxt is ready
        createPersistedState({})(store);    // pass that store to cookies or local storage so that it can map the local storage or cookies back to our store
    });                                             
};