<template>
  <div>
    <h3>Giỏ hàng</h3>
    <div class="container">
        <div class="row">
            <div class="col-md">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Thành tiền</th>
                        <th scope="col">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody v-for="val in listorder" :key="val.p_id">
                        <tr>
                        <th scope="row">1</th>
                        <td> {{ val.p_name }} </td>
                        <td>{{ formatPrice(val.p_price) }} VNĐ</td>
                        <td>
                            <input type="number" id="quality" min="1" value="4" v-model="quality" v-on:change="onchange">
                        </td>
                        <td>{{formatPrice(total) }} VNĐ</td>
                        <td class="text-center">
                            <a href="#" class="btn btn-danger m-auto" @click="deletep">Xóa</a>
                        </td>
                        </tr>
                        <tr>
                        <td colspan="5">Tổng tiền:</td>
                        <td>{{ formatPrice(totalprice) }} VNĐ
                            <!-- {{productdetail}} -->
                        </td>
                        </tr>
                    </tbody>
                    </table>
            </div>
        </div>
        <div class="row">
          <div class="col-md-12">
                <b-button v-b-toggle.collapse-1 variant="success float-right" @click="checkpay">Kiểm tra thông tin</b-button>
          </div>
          <div class="col-md-12">
               <b-collapse id="collapse-1" class="mt-2">
                    <b-card>
                        <div class="container">
                            <div class="row">
                                <div class="col-md-6">
                                    <h4>Thông tin khách hàng</h4>
                                    <table class="table">
                                        <thead>
                                        </thead>
                                        <tbody v-for="val in items" :key="val.u_id">
                                            <tr >
                                                <th>Họ tên khách hàng:</th>
                                                <td>{{val.u_name}}</td>
                                            </tr>
                                            <tr >
                                                <th>Số điện thoại:</th>
                                                <td>{{val.u_phone}}</td>
                                            </tr>
                                            <tr >
                                                <th>Địa chỉ:</th>
                                                <td>{{val.u_address}}</td>
                                            </tr>
                                            <tr >
                                                <th>Hình thức thanh toán:</th>
                                                <td>
                                                    <b-form-group >
                                                        <b-form-radio v-model="selected" name="some-radios" value="A">Thanh toán khi nhận hàng.</b-form-radio>
                                                        <b-form-radio v-model="selected" name="some-radios" value="B">Thanh toán qua tài khoản ngân hàng</b-form-radio>
                                                    </b-form-group>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-md-6">
                                    <h4>Thông tin sản phẩm</h4>
                                    <table class="table">
                                        <thead>
                                        </thead>
                                        <tbody v-for="vl in listorder" :key="vl.p_id">
                                            <tr >
                                                <th>Tên sản phẩm:</th>
                                                <td>{{vl.p_name}}</td>
                                            </tr>
                                            <tr >
                                                <th>Số lượng:</th>
                                                <td>{{quality}}</td>
                                            </tr>
                                            <tr >
                                                <th>Tổng số tiền phải trả:</th>
                                                <td style="color:red; font-size:17px;">{{ formatPrice(total) }} VNĐ</td>
                                            </tr>
                                            <tr>
                                                <th colspan="2"><button class="btn btn-outline-info float-right" @click="getcheckout(vl.p_id)">Tiến Hành Đặt Hàng</button></th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    
                    </b-card>
                </b-collapse>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
   data() {
       return {
           quality:1,
           total:0,
           totalprice:0,
           listorder:[],
           listorder2:[],
           price:0,
           items:[],
           selected:''
           
       }
   },
   
  created(){
        let id = this.$session.get('idproduct').id;
        this.quality = this.$session.get('idproduct').quality;
        // console.log(this.quality);
         axios.get("http://localhost:3000/product/"+id,{ useCredentails: true }) .then(function(response){
        //  axios.get("http://localhost:8082/product/"+id,{ useCredentails: true }) .then(function(response){
        
            // this.$localStorage.set('p'+id, 'phung')
            this.listorder.push(response.data[0])
            this.listorder2.push(response.data[0])
            this.total = this.$session.get('idproduct').price * this.quality;
            this.totalprice = this.total
            this.$localStorage.set('productdetail', JSON.stringify(this.listorder))
            // console.log(this.$localStorage.get('productdetail'))
            
        
        }.bind(this))
        
       
        
   },

methods: {
    onchange(){
        this.total = this.quality * this.$session.get('idproduct').price
            this.totalprice = this.total
    },
    formatPrice(value) {
    let val = (value/1).toFixed(0).replace('.', ',')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    deletep(){
            this.listorder=[]
    },
    checkpay(){
        if(this.$session.get('u_id')!=null)
        {
            axios.get("http://localhost:3000/users/"+this.$session.get('u_id'),{ useCredentails: true }) .then(function(response){
    
                this.items =response.data;
    
            }.bind(this))

        }
        else{
            if(confirm("Bạn chưa đăng nhập? Bạn có muốn đăng nhập không?")){
                this.$router.push('/login')
            }
            
        }
    },
    getcheckout(val){
        // alert(val)
        let data = {uid:this.$session.get('u_id'), up:val, qty:this.quality,total:this.totalprice}
        // console.log(data);
        axios.post('http://localhost:3000/orders/',{data:data},{ useCredentails: true }).then(function(response){
            if(response.data.success){
                if(confirm('Bạn đã đặt hàng thành công, Quay lại trang chủ ? ')){
                    this.listorder=[]
                    this.$router.push('/home')
                }
            }
        }.bind(this))
    }
}
}

</script>

<style>
#quality {
    width: 105px;
    text-align: center;
}
</style>