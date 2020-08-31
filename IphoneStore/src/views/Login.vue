<template>
  <div id="login">
       <div class="container">
        <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card card-signin my-5">
                <div class="card-body">
                    <h5 class="card-title text-center">Đăng nhập</h5>
                    <h4 id="mess">{{message}}</h4>
                    <form class="form-signin">
                    <div class="form-label-group">
                        <input type="text" id="username"  class="form-control" v-model="username"  required autofocus>
                        <label for="username">Tài khoản</label>
                    </div>

                    <div class="form-label-group">
                        <input type="password" id="inputPassword" v-model="password" class="form-control" required>
                        <label for="inputPassword">Mật khẩu</label>
                    </div>
                    <button class="btn btn-lg btn-success btn-block  mb-3"  @click="submitform">Đăng nhập</button>

                    </form>
                </div>
                </div>
            </div>
     
        </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
export default {
  data () {
    return {
      username:"",
      password:"",
      success:0,
      message:"",
      data:{},
    }
  },
  props: {
    dulieu:Object
  },
  created(){
    console.log( this.$session.get('u_id'));
    if(this.$session.get('u_id') ==10){
      this.$router.push('/admin')
    }else{
      if(this.$session.get('u_id') != null )
      {
        this.$router.push('/home')
      }
    }
  },
  methods:{
    submitform(){
      let content = { userName:this.username, passWord:this.password }
      axios.post("http://localhost:3000/login", content, { useCredentails: true })
      // axios.post("http://localhost:8081/login", content, { useCredentails: true })
              .then(function(response) {
                  if(response.data.success > this.success){
                    this.$session.set('u_id',response.data.id)  
                  }
               }.bind(this))  
    }

  
  }

}
</script>

<style>
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: .75rem;
}

/* body {
  background: #007bff;
  background: linear-gradient(to right, #0062E6, #33AEFF);
} */

.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}

.form-label-group>input,
.form-label-group>label {
  padding: var(--input-padding-y) var(--input-padding-x);
}

.form-label-group>label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown)~label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}

.btn-google {
  color: white;
  background-color: #ea4335;
}

.btn-facebook {
  color: white;
  background-color: #3b5998;
}

/* Fallback for Edge
-------------------------------------------------- */

@supports (-ms-ime-align: auto) {
  .form-label-group>label {
    display: none;
  }
  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}

/* Fallback for IE
-------------------------------------------------- */

@media all and (-ms-high-contrast: none),
(-ms-high-contrast: active) {
  .form-label-group>label {
    display: none;
  }
  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
}
#mess{
  font-size: 14px;
  color: #ea4335;
  text-align: center;
}
</style>