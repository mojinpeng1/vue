<template>
  <div class="home">
  </div>
</template>

<script>
// axios 配置参数
import axios from 'axios'
export default {
  name: 'home',
  components: {
  },
  created(){
      axios.create({
          baseURL:'',// 请求的域名，  基本的请求地址
          timeout:1000, // 请求超时时长 （ms)
          url:'/data.json', // 请求路径
          method:'get,post,put,patch,patch',      // 请求方法
          headers:{
              token:''
          },        //请求头
          params:{},        // 请求参数拼接到url中
          data:{},          // 请求参数放在请求体中
      })

      // 配置位置
      // 1. axios 全局配置
      axios.defaults.timeout = 1000;
      axios.defaults.baseURL = 'http://localhost:8080'
      // 2. axios 实列配置
      let instance = axios.create({

      })
      instance.defaults.timeout = 3000;
      

      // 3. axios 请求配置
      instance.get('/data.json',{
          timeout:2000
      })

      // 优先级    请求配置> 实例配置> 全局配置


      // 实际开发
      // eg: 有两种请求接口  http://localhost:8080    http://localhost:9090
      let instance = axios.create({
          baseURL:'http://localhost:8080',
          timeout:1000,

      })
      let instance1 = axios.create({
          baseURL:'http://localhost:9091',
          timeout:3000,
      })
      // baseurl timeout url  method
      instance.get('/contactList').then(res =>{
          console.log(res);
      })

      instance.get('/orderList',{
          timeout:5000
      }).then(res=>{
          console.lot(res);
      })
  }
}
</script>
