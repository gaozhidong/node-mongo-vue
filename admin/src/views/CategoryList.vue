<template>
  <div>
  分类列表 
  <el-table :data="items">
    <el-table-column prop="_id" label="ID" width="320"></el-table-column>
    <el-table-column prop="name" label="分类名称"></el-table-column>
    <el-table-column prop="createTime" label="创建时间"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="text" @click="$router.push(`/categories/edit/${scope.row._id}`)">
            操作
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        items:[],
      }
    },
    methods: {
      async fetch(){
        const res =  await this.$http.get('categories')
        this.items = res.data
      }
      
    },
    created() {
      this.fetch()
    },
  }
</script>

<style>

</style>