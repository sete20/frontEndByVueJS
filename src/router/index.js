import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import login from "../views/Login.vue";
import profile from "../views/Profile.vue";
import register from "../views/Register.vue";

Vue.use(VueRouter);



const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes:[
    {
      path: "/",
      name: "Home",
      component: Home ,
      meta: {guest : true }

    },
    {
      path: "/login",
      name: "login",
      component: login,
      meta: {guest : true }

    },
    {
      path: "/register",
      name: "register",
      component: register,
      meta: {guest : true }
    },
    {
      path: "/profile",
      name: "profile",
      component: profile,
      meta: {secure : true }
    },
    {
      path: "/about",
      name: "About",
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.secure)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (localStorage.getItem('token')== null) {
      console.log("no token");
      next({
        path: "/login"
      });
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)){

    if (localStorage.getItem("token") == null) {
      next()
    }else{
      console.log("no token")
      next({
        path: "/profile"
      });
    }
    
  } else {
    next() // make sure to always call next()!
  }
})

export default router;
