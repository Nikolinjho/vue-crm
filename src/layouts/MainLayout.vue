<template>
    <div>
        <Loader v-if="loading" />
        <div class="app-main-layout" v-else>
            <Navbar @toggle-nav="isOpen = !isOpen" />
            <Sidebar v-model="isOpen" />  

            <main class="app-content" :class="{ full: !isOpen }">
                <div class="app-page">
                    <keep-alive include="record">  
                        <router-view />
                    </keep-alive>
                </div>
            </main>

            <div class="fixed-action-btn" title="Создать новую запись">
                <router-link class="btn-floating btn-large blue" to="/record">
                    <i class="large material-icons">add</i>
                </router-link>
            </div>
        </div>
    </div>
</template>


<script>
import Navbar from "@comps/app/Navbar";
import Sidebar from "@comps/app/Sidebar";

import messages from "@/utils/messages";

export default {
    name: "main-layout",
    components: {
        Navbar,
        Sidebar
    },

    data() {
        return {
            isOpen: true,
            loading: true
        };
    },
    async mounted() {
        if (!Object.keys(this.$store.getters.info).length) {
            await this.$store.dispatch("fetchInfo");
        }
        this.loading = false;
    },
    computed: {
        error() {
            return this.$store.getters.error;
        }
    },
    watch: {
        error(fbError) {
            console.log(fbError);
            this.$error(messages[fbError.code] || "Что-то пошло не так");
        }
    }
};
</script>