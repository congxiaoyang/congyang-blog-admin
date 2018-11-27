<template>
  <div class="container">
    <Breadcrumb>
      <BreadcrumbItem to="/">
        <Icon type="ios-home"></Icon>
        首页
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Icon type="ios-happy"></Icon>
        个人信息
      </BreadcrumbItem>
    </Breadcrumb>
    <div class="my-card">
      <div class="title">个人信息填写</div>
      <div class="info-container">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
          <FormItem label="姓名" prop="name">
            <Input type="text" v-model="formCustom.name"></Input>
          </FormItem>
          <FormItem label="介绍" prop="intro">
            <Input type="text" v-model="formCustom.intro"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
            <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Info",
    data() {
      return {
        formCustom: {
          name: '',
          intro: '',
        },
        ruleCustom: {
          name: [
            {required: true, trigger: 'blur', message: '请填写姓名'}
          ],
          intro: [
            {required: true, trigger: 'blur', message: '请填写简介'}
          ]
        }
      }
    },
    methods: {

      handleSubmit(name) {
          this.$refs[name].validate((valid) => {
          if (valid) { // 通过验证
            var vm = this;
            this.$http.post(process.env.API_HOST+'changeInfo',vm.$qs.stringify({
              name: vm.formCustom.name,
              intro: vm.formCustom.intro
            }))
              .then((res) => {
                var res = res.data;
                if(res.status == 'ok'){
                  vm.$Message.success(res.msg);
                }
              })

          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    },
    mounted:function () {
      this.$http.get(process.env.API_HOST+'getInfo',{params:{id:0}})
        .then((res)=>{
           var res = res.data;
           this.formCustom.name = res[0].name;
           this.formCustom.intro = res[0].intro;
        })
    }
  }
</script>

<style scoped>
  .info-container {
    width: 80%;
    margin: 0 auto;
    padding: 20px 0;
  }
</style>
