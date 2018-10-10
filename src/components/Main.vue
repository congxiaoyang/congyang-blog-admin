<template>
  <div>
    <div class="header">
      <h2 class="title">congyang-blog管理后台</h2>
    </div>
    <div class="sideMenu">
      <Menu class="sideMenu-ul" :open-names="openMenu" :theme="menuTheme" :active-name="menu_selected" accordion>
        <MenuItem name="Index" to="/">
          <Icon type="ios-home" size="18" />
          首页
        </MenuItem>
        <MenuItem name="Info" to="/info">
          <Icon type="ios-happy" size="18" />
          个人信息
        </MenuItem>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-paper" size="18" />
            博客
          </template>
          <MenuItem name="BlogWrite" to="/blog/write">写博客</MenuItem>
          <MenuItem name="BlogList" to="/blog/list">列表</MenuItem>
        </Submenu>
        <Submenu name="4">
          <template slot="title">
            <Icon type="md-document" size="18" />
            随记
          </template>
          <MenuItem name="4-1">写随记</MenuItem>
          <MenuItem name="4-2">列表</MenuItem>
        </Submenu>

      </Menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Index from '@/view/index/Index'
  export default {
    name: 'Main',
    data() {
      return {
        menuTheme:'dark',
        menu_selected: 'Index',
        openMenu:[]
      }
    },
    mounted(){
      console.log(this.$route.name);
      this.menu_selected = this.$route.name;

    },
    methods:{
      // select(n){
      //   // console.log(n); // name 的值
      //   this.menu_selected = n;
      //   var subMenu = '';
      //   if(n.indexOf('-')!=-1){
      //     subMenu = n.split('-')[0];
      //     this.openMenu.push(subMenu);
      //   }
      // }
    }
  }
</script>

<style lang="" scoped>
  .header{
    height: 60px;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
  }
  .header .title{
    line-height: 60px;
    padding: 0 20px;
  }

  .sideMenu{
    height: 100%;
  }
  .sideMenu-ul{
    height: 100%;
  }
</style>
