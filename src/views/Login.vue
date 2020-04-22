<template>
  <div class="login">
    <div class>
      <div class="col-md-6 offset-md-3">
        <h2 class="display-4 text-center mt-5">Login Form</h2>

        <form action="#">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="text" name="email" autocomplete="off" v-model="email" id="email" class="form-control" />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              v-model="password"
              class="form-control"
              autocomplete="off"
            />
              <div style="color:red" v-if="error">{{error}}</div>
   

          </div>

          <div class="form-group">
            <button type="submit"  @click.prevent="PerformLogin" class="btn btn-info btn-block">Login</button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  // name use like el in cli 
  name:"login",
  data() {
    // data use like data in cli
    return {
      email:"",
      password :"",
      error:""
    }
  },
      methods: {
      PerformLogin(){
        axios.post('http://localhost:8000/api/auth/login',{
          email: this.email,
          password: this.password
        })
        .then(res => {
            console.log(res.data);
          // لاعادة استخدام الداتا وتحديدها واعادة تسميتها 
          localStorage.setItem('token', res.data.access_token);
         localStorage.setItem('user', res.data.user);
          // redirect page
           this.$router.push("/profile");
            
        })
        .catch(err=>{
          this.error = " There was error during login process";
          console.log(err.message);
        });
        // لعمل اعادة توجيه لصفحة معينة 
        // this.$router.push("/profile");
        // console.log(this.email +" " + this.password);
      },
      }
}
</script>

<style>
</style>