<template>
 <div class="row">
        <div class="col-md-12">
            <h3 class="table-title">Danh sách sản phẩm</h3>
            <!-- DATA TABLE-->
            <button class="au-btn au-btn-icon au-btn--green au-btn--small mb-3" v-b-modal.add-product>
            <i class="zmdi zmdi-plus"></i>Thêm sản phẩm mới</button>
             <b-modal id="add-product" title="Thêm loại sản phẩm">
                <div class="container">
                    <div class="row">
                        <div class="col-sm">
                            <div class="form-group">
                                <label for="cc-payment"  class="control-label mb-1">Tên sản phẩm: </label>
                                <input v-model="pname" class="form-control" aria-required="true" aria-invalid="false" >
                                <label for="cc-payment"  class="control-label mb-1">Giá: </label>
                                <input v-model="pprice" class="form-control" aria-required="true" aria-invalid="false" >
                                <label for="cc-payment"  class="control-label mb-1">Loại sản phẩm:  </label>
                                <select v-model="tpname" class="form-control" >
                                    <option disabled >Chọn loại sản phẩm</option>
                                    <option v-for="vl in listtype" :key="vl.tp_id" v-bind:value="{id:vl.tp_id,name:vl.tp_name}" >{{vl.tp_name}}</option>
                                </select>
                                <label for="cc-payment"  class="control-label mb-1">Mô tả:  </label>
                                <textarea v-model="pdes" placeholder="Mô tả sản phẩm" class="form-control" ></textarea>
                                <label for="cc-payment"  class="control-label mb-1">Hình Ảnh:  </label>
                                <input type="file" class="form-control"  @change="processFile($event)">
                            </div>
                        </div>
                        <div class="com-sm">
                            <img :src="image" />
                        </div>
                    </div>
                </div>
                <template v-slot:modal-footer>
                <b-button class="mt-3 " @click="$bvModal.hide('add-product')">Đóng</b-button>
                <b-button class="mt-3 btn-success" @click="submit">Lưu</b-button>
                </template>
            </b-modal>
            <div class="table-responsive m-b-40">
                <table class="table table-borderless table-data3">
                    <thead>
                        <tr>
                            <th>Hình Ảnh</th>
                            <th>Tên</th>
                            <th>Giá</th>
                            <th>Mô tả</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="val in listproduct" :key="val.p_id">
                            <td>
                                <img :src="require('./../assets/img/products/'+val.p_image)" :alt="val.p_name" style="width:100px; height:100px">
                            </td>
                            <td> {{val.p_name}} </td>
                            <td> {{ formatPrice(val.p_price)}} VNĐ</td>
                            <td> {{val.p_description}} </td>
                            <td>
                                <button class="btn btn-warning" v-b-modal.update-product @click="getid(val.p_id)">Sửa</button>
                                <button class="btn btn-danger" @click="getiddelete(val.p_id)" >Xóa</button>
                            </td>
                            
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- END DATA TABLE-->
        </div>

        <!-- update product -->
         <b-modal id="update-product" title="Cập nhật sản phẩm sản phẩm">
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                        <div class="form-group" v-for="data in updateproduct" :key="data.p_id">
                            <label for="cc-payment"  class="control-label mb-1">Tên sản phẩm: </label>
                            <input class="form-control" :value="data.p_name" readonly >
                            <input v-model="pname" class="form-control" aria-required="true" >
                            <label for="cc-payment"  class="control-label mb-1">Giá: </label>
                            <input class="form-control" :value="data.p_price" readonly >
                            <input v-model="pprice" class="form-control" aria-required="true" aria-invalid="false" >
                            <label for="cc-payment"  class="control-label mb-1">Loại sản phẩm:  </label>
                            <select v-model="tpname" class="form-control" >
                                <option disabled >Chọn loại sản phẩm</option>
                                <option v-for="vl in listtype" :key="vl.tp_id" v-bind:value="{id:vl.tp_id,name:vl.tp_name}" >{{vl.tp_name}}</option>
                            </select>
                            <label for="cc-payment"  class="control-label mb-1">Mô tả:  </label>
                            <textarea v-model="pdes" placeholder="Mô tả sản phẩm" class="form-control"  ></textarea>
                            <label for="cc-payment"  class="control-label mb-1">Hình Ảnh:  </label>
                            <input type="file" class="form-control"  @change="processFile($event)">
                        </div>
                    </div>
                    <div class="com-sm">
                        <img :src="image" />
                    </div>
                </div>
            </div>
            <template v-slot:modal-footer>
            <b-button class="mt-3 " @click="$bvModal.hide('update-product')">Đóng</b-button>
            <b-button class="mt-3 btn-success" >Lưu</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            listproduct:[],
            listtype:[],
            pname:'',
            tpname:'',
            pprice:'',
            pdes:'',
            pimage:[],
            idp:'',
            image:'',
            updateproduct:[]

        }
    },
    created(){
        axios.get("http://localhost:3000/product",{useCredentails: true}).then(function(response){   
            console.log(response.data);
            this.listproduct = response.data
        }.bind(this))

        axios.get("http://localhost:3000/type",{useCredentails: true}).then(function(response){   
            // console.log(response.data);
            this.listtype = response.data
        }.bind(this))

     
        

    },
    methods:{
        submit(){

            let data = {pname:this.pname, tpname:this.tpname, price:this.pprice, des:this.pdes, image:this.pimage.name}
            axios.post("http://localhost:3000/product",{data:data},{useCredentails: true}).then(function(response){   
             this.$bvModal.hide('update-product');
            location.reload();
        }.bind(this))

        },
        processFile(event) {
            this.pimage = event.target.files[0]
            console.log(this.pimage);
            this.createImage(this.pimage);
        },
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                vm.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        getid(val)
        {
            axios.get("http://localhost:3000/product/"+val,{useCredentails: true}).then(function(response){   
                this.updateproduct = response.data;
                
            }.bind(this))
            
        },
        getiddelete(val){
            if(confirm("Bạn có muốn xóa")){
                // alert('ok')
                axios.post("http://localhost:3000/product/delete",{id:val},{useCredentails:true}).then(function(response){
                
                }.bind(this))
                 location.reload();
            }
        },
         formatPrice(value) {
            let val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
         },
       
    }
}
</script>

<style>

</style>