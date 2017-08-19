<template>
  <div class = "gradeCalcPage">
    <div class = "entries">
      <h2>Current Grade</h2>
      <p class="header"> &emsp;Earned &emsp;&emsp;&emsp;Total</p>
  	  <div class ="cummGrades">
  	    <div class="grade" v-for="grade in grades">
  	      &emsp;<input class="input" type="text" v-model="grade.pointsEarned">&emsp;&emsp;
  	      <input class="input" type="text" v-model="grade.pointsTotal">
  	    </div>
  	  </div>
  	  <br>
  	  <div class="buttons">
	    <button class="btn-primary" v-on:click="calculateGrade">Submit</button>
	    <button class="btn-primary" v-on:click="addGrade">+</button>
	    <button class="btn-primary" v-on:click="removeGrade">-</button>
	    <button class="btn-primary" v-on:click="resetValues">Reset</button>
  	  </div>
  	</div>
  	<div class="predGrade">
  	  <h2 class="predHeader">Predicted Grade</h2>
  	  <div class = gradesToGo>
  	    <div class="grade" v-for="grade in predicts">
  	      <input class="input" type="text" v-model="predicts.pointsPredict">
  	    </div>
  	  </div>
  	  <br><br><br>
  	  <p>Enter/Slide Desired Grade:</p>
  	  <input class="input" type="text" v-model=value>
  	  <br><br><br>
  	  <vue-slider  ref="slider" v-model="value"
  	  :min = 0
  	  :max= 100
  	  :width=500>
  	  </vue-slider>
  	  <button class="btn-primary">Predict Grade</button>
  	</div>
  	<br>
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
    	predicts:[{"pointsPredict": ""}],
    	value:0,
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
  	  for(var j = 0; j < 5; j++){
  	  	this.predicts.push({"pointsPredict": ""})
  	  }
  	},

  	resetValues:function(){
      for(var g in this.grades){
  	    this.grades[g].pointsEarned =""
        this.grades[g].pointsTotal = ""
  	  }
  	},

  	calculateGrade:function(){
  	  var earned = 0
  	  var total = 0
  	  for(var g in this.grades){
  	    earned += Number(this.grades[g].pointsEarned)
  	  	total += Number(this.grades[g].pointsTotal)
  	  }
  	  this.cummGrade = 100*(earned / total)
  	  this.cummGrade=this.cummGrade.toFixed(2)	
  	},

  	predictGrade:function(){

  	}
  },
  components:{
  	vueSlider
  }
}
</script>

<style scoped>


.predGrade{
	display:inline-block;
    margin-left:100px;
}

.entries{
	display: inline-block;
	float:left
}

.gradeCalcPage{
	margin-top:10px;
	margin-left:10px;
}

.input{
	width:50px;
}



</style>
