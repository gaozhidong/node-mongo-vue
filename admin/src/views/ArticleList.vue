<template>
  <div>
  文章列表 
  <el-table :data="items">
    <el-table-column prop="_id" label="ID" width="320"></el-table-column>
    <el-table-column prop="title" label="文章标题"></el-table-column>
    <el-table-column prop="createTime" label="创建时间"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="text" @click="$router.push(`/articles/edit/${scope.row._id}`)">
          编辑
        </el-button>
        <el-button type="text" @click="remove(scope.row)">
          删除
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
        const res =  await this.$http.get('rest/articles')
        this.items = res.data.list
      },
      async remove(row){
        this.$confirm(`是否确认删除文章${row.title}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const res = await this.$http.delete(`rest/articles/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          this.fetch()
        }).catch(() => {})
      }
    },
    created() {
      this.fetch()
    },
  }
</script>

<style>

</style>