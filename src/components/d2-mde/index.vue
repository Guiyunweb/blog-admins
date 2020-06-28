<template>
    <div id="editor">
        <mavon-editor v-model="value" :boxShadow=false style="height: 100%"></mavon-editor>
    </div>
</template>
<script>
// Local Registration
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'editor',
  components: {
    'mavon-editor': mavonEditor
  },
  data () {
    return {
      mde: this.value
    }
  },
  props: {
    // 值
    value: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
<style>
</style>
