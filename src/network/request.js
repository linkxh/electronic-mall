import axios from "axios";

export function request(config){//不用default，为了不止暴露一个
    //1.创建axios实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })

    //2.axios拦截器
    //2.1请求拦截的作用
    instance.interceptors.request.use(config => {
        //1.比如config中一些信息不符合服务器的要求
        //2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
        //3.某些网络请求（比如登录（token）），必须携带一些特殊信息
        return config
    }, error => {
        console.log(error)
    })

    //2.2响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, error => {
        console.log(error);
    })

    //发送真正的网络请求
    //axios本身返回值就是一个Promise直接返回就行
    return instance(config)
}