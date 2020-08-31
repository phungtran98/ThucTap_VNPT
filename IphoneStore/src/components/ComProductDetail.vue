<template>
  <div>
      <h3 class="text-center p-title my-3 p-title" >Chi tiết sản phẩm </h3>
        <div class="row detail" v-for="val in productdetail" v-bind:key="val.p_id">
            <div class="col-5">
                <img v-bind:src="require('../assets/img/products/'+val.p_image)" alt="gold" style="width: 100%;">
            </div>
            <div class="col-7">
                <ul class="list-group table-list" >
                    
                    <li class="list-group-item border-none"><b>Thông tin sản phẩm</b></li>
                    <li class="list-group-item border-none">Tên sản phẩm: <b>{{val.p_name}}</b></li>
                    <li class="list-group-item border-none">Giá: <b> {{formatPrice(val.p_price)}} VNĐ </b></li>
                    <li class="list-group-item border-none">Thương hiệu: <b>{{val.p_trademark}}</b></li>
                    <li class="list-group-item border-none">
                    Số lượng: <span> <number-input v-model="value" size="small" :min="1" :max="10" inline controls center></number-input></span>
                       
                    </li>
                    <li class="list-group-item border-none" @click="sendcart"><button class="btn btn-success text-center">Thêm vào giỏ hàng</button></li>
                    </ul>   
            </div>
        </div>
        <br/>
    <ComSlick/>
  </div>    
</template>

<script>
import axios from 'axios'
import ComSlick from './ComSlick'
export default {
    data() {
        return {
            pID:this.$route.params.id,
            productdetail:{},
            value:1,
            nameproduct:'',
            price:0,
            listorder:[],
           
        }
    },
   created (){
        // console.log(this.productdetail.p_name);
        axios.get("http://localhost:3000/product/"+this.pID,{ useCredentails: true }) .then(function(response){
            // axios.get("http://localhost:8082/product/"+this.pID,{ useCredentails: true }) .then(function(response) {
            this.productdetail = response.data
        }.bind(this))
    },
    methods: {
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    sendcart(){
        this.productdetail.forEach(element => {
            this.nameproduct =element.p_name,
            this.price = element.p_price
            this.id = element.p_id
        });
        
         this.$session.set('idproduct',{id:this.pID,quality:this.value,price:this.price})
        this.$store.commit("ADD_Item",this.pID,this.value)
        // this.$store.commit('REMOVE_Item',0)
        // console.log(this.$store.getters.StoreCart);
         this.$router.push('/checkout')
        

    }
},
components:{
    ComSlick
}
   
    
}
</script>

<style>
.p-title {
    color: #37ce12;
    text-transform: uppercase;
    text-align: center;
    font-size: 18px;
    border-bottom: 2px solid;
    width: 52%;
    margin: auto;
    padding-bottom: 6px;
}
.detail{
    margin-top: 40px;
}
.table-list{
    width: 80%;
}
</style>