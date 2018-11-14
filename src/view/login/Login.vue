<template>
   <div class="login-main">

     <div class="login-card-container">
       <h3>congyang博客管理后台</h3>
       <Form ref="loginValid" :model="loginValid" :rules="loginRules">
         <FormItem prop="username">
           <Input type="text" v-model="loginValid.username" placeholder="用户名">
           <Icon type="ios-person-outline" slot="prepend" size="22"></Icon>
           </Input>
         </FormItem>
         <FormItem prop="pwd">
           <Input type="password" v-model="loginValid.pwd" placeholder="密码">
           <Icon type="ios-lock-outline" slot="prepend" size="22"></Icon>
           </Input>
         </FormItem>
         <FormItem>
           <Button type="primary" :loading="loginBtnLoading" @click="handleSubmit('loginValid')" long>登录</Button>
         </FormItem>
       </Form>
     </div>
   </div>
</template>

<script>
    export default {
        name: "Login",
      data(){
          return{
            loginValid:{
              username:'',
              pwd:''
            },
            loginRules:{
              username:[
                {required:true,trigger:'blur',message:'用户名不能为空'},
              ],
              pwd:[
                {required:true,trigger:'blur',message:'密码不能为空'}
              ]
            },
            loginBtnLoading:false
          }
      },
      methods:{
        handleSubmit(loginValid){
          var _this = this;
          this.$refs[loginValid].validate((valid => {
            if(valid){
              this.loginBtnLoading = true;
              _this.$http.post('/api/login',_this.$qs.stringify({
                username: _this.loginValid.username,
                pwd:_this.loginValid.pwd
              }))
                .then((res)=>{
                  _this.loginBtnLoading = false;
                   if(res.data.status == 'ok'){
                     _this.$router.push({path:'/main/home'})
                   }else{
                     _this.$Message.error(res.data.msg)
                   }
                })
                // .catch(function (error) {
                //   _this.loginBtnLoading = false;
                //   console.log(error);
                //   if (error.response) {
                //     // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                //      _this.$Message.error(error.message)
                //   } else {
                //     // Something happened in setting up the request that triggered an Error
                //     _this.$Message.error( error.message);
                //   }
                //   console.log(error.config);
                // });
            }
          }))
        }
      }
    }
</script>

<style scoped>
  .login-card-container{
    width: 90%;
    max-width: 460px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    background-color: #fff;
    padding: 30px 30px 0 30px;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.08);
  }
  .login-card-container>h3{
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
  }
</style>
