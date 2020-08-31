<template>
                <b-navbar toggleable="lg" type="dark" variant="" id="hh">
               <b-navbar-brand  @click="home">Iphone Store</b-navbar-brand>

               <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

               <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                         <b-nav-item-dropdown text="Danh mục sản phẩm" >
                              <b-dropdown-item href="#">Iphone 6</b-dropdown-item>
                              <b-dropdown-item href="#">Iphone 7</b-dropdown-item>
                              <b-dropdown-item href="#">Iphone 8</b-dropdown-item>
                              <b-dropdown-item href="#">Iphone 9</b-dropdown-item>
                         </b-nav-item-dropdown>
                    </b-navbar-nav>

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                         <b-navbar-nav right>
                              <b-nav-item @click="cart">Giỏ hàng</b-nav-item>
                              <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
                         </b-navbar-nav>
                         <b-nav-item-dropdown right>
                              <!-- Using 'button-content' slot -->
                              <template v-slot:button-content>
                              <em v-for="val in user" :key="val.u_id">{{val.u_name}}</em>
                              </template>    
                              <b-dropdown-item v-if="this.$session.get('u_id')==null"  @click="login">Đăng nhập</b-dropdown-item>
                              <!-- <b-dropdown-item v-else-if="this.$session.get('u_id')==''"  @click="login">Đăng nhập</b-dropdown-item> -->
                              <b-dropdown-item v-else @click="logout">Đăng xuất</b-dropdown-item>
                         </b-nav-item-dropdown>
                    </b-navbar-nav>
               </b-collapse>
               </b-navbar>
</template>

<script>
import axios from 'axios'
export default {
name: 'ComHeader',
data() {
     return {
          user:[]
     }
},
created() {
     axios.get('http://localhost:3000/users/'+this.$session.get('u_id')).then(function(response){
          this.user = response.data
          // console.log(response.data);
     }.bind(this))
     
},
methods: {
     login () {
     
          this.$router.push('/login');
     
          },
     home(){
          this.$router.push('/home');
          location.reload();

     },
     cart(){
          this.$router.push('/checkout');
     },
     logout(){
          this.$session.remove('u_id'); 
          this.$router.push('/login').catch(()=>{});  
     }
}

}
</script>

<style>
nav#hh {
    background-color: #059800;
    
}

</style>