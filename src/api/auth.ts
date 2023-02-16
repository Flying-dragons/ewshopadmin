
//导入网络封装的request请求
import request from "@/utils/request";

//登录的接口 认证登录的api 获取登录的数据
export function login(data: object){
    return request({
        url: '/api/auth/login',
        method: 'post',
        data
    });
}