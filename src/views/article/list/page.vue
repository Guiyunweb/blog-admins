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
          <el-tag v-for="item in scope.tags">{}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="发布时间">
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
        console.log('list', this.tableData)
      })
    }
  }

}
</script>

<style>

</style>
