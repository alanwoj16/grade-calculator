import Vue from 'vue'
import Router from 'vue-router'
import gradeCalc from '@/components/GradeCalcPage'
import cummulative from '@/components/Cummulative'
import weight from '@/components/Weight'
import gpa from '@/components/GPA'
import vueSlider from 'vue-slider-component'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Grade Calculator Page',
      component: gradeCalc
    },
    {
      path: '/Cummulative',
      name: 'Cummulative Grade',
      component: cummulative
    },
    {
      path: '/Weight',
      name: 'Weight Grade',
      component: weight
    },
    {
      path: '/GPA',
      name: 'GPA',
      component: gpa
    }

  ]
})
