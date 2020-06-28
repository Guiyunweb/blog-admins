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
            <el-popover
              placement="top"
              width="160"
              v-model="visible">
              <p>这是否删除该文章？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini"  @click="del(scope.row.id)">确定</el-button>
              </div>
              <el-button slot="reference" type="text" style="color: red;margin: 10px;">删除</el-button>
            </el-popover>
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
      tableData: [],
      visible: false
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
      this.visible = false
      api.DEL({ id }).then(res => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success'
        })
        this.getList()
      })
    }
  }

}
</script>

<style>

</style>
