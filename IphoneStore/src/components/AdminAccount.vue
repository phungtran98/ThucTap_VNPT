<template>
  
 <div class="row">
    <div class="col-sm-12">
        <h3>Quản lý tài khoản</h3>
        <button class="au-btn au-btn-icon au-btn--green au-btn--smal float-right" v-b-modal.add-user>
                        <i class="zmdi zmdi-plus"></i>Thêm tài khoản</button>
    </div>
    <div class="col-md-4 mt-4" v-for="val in listusers" :key="val.u_id">
        <div class="card">
            <div class="card-header">
                <strong class="card-title mb-3">Thông tin cá nhân</strong>
            </div>
            <div class="card-body">
                <div class="mx-auto d-block">
                    <img style="width:100px; height: 100px;" class="rounded-circle mx-auto d-block" v-bind:src="require('./../assets/img/avatar/'+val.u_avatar)" alt="Card image cap">
                    <h5 class="text-sm-center mt-2 mb-1">{{val.u_name}}</h5>
                    <div class="location text-sm-center"><i class="fas fa-phone"></i> 
                     {{val.u_phone}}
                    </div>
                    <div class="location text-sm-center"><i class="fas fa-envelope"></i>
                     {{val.u_email}}
                    </div>
                </div>
                <hr>
                <div class="card-text text-sm-center">
                    <button class="btn btn-warning">Cập nhật</button>
                    <button class="btn btn-danger" @click="deleteAc(val.u_id)">Xóa tài khoản</button>
                </div>
            </div>
        </div>
    </div>



   <b-modal id="add-user" size="lg" title="Thêm tài khoản">
    <div class="contianer">
        <div class="row">
             <img :src="image" style="width: 125px;height: 125px;border-radius: 50%;margin: 10px auto;"/>
        </div>
        <div class="row form-group">
            <div class="col col-md-3">
                <label for="text-input" class=" form-control-label">Hình ảnh</label>
            </div>
            <div class="col-12 col-md-9">
                <input type="file" class="form-control" @change="processFile($event)">
            </div>
        </div>
        <div class="row form-group">
            <div class="col col-md-3">
                <label for="text-input" class=" form-control-label">Họ tên</label>
            </div>
            <div class="col-12 col-md-9">
                <input type="text" v-model="uname" class="form-control">
            </div>
        </div>
        <div class="row form-group">
            <div class="col col-md-3">
                <label for="text-input" class=" form-control-label">Số điện thoại</label>
            </div>
            <div class="col-12 col-md-9">
                <input type="text" v-model="uphone" class="form-control">
            </div>
        </div>
        <div class="row form-group">
            <div class="col col-md-3">
                <label for="email-input" class=" form-control-label">Email</label>
            </div>
            <div class="col-12 col-md-9">
                <input type="text" v-model="umail" class="form-control">
            </div>
        </div>
        <div class="row form-group">
            <div class="col col-md-3">
                <label for="text-input" class=" form-control-label">Địa chỉ</label>
            </div>
            <div class="col-12 col-md-9">
                <input type="text" v-model="address" class="form-control">
            </div>
        </div>
        <div class="row form-group">
            <div class="col col-md-3">
                <label for="text-input" class=" form-control-label">Tài khoản</label>
            </div>
            <div class="col-12 col-md-9">
                <input type="text" v-model="user" class="form-control">
            </div>
        </div>
        <div class="row form-group">
            <div class="col col-md-3">
                <label for="password-input" class=" form-control-label">Mật khẩu</label>
            </div>
            <div class="col-12 col-md-9">
                <input type="password" v-model="pass" placeholder="Password" class="form-control">
            </div>
        </div>
        <div class="row form-group">
            <div class="col col-md-3">
                <label for="password-input"  class=" form-control-label">Nhập lại mật khẩu</label>
            </div>
            <div class="col-12 col-md-9">
                <input type="password" :state="false" v-model="repass" placeholder="Password" class="form-control" :class="{'is-valid':check1, 'is-invalid':check2}" @change="checkpass">
            </div>
        </div>
    </div>
      <template v-slot:modal-footer>
        <b-button class="mt-3 " @click="$bvModal.hide('add-user')">Đóng</b-button>
        <b-button class="mt-3 btn-success" @click="submit">Lưu</b-button>
    </template>   
  </b-modal>
</div>
</template>

<script>
import axios from 'axios'
export default {
data() {
    return {
        listusers:[],
        address:'',
        uimage:[],
        uphone:'',
        uname:'',
        umail:'',
        user:'',
        pass:'',
        repass:'',
        image:'https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png',
        check1:false,
        check2:false,

    }
},
created(){
    axios.get("http://localhost:3000/users").then(function(response){
      this.listusers= response.data;
      
        
    }.bind(this))
},
methods:{
    processFile(event) {
        this.uimage = event.target.files[0]
        // console.log(this.uimage);
        this.createImage(this.uimage);
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
    checkpass(){
        if(this.pass == this.repass){
            this.check1=true
            this.check2=false
        }
        else{
            this.check2=true
            this.check1=false
        }
    },
    submit(){
        if(this.check1)
        {
            this.data={"u_name":this.uname,"u_address":this.address,"u_phone":this.uphone,"u_avatar":this.uimage.name,"u_username":this.user,"u_password":this.pass,"u_email":this.umail};
           axios.post("http://localhost:3000/users",{data:this.data},{useCredentails: true}).then(function(respone){
               console.log(respone);
               
           }.bind(this));
           this.$bvModal.hide('add-user');
           location.reload();
        }
        else{
            alert('Erorr')
        }
    },
    deleteAc(val){
       if(confirm("Bạn có muốn xóa")){
                // alert('ok')
                axios.post("http://localhost:3000/users/delete",{id:val},{useCredentails:true}).then(function(response){
                
                }.bind(this))
                location.reload();
            }
    }
}
}
</script>

<style>

</style>