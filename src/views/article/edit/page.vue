<template>
  <d2-container>
    <template slot="footer">
      <div style="float: right;">
        <el-button size="small" @click="save(false)" type="danger">保存草稿</el-button>
        <el-button size="small" type="info">预览</el-button>
        <el-button size="small" @click="drawer = true" type="primary">发布</el-button>
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
    <el-drawer
      title="文章设置"
      :visible.sync="drawer"
      >
      <el-form label-position="top" style="margin: 15px">
        <el-form-item label="标题">
          <el-input />
        </el-form-item>
        <el-form-item label="缩略图">
          <el-upload
            drag
            style="width: 100%"
            name="file"
            :data="{output:'json',scene:'image'}"
            :on-success="handleAvatarSuccess"
            action="http://47.100.105.136:8080/group1/upload"
            multiple>
            <div v-if="!thumbnail">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </div>
            <div v-else>
              <img :src="'http://47.100.105.136:8080'+thumbnail" />
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-drawer>
  </d2-container>
</template>

<script>
import api from '@/api'
export default {
  name: 'edit',
  data () {
    return {
      drawer: false,
      article: {
        title: null,
        content: null,
        isRelease: false,
        thumbnail: null
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
    },
    handleAvatarSuccess (res, file) {
      this.thumbnail = res.path
    }
  }
}
</script>
<style>
.drawer-form-item{
  text-align: center;
}
</style>
