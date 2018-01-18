<template>
  <div class = "gradeCalcPage">
    <div class = "entries">
      <h2><u>Current Grade</u></h2>
      <p class="header"> &emsp;Earned &emsp;&emsp;&emsp;Total&emsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Weight</p>
  	  <div class ="weightGrades">
  	    <div class="grade" v-for="grade in grades">
  	      &emsp;<input class="input" type="text" v-model="grade.pointsEarned">
  	      &emsp;&emsp;<input class="input" type="text" v-model="grade.pointsTotal">
  	      &emsp;&emsp;<input class="input" type="text" v-model="grade.weight">
  	    </div>
  	  </div>
  	  <br>
  	  <div class="buttons">
	    <button class="btn-primary" v-on:click="addGrade">+</button>
	    <button class="btn-primary" v-on:click="removeGrade">-</button>
	    <button class="btn-primary" v-on:click="resetEntries">Reset</button>
      <div class="output">
      <h3> Your grade is {{calculateGrade}}%</h3>
    </div>
  	  </div>
  	</div>
  	<div class="predGrade">
  	  <h2 class="predHeader"><u>Predicted Grade</u></h2>
  	  <br>
      <h4>Enter final grade info: </h4>
  	  <div class = gradesToGo>
  	    <p class = "header"> &nbsp;Total&emsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Weight</p>
  	    <div class="grade">
  	      <input class="input" type="text" v-model="final.finalTotal">
  	      &emsp;&emsp;<input class="input" type="text" v-model="final.finalWeight">
  	    </div>
  	  </div>
  	  <br><br>
  	  <p>Enter/Slide Desired Grade:</p>
  	  <input class="input" type="text" v-model=value>
  	  <br><br><br>
  	  <vue-slider  ref="slider" v-model="value"
  	  :min = 0
  	  :max= 100
  	  :width=500>
  	  </vue-slider>
      <button v-on:click="resetPred" class="btn-primary">Reset</button>
      <div class="predOutput">
        <h3> You need {{predictGrade}} points to get a {{value}}% in the class.</h3>
      </div>
  	</div>
  	<br>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component'
export default {
  name: 'weight',
  data:function () {
    return {
      grades:[{"pointsEarned": "", "pointsTotal" :"", "weight":""}],
      final:[{"finalTotal": "","finalWeight": ""}],
      value:0,
      weightSum:0,
      earnedTotal:0,
      weightGrade:0

    }
  },
  created:function(){
  	this.initGrades()
  },
  methods:{

    addGrade:function(){
  	  this.grades.push({"pointsEarned": "", "pointsTotal" :"","weight":""})
  	},

  	removeGrade:function(){
  	  this.grades.pop()
  	},

  	initGrades:function(){
  	  for(var i = 0; i < 10; i++){
  	    this.grades.push({"pointsEarned": "", "pointsTotal" :"", "weight":""})
  	  }
  	},

  	resetEntries:function(){
      for(var g in this.grades){
  	    this.grades[g].pointsEarned =""
        this.grades[g].pointsTotal = ""
        this.grades[g].weight = ""
  	  }
      this.weightGrade=""
  	},

    resetPred:function(){

      this.final.finalTotal =""
      this.final.finalWeight =""
      
      this.predictedGrade=""
      this.value=0
    }
  },

  computed:{
    calculateGrade:function(){

      var earnedTotal = 0
      var weightSum = 0
      for(var g in this.grades){
      	if(this.grades[g].pointsEarned === "" || this.grades[g].pointsTotal === "" || this.grades[g].weight === ""){
      	  continue
      	}
      	else{
      	  var earned = Number(this.grades[g].pointsEarned) 
      	  var total = Number(this.grades[g].pointsTotal)
      	  var weight = Number(this.grades[g].weight) 

      	  earnedTotal += parseFloat(earned / total) * weight
          weightSum+=weight
        }
      }

      this.weightSum=weightSum
      this.earnedTotal=earnedTotal.toFixed(2)
      var weightGrade = earnedTotal / weightSum * 100
      this.weightGrade = weightGrade.toFixed(2)

      if(isNaN(this.weightGrade)) {
        return 0
      }
      else if(!isFinite(this.weightGrade)){
        return 0
      }
      return this.weightGrade
    },

    predictGrade:function(){

      var need = 0
      var totalSum = Number(this.weightSum) + Number(this.final.finalWeight)
      var parsedWeight = this.value/100.0

      need = Math.ceil(((parsedWeight*totalSum)-Number(this.earnedTotal))/Number(this.final.finalWeight)*Number(this.final.finalTotal))
      this.predictedGrade = need

      if(need<0){
        return 0
      }else{
      	if(!isFinite(need)){
      		return 0
      	}
      }
      return need
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
  float:right;
  margin-right:40%;
  
}

.entries{
	display: inline-block;
	float:left;
  margin-left:50px;
  
}

.gradeCalcPage{
	margin-top:10px;
	margin-left:10px;
}

.input{
	width:50px;
}


</style>
