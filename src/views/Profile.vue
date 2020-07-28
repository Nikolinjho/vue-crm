<template>
    <div>
        <div class="page-title">
            <h3>{{'ProfileTitle' | localize}}</h3>
        </div>

        <form class="form" @submit.prevent="submitHandler">
            <div class="input-field">
                <input
                    id="description"
                    type="text"
                    v-model="name"
                    :class="{ invalid: $v.name.$dirty && !$v.name.required }"
                />
                <label for="description">Имя</label>
                <span
                    class="helper-text invalid"
                    v-if="$v.name.$dirty && !$v.name.required"
                    >Введите имя</span
                >
            </div>
            <div class="switch">
                <label>
                    English
                    <input type="checkbox" v-model="isRuLocale" />
                    <span class="lever"></span>
                    Русский
                </label>
            </div>
            <button class="btn waves-effect waves-light" type="submit">
                Обновить
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
    metaInfo: {
        title: 'Profile'
    },
    data() {
        return {
            name: "",
            isRuLocale: true
        };
    },
    computed: {
        ...mapGetters(["info"])
    },
    methods: {
        ...mapActions(["updateInfo"]),
        async submitHandler() {
            if (this.$v.$invalid) {
                this.$v.$touch();
                return;
            }

            try {
                await this.updateInfo({
                    name: this.name,
                    locale: this.isRuLocale ? 'ru-RU' : 'en-US' 
                });
            } catch (error) {}
        }
    },
    mounted() {
        console.log(this)
        setTimeout(() => {
            M.updateTextFields();
        }, 0);
        this.name = this.info.name;
        this.isRuLocale = this.info.locale === "ru-RU";
    },
    validations: {
        name: {
            required
        }
    }
};
</script>

<style scoped>
.btn {
    margin-top: 1rem;
}
</style>