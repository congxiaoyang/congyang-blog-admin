<template>
    <!-- <Row>  -->
        <!-- <Col> -->
        <div class="sideMenu">
            <Menu :theme="theme2" :open-names="['1']" accordion>
                <MenuItem name="index">
                  <Icon type="ios-home" size="18" />
                  首页
                </MenuItem>
                <MenuItem name="info">
                  <Icon type="ios-happy" size="18" />
                个人信息
                </MenuItem>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-paper" size="18" />
                        博客
                    </template>
                    <MenuItem name="2-1" to="/blog/write">写博客</MenuItem>
                    <MenuItem name="2-2" to="/blog/list">列表</MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="md-document" size="18" />
                        随记
                    </template>
                    <MenuItem name="3-1">写随记</MenuItem>
                    <MenuItem name="3-2">列表</MenuItem>
                </Submenu>

            </Menu>
        </div>
        <!-- </Col> -->
    <!-- </Row> -->
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  }
};
</script>

<style lang="" scoped>
</style>
