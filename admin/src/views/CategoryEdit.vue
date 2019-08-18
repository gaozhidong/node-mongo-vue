<template>
  <div>
    <h2>{{ id ? '编辑' : '创建' }}分类</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级名称">
          <el-select v-model="model.parent" placeholder="请选择">
            <el-option
              v-for="item in parents"
              :key="item._id"
              :label="item.name"
              :value="item._id">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parents: [],
    };
  },
  methods: {
    async save() {
      /* eslint-disable */
      let res;

      if (this.id) {
        res = await this.$http.put(`categories/${this.id}`, this.model);
      } else {
        res = await this.$http.post("categories", this.model);
      }

      // console.log(res);
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "提交成功了"
      });
    },
    async fetch() {
      const res = await this.$http.get(`categories/${this.id}`);
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get(`categories`);
      this.parents = res.data;
    }
  },
  created() {
    this.fetchParents();
    this.id && this.fetch();
  }
};
</script>

<style>
</style>