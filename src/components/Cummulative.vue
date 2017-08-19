<template>
  <div class = "gradeCalcPage">
    <div class = "entries">
      <p class="header"> Earned &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Total</p>
  	  <div class ="cummGrades">
  	    <div class="grade" v-for="grade in grades">
  	      <input class="earned" type="text" v-model="grade.pointsEarned">
  	      <input class="total" type="text" v-model="grade.pointsTotal">
  	    </div>
  	  </div>
  	  <br>
  	  <div class="buttons">
	    <button class="btn-primary" v-on:click="calculateGrade">Submit</button>
	    <button class="btn-primary" v-on:click="addGrade">+</button>
	    <button class="btn-primary" v-on:click="removeGrade">-</button>
  	  </div>
  	</div>
  	<!-- <div class="gradeSlide">
  	  <vue-slider  ref="slider" v-model="value"
  	  :min = 0
  	  :max= 100
  	  :width=500>
  	  </vue-slider>
  	</div> -->
  	<div class="output">
  	  <p v-if="cummGrade"> Your grade is {{cummGrade}}%</p>
  	</div>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component'
export default {
  name: 'cumm',
  data:function () {
    return {
    	grades:[{"pointsEarned": "", "pointsTotal" :""}],
    	value:1,
    	cummGrade:""
    }
  },
  created:function(){
  	this.initGrades()
  },
  methods:{

    addGrade:function(){
  	  this.grades.push({"pointsEarned": "", "pointsTotal" :""})
  	},

  	removeGrade:function(){
  	  this.grades.pop()
  	},

  	initGrades:function(){
  	  for(var i = 0; i < 10; i++){
  	    this.grades.push({"pointsEarned": "", "pointsTotal" :""})
  	  }
  	},

  	calculateGrade:function(){
  	  var earned = 0
  	  var total = 0
  	  for(var g in this.grades){
  	    earned += Number(this.grades[g].pointsEarned)
  	  	total += Number(this.grades[g].pointsTotal)
  	  }
  	  this.cummGrade = 100*(earned / total).toFixed(2)	
  	}
  },
  components:{
  	vueSlider
  }
}
</script>

<style scoped>


.gradeSlide{
	margin-left: 500px;
	margin-top: -200px;
}

.gradeCalcPage{
	margin-top:10px;
	margin-left:10px;
}


</style>
