<template>
  <div class="row">
        <div class="col-md-12">
            <h3 class="table-title">Quản lý đơn đặt hàng</h3>
            <h6 class="my-3">Tổng số đơn: <span style="color:red"> {{listorder.length }}</span></h6>
            <div class="col-md-12 mb-2">
            <!-- DATA TABLE-->
            <div class="table-responsive m-b-40">
                <table class="table table-borderless table-data3" >
                    <thead>
                        <tr>
                            <th>Họ tên khách hàng</th>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Tổng tiền</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="val in listorder" :key="val.o_id">
                            <td >{{val.u_name}}</td>
                            <td >{{val.p_name}}</td>
                            <td >{{val.od_qty}}</td>
                            <td >{{val.od_total}}</td>
                            <td>
                                <a class="btn btn-danger" style="color:black" @click="delete_od(val.o_id)">Xóa</a>
                            </td>
                        </tr>
                       
                    </tbody>
                </table>
            </div>
            <!-- END DATA TABLE-->
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
data() {
    return {
        listorder:[]
    }
},
methods:{
    delete_od(val){
        if(confirm("Bạn có muốn xóa ?")){
            
            axios.post('http://localhost:3000/orders/detail/',{id:val},{useCredentails:true}).then(function(response){
    
            })
            location.reload()
        }
    }
},
created(){
    axios.get('http://localhost:3000/orders').then(function(response){
        this.listorder = response.data
    }.bind(this))
}
}
</script>

<style>

</style>