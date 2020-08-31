<template>
  <div class="col-md-4">
        <div class="card mb-4 shadow-sm">
       <img class="card-img-top"  style="height: 230px; width: 90%; display: block; margin:5px" v-bind:src="require('../assets/img/products/'+listproduct.p_image)" alt="image slot">
         <!-- ?<img class="card-img-top"  style="height: 225px; width: 100%; display: block;"  src="../assets/img/products/i101.png" alt="image slot">  -->
        <div class="card-body">
            <p class="card-text"><a href="#">{{listproduct.p_name}}</a></p>
            <p class="vnd">{{formatPrice(listproduct.p_price)}} VNĐ</p>
            <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary add-to-cart">Thêm vào giỏ hàng</button>
                <a
                class="btn btn-sm btn-outline-secondary" 
                @click="getIDProduct(listproduct.p_id)"
                >Chi tiết</a>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
// import img from '../assets/img/products/i101.png'
export default {
    data() {
        return {
        }
    },
     props:
         ['listproduct','tt'],
    methods:{
        getIDProduct(id){
        
            this.$router.push({name:'ComProductDetail', params:{id:id}});

        },
        formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    }
   

}
</script>

<style>
.card.mb-4.shadow-sm {
    height: 400px;
}
.card-body > p > a {
    text-decoration: none;
    color: #2be24a;
    text-transform: uppercase;
}
.card-body > p {
    text-align: center;
    font-size: 17px;
}
p.vnd {
    font-weight: 500;
    color: #d42700;
}
</style>