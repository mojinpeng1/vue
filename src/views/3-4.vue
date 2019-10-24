<template>
  <div class="home"></div>
</template>

<script>
// 错误处理，请求错误是进行 的处理
import axios from "axios";
export default {
  name: "axios-3-4",
  components: {},
  created() {
    axios.interceptors.request.use(
      config => {
        return config;
      },
      err => {
        return Promise.reject(err);
      }
    );

    axios.interceptors.response.use(
      res => {
        return res;
      },
      err => {
        return Promise.reject(err);
      }
    );

    axios
      .get("/data.json")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    // egg: 实际开发过程中，一般添加统一的处理处理
    let instance = axios.create({});

    instance.interceptors.request.use(
      config => {
        return config;
      },
      err => {
        // 请求错误  一般http状态码以4 开头

        $("#Model").show();
        setTimeout(() => {
          $("#Model").hide();
        }, 2000);

        return Promise.reject(err);
      }
    );

    instance.interceptors.response.use(
      res => {
        return res;
      },
      err => {
        // 响应错误，一般以 5开头   500 ,502
        return Promise.reject(err);
      }
    );
  }
};
</script>
