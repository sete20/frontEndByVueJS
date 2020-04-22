<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">Vue Laravel API</router-link>
    <button
      class="navbar-toggler"
      type="button"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item"  v-if='!token'>
          <router-link class="btn btn-primary my-1 btn-block" to="/login">Login</router-link>
        </li>
        <li class="nav-item" v-if='!token'>
          <router-link
            class="btn btn-success my-1 ml-1 btn-block"
            to="/register"
          >Register</router-link>
        </li>
    
        <li class="nav-item " @click.prevent="performLogout" v-if='token'> <button class="btn btn-warning">logout</button> </li>


      </ul>
    </div>
  </nav>
</template>

<script>
export default{
  data() {
    return {
      token: null
    }
  },
  mounted(){
    this.checkUserStatus(); 
  },
  methods:{
    checkUserStatus(){
      if (localStorage.getItem('token') != null) {
        this.token = localStorage.getItem('token');

      }
    },
    performLogout(){
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.token = null ; 
      this.$router.push('login');
    }
  }
}
</script>