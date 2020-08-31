<template>
  <div id="home">
        <div class="container">
            <ComHeader />
            <div class="row mt-2">
                <div class="col-3">
                    <ComMenuLeft/>
                </div>  
                <div class="col-9">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <ComFooter/>
    </div>
   
</template>

<script>
import ComHeader from './../components/ComHeader'
import ComMenuLeft from './../components/ComMenuLeft'
import ComCarousel from './../components/ComCarousel'
import ComListProduct from './../components/ComListProduct'
import ComProductDetail from './../components/ComProductDetail'
// import ComSlick from './../components/ComSlick'
import ComFooter from './../components/ComFooter'
// import ComHomeDetail from './../components/ComHomeDetail'
import axios from 'axios'
export default {

  
    components:{
        ComHeader,
        ComMenuLeft,
        ComCarousel,
        ComListProduct,
        ComFooter,
        ComProductDetail
    },
    created(){
        if(this.$session.get('u_id') == null )
        {
            this.$router.push('/login')
        }
        
    }
}
</script>

<style>
footer#footer {
    background-color: #b5cce0;
}

</style>