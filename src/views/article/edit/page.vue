<template>
  <d2-container>
    <template slot="footer">
      <div style="float: right;">
        <el-button size="small" @click="save(false)" type="danger">保存草稿</el-button>
        <el-button size="small" type="info">预览</el-button>
        <el-button size="small" type="primary">发布</el-button>
      </div>
    </template>
    <el-form>
      <el-form-item>
      <el-input v-model="article.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item>
        <d2-mde
        v-model="article.content"
        class="mde"/>
      </el-form-item>
    </el-form>
  </d2-container>
</template>

<script>
import api from '@/api'
export default {
  name: 'edit',
  data () {
    return {
      article: {
        title: null,
        content: null,
        isRelease: false
      }
    }
  },
  methods: {
    save (isRelease) {
      this.article.isRelease = isRelease
      api.SAVE_ARTICLE(this.article).then(res => {
        console.log(res)
        if (res.success) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>
