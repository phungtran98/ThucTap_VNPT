<template>
  <div class="page-wrapper">
        <!-- HEADER MOBILE-->
        <header class="header-mobile d-block d-lg-none">
            <div class="header-mobile__bar">
                <div class="container-fluid">
                    <div class="header-mobile-inner">
                        <a class="logo" href="index.html">
                            <img v-bind:src="require('./../assets/template/images/icon/logo.png')" alt="CoolAdmin" />
                        </a>
                        <button class="hamburger hamburger--slider" type="button">
                            <span class="hamburger-box">
                                <span class="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>  
            </div>
                
        </header>
        <!-- END HEADER MOBILE-->

        <!-- MENU SIDEBAR-->
        <aside class="menu-sidebar d-none d-lg-block">
            <div class="logo">
                <a href="#">
                    <img v-bind:src="require('./../assets/template/images/icon/logo.png')" alt="Cool Admin" />
                </a>
            </div>
            <div class="menu-sidebar__content js-scrollbar1">
                <nav class="navbar-sidebar">
                    <ul class="list-unstyled navbar__list">
                        <li>
                          <router-link to="/admin/types"><i class="fas fa-chart-bar"></i>Danh mục sản phẩm</router-link>
                        </li>
                        <li>
                          <router-link to="/admin/products"><i class="fab fa-audible"></i>Danh sách sản phẩm</router-link>
                        </li>
                        <li>
                          <router-link to="/admin/accounts"><i class="fas fa-address-card"></i>Quản lý tài khoản</router-link>
                        </li>
                        <li>
                          <router-link to="/admin/orders"><i class="fa fa-luggage-cart"></i>Quản lí đơn hàng</router-link>
                        </li>
                        <li>
                          <a @click="logout"><i class="fas fa-user-friends"></i>Đăng xuất</a>
                        </li>
                     
                    </ul>
                </nav>
            </div>
        </aside>
        <!-- END MENU SIDEBAR-->

        <!-- PAGE CONTAINER-->
        <div class="page-container">
            <!-- HEADER DESKTOP-->
            <header class="header-desktop">
                <div class="section__content section__content--p30">
                    <div class="container-fluid">
                        <div class="header-wrap">
                            <form class="form-header" action="" method="POST">
                              <!-- form -->
                            </form>
                            <div class="header-button">
                                <div class="noti-wrap">
                                   
                                  
                                </div>
                                <div class="account-wrap">
                                    <div class="account-item clearfix js-item-menu">
                                        <div class="image">
                                            <img v-bind:src="require('./../assets/template/images/icon/avatar-01.jpg')" alt="John Doe" />
                                        </div>
                                        <div class="content" v-for="val in user" :key="val.u_id">
                                            <a class="js-acc-btn" href="#">{{val.u_name}}</a>
                                        </div>
                                        <div class="account-dropdown js-dropdown">
                                            <div class="info clearfix">
                                                <div class="image">
                                                    <a href="#">
                                                        <img src="images/icon/avatar-01.jpg" alt="John Doe" />
                                                    </a>
                                                </div>
                                                <div class="content">
                                                    <h5 class="name">
                                                        <a href="#">john doe</a>
                                                    </h5>
                                                    <span class="email">johndoe@example.com</span>
                                                </div>
                                            </div>
                                            <div class="account-dropdown__body">
                                                <div class="account-dropdown__item">
                                                    <a href="#">
                                                        <i class="zmdi zmdi-account"></i>Account</a>
                                                </div>
                                                <div class="account-dropdown__item">
                                                    <a href="#">
                                                        <i class="zmdi zmdi-settings"></i>Setting</a>
                                                </div>
                                                <div class="account-dropdown__item">
                                                    <a href="#">
                                                        <i class="zmdi zmdi-money-box"></i>Billing</a>
                                                </div>
                                            </div>
                                            <div class="account-dropdown__footer">
                                                <a href="#">
                                                    <i class="zmdi zmdi-power"></i>Logout</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <!-- HEADER DESKTOP-->

            <!-- MAIN CONTENT-->
            <div class="main-content">
                <div class="section__content section__content--p30">
                    <div class="container-fluid">
                        <router-view></router-view>
                        
                        <div class="row">
                            <div class="col-md-12">
                                <div class="copyright">
                                    <p>Copyright © 2018 Colorlib. All rights reserved. Template by <a href="https://colorlib.com">Colorlib</a>.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END MAIN CONTENT-->
            <!-- END PAGE CONTAINER-->
        </div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            user:[]
        }
    },
created(){
    if(this.$session.get('u_id')==null){
        this.$router.push('/login')
    }
    else{
        axios.get('http://localhost:3000/users/'+this.$session.get('u_id')).then(function(response){
            // console.log(response.data);
            this.user = response.data
            
        }.bind(this))
    }
},
methods:{
    logout(){
        this.$session.remove('u_id')
        location.reload();
    }
}
}
</script>

<style>

   @import './../assets/template/css/font-face.css';
   /* @import './../assets/template/vendor/font-awesome-4.7/css/font-awesome.min.css';
   @import './../assets/template/vendor/font-awesome-5/css/font awesome-all.min.css'; */
   @import './../assets/template/vendor/mdi-font/css/material-design-iconic-font.min.css';
   @import './../assets/template/vendor/bootstrap-4.1/bootstrap.min.css';
   @import './../assets/template/vendor/animsition/animsition.min.css';
   @import './../assets/template/vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css';
   @import './../assets/template/vendor/wow/animate.css';
   @import './../assets/template/vendor/css-hamburgers/hamburgers.min.css';
   @import './../assets/template/vendor/slick/slick.css';
   @import './../assets/template/vendor/select2/select2.min.css';
   @import './../assets/template/vendor/perfect-scrollbar/perfect-scrollbar.css';
   @import './../assets/template/css/theme.css';
</style>