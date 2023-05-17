import axios from 'axios'
import qs from 'qs'
import { showLoadingToast, closeToast } from 'vant'
import 'vant/es/toast/style'

const instance = axios.create()  // 创建axios实例

interface Response{
    code: number;
    msg: string;
    data?: any;
}

// 响应拦截器， 一旦获取到响应数据，将自动调用function
instance.interceptors.response.use(function(resp){
    // 关闭等待窗
    closeToast()
    return resp
})

const myaxios = {
    /** 用于发送get请求 
     *  url: 请求资源路径  
     *  params: 请求参数（Object形式）
     */
    get(url:string, params?:object):Promise<Response>{
        // 弹出等待提示框
        showLoadingToast({
            message: '加载中...',
            forbidClick: true,
            duration: 0
        })
        return instance({
            url, 
            method: 'get',
            params
        })
    },

    /**
     * 用于发送post请求
     * @param {String} url   请求资源路径
     * @param {Object} params   请求参数（对象类型）
     * @returns Promise<Response>
     */
    post(url:string, params?:object):Promise<Response>{
        return instance({
            url,
            method: 'post',
            data: qs.stringify(params)
        })
    }
}

export default myaxios