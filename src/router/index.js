import Vue from 'vue'
import Router from 'vue-router'
import gradeCalc from '@/components/GradeCalcPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Grade Calculator Page',
      component: gradeCalc
    }
  ]
})
