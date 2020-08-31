<template>
   <div class="container">
        <div class="row">
            <div class="col-md-12 text-center my-4 " >
                <h5 class="text-center p-titl">Sản phẩn liên quan</h5>  </div>
            <div class="col-md-12">

                 <VueSlickCarousel :infinite="true" :autoplay="true" :autoplaySpeed="3000" :slidesToShow="3" :slidesToScroll="3"  >
                      <!-- <section class="regular slider"> -->
                    <div>
                    <img src="../assets/img/products/i101.png" class="slick-img">
                    </div>
                    <div>
                    <img src="../assets/img/products/i102.png" class="slick-img">
                    </div>
                    <div>
                    <img src="../assets/img/products/i121.png" class="slick-img">
                    </div>
                    <div>
                    <img src="../assets/img/products/ss2.png" class="slick-img">
                    </div>
                    <div>
                    <img src="../assets/img/products/ss3.png" class="slick-img">
                    </div>
                    <div>
                    <img src="../assets/img/products/ss4.png" class="slick-img">
                    </div>
                    
                <!-- </section> -->
                
                </VueSlickCarousel>
            </div>
        </div>
    </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
components: { VueSlickCarousel }
}

</script>

<style>
/* slide */
img.slick-img {
    width: 230px;
    height: 270px;
    /* margin: 0px 4px; */
    padding: 14px 3px;
}
.p-titl {
    color: #37ce12;
    text-transform: uppercase;
    text-align: center;
    font-size: 18px;
    border-bottom: 2px solid;
    width: 52%;
    margin: auto;
    padding-bottom: 6px;
}
</style>