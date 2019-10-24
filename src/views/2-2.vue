<template>
  <div class="home">
  </div>
</template>

<script>
/**
 *  axios 请求方法： get,post,put,patch,delete
 * 
 *      get: 获取数据
 *      post: 提交数据（表单提交，文件上传）
 *      put:更新数据（所有数据推送到后端）
 *      patch：更新数据（志将修改的数据推送到后端）
 *      delete：删除数据
 */
import axios from 'axios'
export default {
  name: 'axios2-2',
  components: {
  },
  created(){
    // GET请求
      // http:localhost:8080/data.json?id=12
    axios.get('/data.json',{
        params:{
            id:12
        }
    }).then((res)=>{
      console.log(res);
    });

    axios({
        method:'get',
        url:'/data.json',
        params:{
            id:13
        }
    }).then((res) => {
        console.log(res);
    })


    // POST
    // 数据格式  form-data  表单提交（图片上传，文件上传）     
    // application/json   json格式传输
    let data ={
      id:12
    }
    axios.post('/post',data).then(res=>{
      console.log(res);
    })

    axios({
      method:'post',
      url:'/post',
      data:data
    }).then(res =>{
      console.log(res);
    })

    // form-data请求
    let formData = new FormData();
    for(let key in data){
      formData.append(key,data[key])
    }
    axios.post('/post',formData).then(res=>{
      console.log(res);
    })



    // put请求
    axios.put('/put',data).then(res=>{
      console.lot(res);
    })
    // patch请求
    axios.patch('/patch',data).then(res=>{
      console.log(res);
    })

    // delete请求  url 参数
    axios.delete('/delete',{
      params:{
        id:10
      }
    }).then(res=>{
      console.log(res);
    })
    // 请求体参数
    axios.delete('/delete',{
      data:{
        id:10
      }
    }).then(res=>{
      console.log(res);
    })
  }
}
</script>
