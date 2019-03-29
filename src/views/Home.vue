<template>
  <div class="home">
    <router-link :to="{ name: 'edit_table' }" tag="Button">可编辑表格组件</router-link>
    <router-link :to="{ name: 'form' }" tag="Button" type="primary">表单组件</router-link>
  </div>
</template>

<script>
export default {
  //
}
</script>

<style lang="less" scoped>
.home {
  padding: 50px;
  width: 400px;
  margin: auto;
  display: flex;
  justify-content: space-between;
}
</style>
