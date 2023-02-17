import {defineStore} from "pinia";

//导入login登录认证的api接口
import {login,user} from "@/api/auth";

//定义state的数据类型
interface IUserState {
    token: string
    username: string
    avatar_url: string
    permissions: string[]
    info: any
}

//创建useUserStore
export const useUserStore = defineStore({
    id: 'app-user',
    //定义一些用户的状态
    state: (): IUserState => ({
        // 在页面刷新时已经保留token
        //用localStorage拿到本地的token 如果没有就是""
        token: localStorage.getItem("token") || "",
        username: "",
        avatar_url: "",
        permissions: [],
        info: {},
    }),

    getters: { //接收 获取
        getToken(): string {
            return this.token;
        },
        getUserName(): string {
            return this.username;
        },
        getAvatar(): string {
            return this.avatar_url;
        },
        getPermissions(): string[] {
            return this.permissions;
        },
    },

    //状态管理 方法
    actions: {  //当调用setToken时说明已经登录了获取了用户的token
        setToken(token:string) {//()里面的是形参
            //在本地存储token   'token'是创建的名字代表key
            localStorage.setItem('token',token)
            this.token = token;
        },
        setUserName(username: string) {
            this.username = username;
        },
        setAvatar(avatar_url: string) {
            this.avatar_url = avatar_url;
        },
        setPermissions(permissions: string[]) {
            this.permissions = permissions;
        },
        setUserInfo(info: object) {
            this.info = info;
        },

        //异步的登录 方法
        //状态管理的login
        async login(userInfo: object) {
            try {  //                   login是上面导入的 api的
                const response: any = await login(userInfo);
                    //access_token是返回的参数 是token的乱码
                if (response.access_token) {
                    //登录成功后把access_token传给setToken
                    this.setToken(response.access_token);
                    // 登录之后，token已经拿到了，然后getUser获取调用,
                    return await this.getUser();
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getUser() {
            // await useUserStore.getUser()
            try {
                const response: any = await user();
                this.setUserInfo(response);
                this.setAvatar(response.avatar_url);
                this.setUserName(response.name);
                return response;
            } catch (error) {
                    // console.log(error);
            }
        }


    }

});