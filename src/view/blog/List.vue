<template>
  <div>
    <div class="container">
      <Breadcrumb>
        <BreadcrumbItem to="/">
          <Icon type="ios-home"></Icon>
          首页
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Icon type="ios-happy"></Icon>
          博客列表
        </BreadcrumbItem>
      </Breadcrumb>

      <div class="content">

        <Table :columns="blogListColumns" :data="blogListData"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="blogTotal" :current="blogCurrentPage" :page-size="blogPageSize"
                  @on-change="changePage"></Page>
          </div>
        </div>
      </div>
      <Modal
        v-model="deleteBlogModal"
        title="提示"
        @on-ok='deleteBlogConfirm'
        @on-cancel="deleteBlogCancel">
        <p>你确定要删除么？文章标题是：{{deleteBlogTitle}}</p>
      </Modal>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'BlogList',
    data() {
      return {
        blogListColumns: [
          {title: '标题', key: 'title'},
          {title: '摘要', key: 'abstract'},
          {title: '作者', key: 'author'},
          // {title:'内容',key:'content'},
          {title: '时间', key: 'publish_date'},
          {title: '浏览量', key: 'pageView'},
          {
            title: '操作', key: 'operate', align: 'center', render: (h, params) => {
              //params 返回当前行的数据 row：当前行的键值 columns：当前列参数 index：索引
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.removeBlog(params.row.id,params.row.title);
                    }
                  }
                }, '删除'),
                h('Button', {
                  props: {
                    type: 'default',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                    }
                  }
                }, '设为草稿')
              ])
            }
          },
        ],
        blogListData: [],
        blogTotal: 0,
        blogCurrentPage: 1,
        blogPageSize: 10,
        deleteBlogModal:false,
        deleteBlogTitle:'',
        deleteBlogId:'',
      }
    },
    methods: {
      changePage(currentPage) { //参数是返回的当前页数
        this.getBlogs(currentPage);
      },
      getBlogs(page) {
        var _this = this;
        this.$http.get('/api/getBlogs', {params: {page: page, size: _this.blogPageSize}})
          .then((res) => {
            var res = res.data;
            if (res.status == 'ok') {
              _this.blogListData = res.data;
              _this.blogTotal = res.total;
            }
          })
      },
      removeBlog(id,title){
        this.deleteBlogModal = true;
        this.deleteBlogId = id;
        this.deleteBlogTitle = title

      },
      deleteBlogConfirm(id){
        var _this = this;
        this.$http.post('/api/removeBlog', _this.$qs.stringify({
          id:_this.deleteBlogId
        }))
          .then((res) => {
            console.log(res.data);
            if(res.data.status == 'ok'){
              _this.$Message.success(res.data.msg);
              _this.getBlogs(this.blogCurrentPage);
            }else{

            }
          })
      },
      deleteBlogCancel(){

      }
    },
    mounted() {
      this.getBlogs(this.blogCurrentPage);
    }
  }
</script>

<style lang="" scoped>

</style>
