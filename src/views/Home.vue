<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />
    <div  class="row" v-else>
      <HomeBill 
      :rates="currency.rates"/>
      <HomeCurrency 
       :rates="currency.rates"
       :date="currency.date"/>
    </div>      
  </div>
</template>

<script>
import HomeBill from "@comps/HomeBill";
import HomeCurrency from "@comps/HomeCurrency"; 

export default {
  name: "Home",
  data() {  
    return {
      loading: true,
      currency: null
    };
  },  
  components: {
    HomeBill,
    HomeCurrency
  },
  methods: {
    async refresh(){
      this.loading = true;
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;

    }
  },  
  async mounted(){
    console.log(this.loading)
    this.currency = await this.$store.dispatch('fetchCurrency');
    console.log(this.currency)
    this.loading = false;
  }
};
</script>
