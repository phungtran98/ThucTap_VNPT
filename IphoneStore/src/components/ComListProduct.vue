<template>
      <div class="row mt-5">
          <div class="col-12">
              <h5 class="text-center my-4 p-title">Danh sách sản phẩm </h5>
          </div>
          <ComProduct v-for="val in listproduct" 
          v-bind:key="val.p_id"
          v-bind:listproduct="val"
          />  
          <!-- v-on:getIDProduct="getdatafromchild($event)" -->
        
       
      </div>
               
</template>

<script>
import axios from 'axios'
import ComProduct from './ComProduct'
export default {
  data() {
    return {
      listproduct:[],
      dataproduct:[]
    }
  },
  components: {
    ComProduct
  },

  created() {
    axios.get("http://localhost:3000/product",{ useCredentails: true }) .then(function(response) {
    // axios.get("http://localhost:8082/product",{ useCredentails: true }) .then(function(response) {
      
      this.listproduct = response.data
      console.log(response.data);
    }.bind(this));
  },
  
    methods:{
      getdatafromchild(getdatafromchild){
        this.dataproduct = getdatafromchild
        this.$emit('getproduct',getdatafromchild)
      }
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
</style>