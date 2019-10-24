<template>
  <div class="home">
      <!-- 联系人列表 -->
        <van-contact-list
            :list="list"
            @add="onAdd"
            @edit="onEdit"
        />
        <van-popup v-model="showEdit" position="bottom">
          <van-contact-edit
            :contact-info="editingContact"
            :is-edit="isEdit"
            @save="onSave"
            @delete="onDelete"
        />
        </van-popup>
  </div>
</template>

<script>
// @ is an alias to /src
import {  ContactList,Toast,ContactEdit,Popup } from 'vant';
import axios from 'axios';
export default {
  name: 'ContactList',
  components: {
      [ContactList.name]:ContactList,
      [Toast.name]:Toast,
      [ContactEdit.name]:ContactEdit,
      [Popup.name]:Popup
  },
  created(){
      this.instance = axios.create({
          baseURL:'http://localhost:9000/api',
          timeout:1000
      })
      this.getList();
  },
  data(){
      return{
        //   {s
        //       id:1,
        //       name:'ass',
        //       tel:''
        //   }
          list:[],
          instance:null,  // axios实例
          showEdit:false,   // 编辑弹窗显示
          editingContact:{},  //正在编辑的联系人
          isEdit:false,     // 新建or编辑

      }
  },
  methods:{
      // 添加联系人
      onAdd(){
          this.showEdit=true;
          this.isEdit=false;
      },
      // 编辑联系人
      onEdit(info){
          this.showEdit=true;
          this.isEdit=true;
          this.editingContact=info;

      },
      // 保存
      onSave(info){
          if(this.isEdit){
              // 编辑保存 
             this.instance.put('/contact/edit',info).then(res=>{
                 if(res.data.code===200){
                      Toast('编辑成功');
                      this.showEdit=false;
                      this.getList();
                 }
             })
          }else{
              // 新建保存
              this.instance.post('/contact/new/json',info).then(
                  res=>{
                      if(res.data.code === 200){
                      Toast('新建成功');
                      this.showEdit=false;
                      this.getList();
                      }
                  }
              ).catch(err=>{
                  Toast('请求失败，请稍后重试')
                  console.log(err);
              })
          }


      },
      // 删除
      onDelete(info){
          this.instance.delete('/contact',{
              params:{
                  id:info.id
              }
          }).then(res=>{
              if(res.data.code=== 200){
                  Toast('删除成功');
                  this.showEdit=false;
                  this.getList();
              }
          }).catch(err=>{
              console.log(err);
              Toast('请求失败');
          })

      },

      getList(){


      this.instance.get('/contactList').then(res=>{
          console.log(res.data)
          this.list=res.data.data
      }).catch(err=>{
            console.log(err);
            
          Toast('请求失败，请稍后重试！');
      })
      }
  }
}
</script>


<style scoped>
    .van-contact-list_add{
        z-index: 0;
    }
    .van-popup{
        height: 100%;
    }
</style>