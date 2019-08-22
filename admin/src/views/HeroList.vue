<template>
  <div>
  英雄列表 
  <el-table :data="heroes">
    <el-table-column prop="_id" label="ID" width="320"></el-table-column>
    <el-table-column prop="name" label="物品名称"></el-table-column>
    <el-table-column prop="avatar" label="头像">
      <template slot-scope="scope">
        <img :src="scope.row.avatar" style="height:3rem">
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="text" @click="$router.push(`/heroes/edit/${scope.row._id}`)">
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
        heroes:[],
      }
    },
    methods: {
      async fetch(){
        const res =  await this.$http.get('rest/heroes')
        this.heroes = res.data
      },
      async remove(row){
        this.$confirm(`是否确认删除分类${row.name}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const res = await this.$http.delete(`rest/heroes/${row._id}`)
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