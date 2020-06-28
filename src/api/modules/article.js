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
  },
  GET_LIST (data = {}) {
    // 接口请求
    return request({
      url: '/posts/list',
      method: 'get',
      params: data
    })
  },
  GET_INFO (data = {}) {
    // 接口请求
    return request({
      url: '/posts/getInfo',
      method: 'get',
      params: data
    })
  },
  DEL (data = {}) {
    // 接口请求
    return request({
      url: '/posts/del',
      method: 'get',
      params: data
    })
  }
})
