<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      Категорий пока нет.
      <router-link to="/categories">Добавить новую</router-link>
    </p>
    <form v-else class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="c in categories" :key="c.id" :value="c.id">{{c.title}}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="profit" v-model="type" />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="spending" v-model="type" />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: ($v.amount.$dirty && !$v.amount.minValue)}"
        />
        <label for="amount">Сумма</label>
        <!-- <span class="helper-text invalid">amount </span> -->
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
        >Минимальная величина {{$v.amount.$params.minValue.min}}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: ($v.description.$dirty && !$v.description.required)}"
        />
        <label for="description">Описание</label>
        <!-- <span class="helper-text invalid">description </span> -->
        <span
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >Введите описание</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>


<script>
import { required, minValue } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  name: "record",
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: "spending",
    amount: 100,
    description: ""
  }),
  computed: {
    ...mapGetters(["info"]),
    canCreateRecord() {
      console.log(this.info);
      if (this.type === "profit") {
        return true;
      } else {
        return this.info.build >= this.amount;
      }
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch("createRecord", {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          });
          console.log(this.amount)
          const build =
            this.type === "profit"
              ? this.info.build + this.amount
              : this.info.build - this.amount;

          await this.$store.dispatch("updateInfo", { build });
          this.$message("Запись успешно создана");
          this.$v.$reset();
          this.amount = 100;
          this.description = "";
        } catch (error) {
          throw error;
        }
      } else {
        this.$message(`Недостаточно средств на счету(${this.info.build})`);
      }
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;

    if (this.categories.length) {
      this.category = this.categories[0].id;
    }
    setTimeout(() => {
      M.updateTextFields();
      this.select = M.FormSelect.init(this.$refs.select);
    }, 0);
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  validations: {
    amount: {
      minValue: minValue(100)
    },
    description: {
      required
    }
  }
};
</script>