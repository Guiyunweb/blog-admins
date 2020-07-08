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
        <mavon-editor v-model="article.content" :boxShadow=false style="height: 100%"></mavon-editor>
      </el-form-item>
    </el-form>
    <el-drawer
      :with-header="false"
      :visible.sync="drawer"
      >
      <el-form label-position="top" style="margin: 15px">
        <el-form-item label="标签">
           <el-select
            v-model="article.tags"
            style="width: 100%"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择文章标签">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入摘要"
            v-model="article.summary">
          </el-input>
        </el-form-item>
        <el-form-item label="评论">
          <el-switch
            v-model="article.comments"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
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
            <div v-if="!article.thumbnail">
              <i class="el-icon-upload" style="width: 400px"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </div>
            <div v-else>
              <img :src="'http://47.100.105.136:8080'+article.thumbnail+'?download=0'" style="object-fit:cover;width: 100%;height:100%" />
            </div>
          </el-upload>
        </el-form-item>
        <div style="float: right;">
          <el-button type="primary" @click="save(true)" size="small">发布</el-button>
        </div>
      </el-form>
    </el-drawer>
  </d2-container>
</template>

<script>
import api from '@/api'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'edit',
  components: {
    'mavon-editor': mavonEditor
  },
  data () {
    return {
      drawer: false,
      article: {
        id: null,
        title: null,
        content: '',
        issued: false,
        summary: null,
        thumbnail: '',
        comments: true,
        tags: []
      },
      options: [{
        value: 'HTML',
        label: 'HTML'
      }, {
        value: 'CSS',
        label: 'CSS'
      }, {
        value: 'JavaScript',
        label: 'JavaScript'
      }]
    }
  },
  mounted () {
    if (this.$route.query.id) {
      this.getData(this.$route.query.id)
    }
  },
  methods: {
    getData (id) {
      api.GET_INFO({ id }).then(res => {
        console.log(res)
        this.article = res.data
      })
    },
    save (isRelease) {
      this.article.issued = isRelease
      api.SAVE_ARTICLE(this.article).then(res => {
        if (res.success) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.$router.push({ path: '/article/list' })
        }
      })
    },
    handleAvatarSuccess (res, file) {
      this.article.thumbnail = res.path
    }
  }
}
</script>
<style>
.drawer-form-item{
  text-align: center;
}
</style>
