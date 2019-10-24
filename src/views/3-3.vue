<template>
  <div class="home">
  </div>
</template>

<script>
// 拦截器： 在请求或响应被处理前拦截它们
// 请求拦截器

// 响应拦截器
import axios from 'axios'
import { reject } from 'q';
export default {
  name: 'axios3-3',
  components: {
  },
  created(){
      // 请求拦截器
      axios.interceptors.request.use(config=>{
          // 在发送请求前做些东西
          console.log('请求前拦截');
          return config;
      },err=>{
          // 在请求错误时候做什么
          return Promise.reject(err);
      })


      // 响应拦截器
      axios.interceptors.response.use(res=>{
          // 请求成功回调函数
          console.log(res);
          return res;
      },
      err=>{
          // 响应错误，回调函数
          return Promise.reject(err);
      })


      // 取消拦截器
      let interceptors = axios.interceptors.request.use(config=>{
          config.headers={
              auth:true
          }
          return config;
      })
      axios.interceptors.request.eject(interceptors);



      // eg: 实际开发   登录状态（token:'')

      let instance=axios.create({});
      instance.interceptors.request.use(
          config=>{
              config.headers.token = '';
              return config;
          }
      )

      let newInstance = axios.create({})
  }
}
</script>
