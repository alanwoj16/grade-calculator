<template>
  <div class = "gradeCalcPage">
    <div class = "entries">
      <h2><u>Current Grade</u></h2>
      <h4 class = "previousResults"> Previous grade information:</h4>
  	  <div class = "existingGrades">
  	    <p>GPA: 
  	      <input class="input" type="text" v-model="prevGPA">
  	      &nbsp; Credit Hours: 
  	      <input class="input" type="text" v-model="prevCreditHours">
  	    </p>
  	  </div>
  	  <br>
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
    <div class="gpaDisplay">
      <table class="gpaTable">
        <thead><tr class="gpaHeader"><th>Letter</th><th>GPA</th></tr></thead>
        <tbody>
          <tr><th>A</th><th>4.00</th></tr>
          <tr><th>A-</th><th>3.67</th></tr>
          <tr><th>B+</th><th>3.33</th></tr>
          <tr><th>B</th><th>3.00</th></tr>
          <tr><th>B-</th><th>2.67</th></tr>
          <tr><th>C+</th><th>2.33</th></tr>
          <tr><th>C</th><th>2.00</th></tr>
          <tr><th>C-</th><th>1.67</th></tr>
          <tr><th>D+</th><th>1.33</th></tr>
          <tr><th>D</th><th>1.00</th></tr>
          <tr><th>D-</th><th>0.67</th></tr>
          <tr><th>F</th><th>0.00</th></tr>
        </tbody>
      </table>
    </div>
  	<div class="predGrade">
  	  <h2 class="predHeader"><u>Predicted Grade</u></h2>
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
  	</div>
  	<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  	<div class="predOutput">
      <h3> You need an average GPA of {{predictGrade}} to get a {{value}}</h3>
    </div>
    <br>
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
      //prev:[{"gpa": "","creditHours" :""}],
      value:3.01,
      gpaGrade:0,
      totalCreditHours:0,
      earnedGPAPoints:0,
      predictedGPA:0,
      prevGPA:0,
      prevCreditHours:0

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
  	  var val = 0 
  	  this.value = val.toFixed(2)
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

      var totalCreditHours = 0
      var earnedGPAPoints = 0

      if(this.prevGPA != "" && this.prevCreditHours != ""){
        earnedGPAPoints+=Number(this.prevGPA)*Number(this.prevCreditHours)
        totalCreditHours+=Number(this.prevCreditHours)
      }

      for(var g in this.grades){
      	if(this.grades[g].letter === "" || this.grades[g].creditHours === ""){
      	  continue
      	}
      	else{
          earnedGPAPoints+=this.convertToNumber(this.grades[g].letter)*Number(this.grades[g].creditHours)
          totalCreditHours+=Number(this.grades[g].creditHours)
        }
      }

      this.totalCreditHours=totalCreditHours
      this.earnedGPAPoints=earnedGPAPoints
      

      var gpaGrade = parseFloat(earnedGPAPoints)/totalCreditHours

      this.gpaGrade=gpaGrade.toFixed(3)

      console.log(this.gpaGrade)

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
      need = need.toFixed(3)
      
      this.predictedGPA=need

      if(need<0){
        return 0
      }
      else if(!isFinite(need)){
      	return 0  
      }
      else if (need>4.0){
        return ">4.000"
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
  margin-right:12%;
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

.predOutput{
  display:inline-block;
  float:left;
  margin-left:200px;
}

.gpaDisplay{
  display:inline-block;
  float:right;
  margin-right:20%;
}

.gpaTable{
  font-size:150%;

}


th{
  text-align: center
}

tr, th {
  border: 2.5px solid black; 
  border-collapse: collapse;
} 
tbody tr:nth-child(even){
    background-color: #ADD8E6;
}
tbody tr:nth-child(odd){
    background-color: #DEF3F9;
}

thead{
  background-color: #2c6372;
  color: white;
}
</style>
