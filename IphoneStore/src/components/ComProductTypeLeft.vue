<template>
   <div>
        <ComCarousel/>
        <div class="row mt-5">
          <div class="col-12">
              <h5 class="text-center my-4 p-titl" >Sản phẩm theo loại {{name}}</h5>
          </div>
         <div class="col-md-4" v-for="listproduct in llistproduct" :key="listproduct.p_id">
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
        
       
      </div>
        <ComSlick/>
    </div>
</template>

<script>
import ComCarousel from "./ComCarousel"
import ComListProduct from "./ComListProduct"
import ComSlick from "./ComSlick"
import axios from "axios"
export default {
    components:{
        ComCarousel,
        ComListProduct,
        ComSlick
    },
    data() {
        return {
            llistproduct:[],
            dataproduct:[],
            name:'',
            id:this.$route.params.id,
            err:''
        }
    },
    created(){
         axios.get("http://localhost:3000/getproducttype/"+this.id,{ useCredentails: true }) .then(function(response){
            if(response.data == null){
                this.err="Không có sản phẩm"
            }
            else{
                this.llistproduct = response.data
                console.log(response.data);
                response.data.forEach(val => {
                this.name =  val.tp_name;
                });
            }
        }.bind(this))
    },
    methods:{
         formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
    }
}
</script>

<style>
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