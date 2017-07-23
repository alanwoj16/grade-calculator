<template>
  <div id="app">
    <h1 id="title"> Grade Calculator </h1>
    <div class = "buttonNav">
        <button v-on:click="goToPage('Cummulative')">Cummulative</button>
        <button v-on:click="goToPage('Weight')">Weight</button>
        <button v-on:click="goToPage('GPA')">GPA</button>
    </div>
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Grade-Calculator',
  methods:{
      goToPage:function(nav){
        this.$router.push('/'+nav);
      }
  }


}
</script>

<style>

#title{
  text-align: center
}

.buttonNav{
  text-align: center
}

</style>
