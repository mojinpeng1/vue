import axios from 'axios';
import { Toast } from 'vant';
import service from './Total';

// service 循环遍历输出不同的请求方法
let instance = axios.create({
    baseURL: 'http://localhost:9000/api',
    timeout: 1000
})
const Http = {};    // 包裹请求方法的容器


// 请求格式/参数的统一
for (let key in service) {
    let api = service[key];
    // async 作用： 避免进入回调地狱
    Http[key] = async function (
        params,// 请求参数  get: url   put,post,patch:data   delete:url
        isFormData,// 标识是否是form-data请求
        config = {}  // 配置参数
    ) {
       
        let newParams = {};
        // content-type 是否是form-data的判断
        if (params && isFormData) {
            newParams = new FormData();
            for (let param in params) {
                newParams.append(param, params[param]);
            }
        } else {
            newParams = params;
        }

        // 不同请求的判断
        let response = null;         // 请求的返回值
        if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
            try {
                response = await instance[api.method](api.url, newParams, config);
            } catch (err) {
                response = err;
            }
        }else if(api.method === 'delete' || api.method === 'get'){
            // 路径传递参数
            config.params= newParams;
            try {
                response = await instance[api.method](api.url, config);
            } catch (err) {
                response = err;
            }
        }
        return response;
    }
}


// 拦截器的添加
instance.interceptors.request.use(config=>{
    // 请求前
    Toast.loading({
        mask:false,// 阴影
        duration:0, // 一直存在
        focus:true,// 禁止点击
        message:'加载中...'
    })
    console.log(config);
    return config;
},()=>{
    // 请求错误
    Toast.clear();
    Toast('请求错误，请稍后重试！');

})

instance.interceptors.response.use(res=>{
    // 请求成功
    Toast.clear();
    return res.data;
},
()=>{
    Toast.clear();
    Toast("服务器错误....")

})

export default Http;