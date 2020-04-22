<template>
  <div class="register">
    <div class>
      <div class="col-md-6 offset-md-3">
        <h2 class="display-4 text-center mt-5">Register Form</h2>

        <form action="#"> 
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" name="Name" id="Name" v-model="name" class="form-control" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="text" name="email" id="email" v-model="email" class="form-control" />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              v-model="password"
              id="password"
              class="form-control"
            />
          </div>

          <div class="form-group">
            <button
              type="submit"
              class="btn btn-info btn-block"
              @click.prevent="PerformRegister"
            >Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  // name use like el in cli 
  name:"register",
  data() {
    // data use like data in cli
    return {
      name:"",
      email:"",
      password :""
    }
  },
      methods: {
      PerformRegister(){
      Axios.post('http://localhost:8000/api/auth/register'
        ,{
          email : this.email,
          name : this.name,
          password : this.password
        })
        .then(res => {
           localStorage.setItem('token', res.data.access_token);
           localStorage.setItem('user', res.data.user);
          // redirect page
           this.$router.push("/profile");
            
        })
        .catch( err=>{
          this.error = " There was error during register process";
          console.log(err.message);
        });
      // لعمل اعادة توجيه لصفحة معينة 
        // this.$router.push("/profile");
        // console.log("Your Name Is"+this.name + "your email is " + this.email +"your password is " + this.password);
      },
      }
}
</script>

<style>
</style>