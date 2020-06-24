<template>
  <d2-container>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <span v-if="scope.release">已发布</span>
          <span v-else>未发布</span>
        </template>
      </el-table-column>
      <el-table-column
        label="标签">
        <template slot-scope="scope">
          <el-tag style="margin: 2px;" v-for="item in scope.row.tags" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="access"
        label="访问">
      </el-table-column>
      <el-table-column
        label="设置">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="edit(scope.row.id)">编辑</el-button>
            <el-button type="text" style="color: red" @click="del(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </d2-container>
</template>

<script>
import api from '@/api'
export default {
  name: 'articleList',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      api.GET_LIST({ page: 0, size: 10 }).then(res => {
        this.tableData = res.data.content
      })
    },
    edit (id) {
      this.$router.push({ path: 'edit', query: { id } })
    },
    del (id) {

    }
  }

}
</script>

<style>

</style>
