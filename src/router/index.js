import Vue from 'vue';
import Router from 'vue-router';

import Home from '../pages/Home'
import Res from '../pages/Res.vue'
import ResDetail from '../components/ResDetail'
Vue.use(Router)

var router = new Router({
	mode:'history',
	routes: [
	    {
	    	path:'/',
	    	component:Home
	    },
	    {
	    	path:'/home',
	    	component:Home
	    },
	    {
	      path: '/home/resinfo/:id',
	      component: Res
	    },
	     {
	    	path:'/home/resinfo/:id/detail',
	    	component:ResDetail
	    },
    ]
});






export default router;