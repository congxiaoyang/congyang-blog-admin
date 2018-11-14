<template>
  <div class="container">
    <Breadcrumb>
      <BreadcrumbItem to="/">
        <Icon type="ios-home"></Icon>
        首页
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Icon type="ios-happy"></Icon>
        写博客
      </BreadcrumbItem>
    </Breadcrumb>
    <div class="editor-container">
      <Form ref="blogValid" :model="blogValid" :rules="blogRule">
        <div class="title">
          <FormItem name="title" prop="title">
            <Input type="text" style="border-radius: 0;" id="title" placeholder="标题(20字以内)" v-model="blogValid.title"></Input>
          </FormItem>
          <FormItem name="abstract" prop="abstract">
            <Input v-model="blogValid.abstract" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="摘要(200字以内)"></Input>
          </FormItem>
        </div>
        <div class="content">
          <mavon-editor v-model="blogValue" @save="blogSave"/>
        </div>
        <div class="btn-group btn-group-right clearfix">
          <Button type="primary" :loading="publishLoading" @click="handlePublish('blogValid')">发布</Button>
          <Button type="default" :loading="saveLoading" @click="handleSave('blogValid')">保存</Button>
        </div>
      </Form>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'BlogWrite',
    data() {
      return {
        blogValue: '请...开始你的表演...',
        publishLoading:false,
        saveLoading:false,
        blogValid: {
          title: '',
          abstract:''
        },
        blogRule:{
          title:[
            {required:true,trigger:'blur',message:'标题不能为空'},
            {type:'string',max:20,trigger:'blur',message:'标题不能大于20字符'}
            ],
          abstract:[
            {required:true,trigger:'blur',message:'摘要不能为空'},
            {type:'string',max:200,trigger:'blur',message:'摘要不能大于200字'}
            ]
        }
      }
    },
    methods: {
      blogSave() {

      },
      handlePublish(name){
        var _this = this;
        this.$refs[name].validate((valid)=> {
          if(valid){
            _this.publishLoading = true;
            _this.$http.post('/api/setBlog',_this.$qs.stringify({
              title: _this.blogValid.title,
              content: _this.blogValue,
              abstract: _this.blogValid.abstract,
              author:'从洋',
              publish_date:_this.getNowFormatDate(),
            }))
              .then((res)=>{
                _this.publishLoading = false;
                var res = res.data;
                if(res.status == 'ok'){
                  _this.$Message.success(res.msg);
                }else{
                  _this.$Message.error(res.msg);
                }
              })
          }else{
            this.$Message.error('请填写完整')
          }
        })
      },
      handleSave(name){

      }
    },
    mounted(){
      console.log(this.getNowFormatDate())
    }
  }
</script>

<style lang="">
  .title .ivu-input{
    border-radius: 0;
    height: 50px;
    font-size: 14px;
  }
  /* markdown样式 */
  .editor-container .v-note-wrapper{
    border: 1px solid #dcdee2;
  }
  .editor-container .v-note-wrapper .v-note-op.shadow{
    box-shadow: none;
    border-bottom: 1px solid #dcdee2;
  }
  .editor-container .v-note-wrapper .v-note-panel.shadow{
    box-shadow: none;
  }
  .content .v-note-wrapper{
    z-index: 50;
  }
</style>
