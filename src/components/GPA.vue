<template>
  <div class = "gradeCalcPage">
    <div class = "entries">
      <h2>Current Grade</h2>
      <p class="header"> &emsp;Letter &emsp;&emsp;&emsp;Credit Hours</p>
  	  <div class ="gpaGrades">
  	    <div class="grade" v-for="grade in grades">
  	      &emsp;<input class="input" type="text" v-model="grade.letter">
  	      &emsp;&emsp;&emsp;<input class="input" type="text" v-model="grade.creditHours">
  	    </div>
  	  </div>
  	  <br>
  	  <div class="buttons">
	    <button class="btn-primary" v-on:click="addGrade">+</button>
	    <button class="btn-primary" v-on:click="removeGrade">-</button>
	    <button class="btn-primary" v-on:click="resetEntries">Reset</button>
      <div class="output">
      <h3> Your GPA is {{calculateGrade}}</h3>
    </div>
  	  </div>
  	</div>
  	<div class="predGrade">
  	  <h2 class="predHeader">Predicted Grade</h2>
  	  <br>
      <h4>Enter remaining credit hours: </h4>
  	  <div class = gradesToGo>
  	    <div class="grade">
  	      <input class="input" type="text" v-model="final.creditHours">
  	    </div>
  	  </div>
  	  <br><br>
  	  <p>Enter/Slide Desired GPA:</p>
  	  <input class="input" type="text" v-model=value>
  	  <br><br><br>
  	  <vue-slider  ref="slider" v-model="value"
  	  :min = 3.00
  	  :max= 4.00
  	  :interval= .01
  	  :width=500>
  	  </vue-slider>
      <button v-on:click="resetPred" class="btn-primary">Reset</button>
      <div class="predOutput">
        <h3> You need an average GPA of {{predictGrade}} to get a {{value}}</h3>
      </div>
  	</div>
  	<br>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component'
export default {
  name: 'gpa',
  data:function () {
    return {
      grades:[{"letter": "", "creditHours" :""}],
      final:[{"creditHours": ""}],
      value:3.00,
      gpaGrade:0,
      totalCreditHours:0,
      earnedGPAPoints:0

    }
  },
  created:function(){
  	this.initGrades()
  },
  methods:{

    addGrade:function(){
  	  this.grades.push({"letter": "", "creditHours" :""})
  	},

  	removeGrade:function(){
  	  this.grades.pop()
  	},

  	initGrades:function(){
  	  for(var i = 0; i < 10; i++){
  	    this.grades.push({"letter": "", "creditHours" :""})
  	  }
  	  this.value = value.toFixed(2)
  	},

  	resetEntries:function(){
      for(var g in this.grades){
  	    this.grades[g].letter =""
        this.grades[g].creditHours = ""
  	  }
      this.gpaGrade=0
  	},

    resetPred:function(){

      this.final.creditHours =""
      
      this.predictedGrade=""
      this.value=3.0
    },

    convertToNumber:function(letter){
      if(letter === "A" || letter === "a"){
      	return 4.0
      }
      else if(letter === "A-" || letter ==="a-"){
      	return 3.67
      }
      else if(letter === "B+" || letter ==="b+"){
      	return 3.33
      }
      else if(letter === "B" || letter ==="b"){
      	return 3.00
      }
      else if(letter === "B-" || letter ==="b-"){
      	return 2.67
      }
      else if(letter === "C+" || letter ==="c+"){
      	return 2.33
      }
      else if(letter === "C" || letter ==="c"){
      	return 2.00
      }
      else if(letter === "C-" || letter ==="c-"){
      	return 1.67
      }
      else if(letter === "D+" || letter ==="d+"){
      	return 1.33
      }
      else if(letter === "D" || letter ==="d"){
      	return 1.00
      }
      else if(letter === "D-" || letter ==="d-"){
      	return 0.67
      }
      else if(letter === "F" || letter ==="f"){
      	return 0.00
      }
    }
  },

  computed:{
    calculateGrade:function(){
    	console.log('here')
      
      var totalCreditHours = 0
      var earnedGPAPoints = 0
      console.log(this.grades)
      for(var g in this.grades){
      	if(this.grades[g].letter === "" || this.grades[g].creditHours === ""){
      	  continue
      	}
      	else{
          earnedGPAPoints+=this.convertToNumber(this.grades[g].letter)*Number(this.grades[g].creditHours)
          totalCreditHours+=Number(this.grades[g].creditHours)
        }
      }

      this.totalCreditHours = totalCreditHours
      this.earnedGPAPoints=earnedGPAPoints

      var gpaGrade = parseFloat(earnedGPAPoints)/totalCreditHours

      this.gpaGrade=gpaGrade.toFixed(3)


      if(isNaN(this.gpaGrade)) {
        return 0
      }
      else if(!isFinite(this.gpaGrade)){
        return 0
      }
      return this.gpaGrade
    },

    predictGrade:function(){

      var need = 0

      var allCreditHours = this.totalCreditHours+Number(this.final.creditHours)

      need = ((allCreditHours*this.value)-this.earnedGPAPoints)/this.final.creditHours

      console.log(need)

      need = need.toFixed(3)

      // var totalSum = Number(this.weightSum) + Number(this.final.finalWeight)
      // var parsedWeight = this.value/100.0

      // need = Math.ceil(((parsedWeight*totalSum)-Number(this.earnedTotal))/Number(this.final.finalWeight)*Number(this.final.finalTotal))
      // this.predictedGrade = need

      if(need<0){
        return 0
      }else{
      	if(!isFinite(need)){
      		return 0
      	}
      }
      return need
    },

    valueToFixed:function(){

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
  margin-right:600px;
  
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

/*.predGrade{
  position: absolute;
}
*/


</style>
