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
	    <button class="btn-primary" v-on:click="addGrade">+</button>
	    <button class="btn-primary" v-on:click="removeGrade">-</button>
	    <button class="btn-primary" v-on:click="resetEntries">Reset</button>
      <div class="output">
      <h3> Your grade is {{calculateGrade}}%</h3>
    </div>
  	  </div>
  	</div>
  	<div class="predGrade">
  	  <h2 class="predHeader">Predicted Grade</h2>
      <p>Enter remaining point category totals: </p>
  	  <div class = gradesToGo>
  	    <div class="grade" v-for="grade in predicts">
  	      <input class="input" type="text" v-model="grade.pointsPredict">
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
  name: 'cumm',
  data:function () {
    return {
    	grades:[{"pointsEarned": "", "pointsTotal" :""}],
    	predicts:[{"pointsPredict": ""}],
    	value:0,
      earned:0,
      total:0,
    	cummGrade:0,
      predictedTotal:0,
      predictedEarned:0,
      predictedGrade:0

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

  	resetEntries:function(){
      for(var g in this.grades){
  	    this.grades[g].pointsEarned =""
        this.grades[g].pointsTotal = ""
  	  }
      this.cummGrade=""
  	},

    resetPred:function(){
      for(var p in this.predicts){
        this.predicts[p].pointsPredict =""
      }
      this.predictedGrade=""
      this.value=0
    }
  },

  computed:{
    calculateGrade:function(){
      var earned = 0
      var total = 0
      for(var g in this.grades){
        earned += Number(this.grades[g].pointsEarned)
        total += Number(this.grades[g].pointsTotal)
      }
      this.earned = earned
      this.total=total
      this.cummGrade = 100*(earned / total)
      this.cummGrade=this.cummGrade.toFixed(2) 

      if(isNaN(this.cummGrade)) {
        return 0
      }
      else if(!isFinite(this.cummGrade)){
        return 0
      }
      return this.cummGrade
    },

    predictGrade:function(){
      this.predictedEarned = Number(this.earned)
      this.predictedTotal=Number(this.total)
      for(var p in this.predicts){
        this.predictedTotal += Number(this.predicts[p].pointsPredict)
      }

      var need = 0 
      var val = this.value / 100.0
      need = Math.ceil(val * this.predictedTotal - this.earned)
      this.predictedGrade = need
      if(need<0){
        return 0
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
