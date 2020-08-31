<template>
   <div class="row">
        <div class="col-md-12">
            <h3 class="table-title">Danh mục sản phẩm</h3>
            <div class="col-md-12 mb-2">
                <div class="table-data__tool-right">
                        <button class="au-btn au-btn-icon au-btn--green au-btn--small" v-b-modal.add-type>
                            <i class="zmdi zmdi-plus"></i>Thêm loại sản phẩm</button>
                            <b-modal id="add-type" title="Thêm loại sản phẩm">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-sm">
                                            <div class="card">
                                                <div class="card-body">
                                                    <form >
                                                        <div class="form-group">
                                                            <label for="cc-payment"  class="control-label mb-1">Tên loại sản phẩm</label>
                                                            <input v-model="additem" class="form-control" aria-required="true" aria-invalid="false" >
                                                        </div>
                                                    </form>
                                                </div>
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                               
                            <template v-slot:modal-footer>
                                <b-button class="mt-3 " @click="$bvModal.hide('add-type')">Đóng</b-button>
                                <b-button class="mt-3 btn-success" @click="submit">Lưu</b-button>
                             </template>
                            </b-modal>

                    </div>
                </div>
            <!-- DATA TABLE-->
            <div class="table-responsive m-b-40">
                <table class="table table-borderless table-data3" >
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr  v-for="val in listtype" :key="val.tp_id">
                            <td > {{val.tp_id}} </td>
                            <td > {{val.tp_name}} </td>
                            <td>
                                <a class="btn btn-warning" v-b-modal.edit @click="gettypeid(val.tp_id)">Sửa</a>
                                <a class="btn btn-danger" @click="delete_p(val.tp_id)">Xóa</a>
                            </td>
                        </tr>
                       
                    </tbody>
                </table>
            </div>
            <!-- END DATA TABLE-->
        </div>
          <b-modal id="edit" title="Sửa loại sản phẩm">
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                        <div class="card">
                            <div class="card-body">
                                <form >
                                    <div class="form-group">
                                        <label for="cc-payment"  class="control-label mb-1">Tên loại sản phẩm củ</label>
                                        <input v-for="vl in listupdate" :key="vl.tp_id" :value="vl.tp_name" readonly  class="form-control" aria-required="true" aria-invalid="false" >
                                        <label for="cc-payment"  class="control-label mb-1">Nhập loại sản phẩm mới</label>
                                        <input v-model="updateitem" class="form-control" aria-required="true" aria-invalid="false" >
                                    </div>
                                </form>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        <template v-slot:modal-footer>
            <b-button class="mt-3 " @click="$bvModal.hide('edit')" >Đóng</b-button>
            <b-button class="mt-3 btn-success" @click="update_p()">Cập nhật</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            listtype:[],
            id:'',
            additem:'',
            listupdate:[],
            updateitem:''
        }
    },
    mounted(){
       axios.get("http://localhost:3000/type", { useCredentails: true })
              .then(function(response) {
                  
                //   console.log(response);
                this.listtype = response.data
               }.bind(this))
    },
    methods:{
        submit(){

            // let additem=this.additem 
            // console.log( additem);
            axios.post("http://localhost:3000/type",{additem:this.additem},{useCredentails:true}).then(function(response){
                console.log(response);
                this.$bvModal.hide('add-type');
                 location.reload();
            }.bind(this))
        },
        gettypeid(val){
            
            this.id=val;
            axios.get("http://localhost:3000/type/"+val, { useCredentails: true })
              .then(function(response) {
                  
                //   console.log(response.data);
                this.listupdate = response.data
               }.bind(this))
        },
        update_p() {

            axios.post("http://localhost:3000/type/update",{id:this.id,updateitem:this.updateitem},{useCredentails:true}).then(function(response){
                console.log(response.data);
                csrf
            }.bind(this))
            // console.log(this.id);
             this.$bvModal.hide('edit');
              location.reload();
        },
        delete_p(val){
            if(confirm("Bạn có muốn xóa")){
                // alert('ok')
                axios.post("http://localhost:3000/type/delete",{id:val},{useCredentails:true}).then(function(response){
                
                }.bind(this))
                 location.reload();
            }
           
        }
    },
   
}
</script>

<style>
h3.table-title {
    /* margin: 10px 0; */
    text-align: center;
    font-size: 30px;
}
</style>