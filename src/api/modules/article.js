export default ({ request }) => ({
  /**
   * @description 添加文档
   * @param {Object} data 文章信息
   */
  SAVE_ARTICLE (data = {}) {
    // 接口请求
    return request({
      url: '/posts/save',
      method: 'post',
      data
    })
  }
})
