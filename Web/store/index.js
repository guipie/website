/**
 * @file 根数据状态，仅用以调度初始化任务 / ES module
 */

import { isServer } from '~/environment'
import {
    uaParser
} from '~/plugins/uaparser'
export const actions = {

    nuxtServerInit(store, {
        req
    }) {
        // 检查设备类型 
        const userAgent = isServer ? req.headers['user-agent'] : navigator.userAgent
        const {
            isMobile,
            isWechat,
            isIE,
            isSafari
        } = uaParser(userAgent);
        // 移动端
        if (isMobile) {
            store.commit('global/updateIsMobile', true)
        }
    }
}