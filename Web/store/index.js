/**
 * @file 根数据状态，仅用以调度初始化任务 / ES module
 */
import {
  uaParser
} from '~/plugins/common'
export const actions = {

  nuxtServerInit (store, {
    req
  }) {
    debugger
    // 检查设备类型 
    const userAgent = process && process.server ? req.headers['user-agent'] : navigator.userAgent
    const {
      isMobile,
      isWechat,
      isIE,
      isSafari
    } = uaParser(userAgent);
    // 移动端
    if (isMobile)
    {
      store.commit('global/updateIsMobile', true)
    }
  }
}