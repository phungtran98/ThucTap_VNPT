<template>
      <ul class="list-group normal-border">
            <li class="list-group-item list-group-item-action normal-border bg-red"  ><b class="p-left">Danh mục sản phẩm</b></li>
            <li class="list-group-item list-group-item-action" v-for="val in dataType" v-bind:key="val.tp_id" @click="getid(val.tp_id)"><a  class="ml-2">{{val.tp_name}}</a> </li>
           
        </ul>
</template>

<script>
import axios from 'axios'
export default {
 data() {
       return {
            dataType: []
             
       }
 },
 created() {
        axios.get("http://localhost:3000/type",{ useCredentails: true })
      //   axios.get("http://localhost:8082/type",{ useCredentails: true })
              .then(function(response) {
                 this.dataType = response.data;
               }.bind(this))
 },
 methods:{
     getid(val)
     {
          this.$router.push({name:'ComProductTypeLeft', params:{id:val}});
          location.reload();
     }
 }

}
</script>

<style>
.p-left {
    color: #37ce12;
    text-transform: uppercase;
    text-align: center;
    font-size: 14px;
}
ul.list-group.normal-border li a {
    text-decoration: none;
    font-size: 17px;
    color: black;
    display: block;
}
</style>