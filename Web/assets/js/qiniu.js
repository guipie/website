const config = {
  useCdnDomain: false,// 表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
  disableStatisticsReport: false,// 是否禁用日志报告，为布尔值，默认为 false。
  // uphost: "http://qm7207fgh.hn-bkt.clouddn.com", //上传 host，如果设定该参数则优先使用该参数作为上传地址，默认为 null。
  // region: "up-z2.qiniup.com", //选择上传域名区域；当为 null 或 undefined 时，自动分析上传域名区域。
  retryCount: 5, //上传自动重试次数（整体重试次数，而不是某个分片的重试次数）；默认 3 次（即上传失败后最多重试两次）。
  concurrentRequestLimit: 5, //分片上传的并发请求量，number，默认为3；因为浏览器本身也会限制最大并发量，所以最大并发量与浏览器有关。
  checkByMD5: true, //是否开启 MD5 校验，为布尔值；在断点续传时，开启 MD5 校验会将已上传的分片与当前分片进行 MD5 值比对，若不一致，则重传该分片，避免使用错误的分片。读取分片内容并计算 MD5 需要花费一定的时间，因此会稍微增加断点续传时的耗时，默认为 false，不开启。
  //forceDirect: 是否上传全部采用直传方式，为布尔值；为 true 时则上传方式全部为直传 form 方式，禁用断点续传，默认 false。
  chunkSize: 5 //且最大不能超过 1024，默认值 4。因为 chunk 数最大 10000，所以如果文件以你所设的 chunkSize 进行分片并且 chunk 数超过 10000，我们会把你所设的 chunkSize 扩大二倍，如果仍不符合则继续扩大，直到符合条件。
};
import * as qiniu from 'qiniu-js';
import {
  DateFormat
} from '@/assets/js/common'
export const qnUpload = async (file, watch, success, fail, token) => {
  let domain;
  try
  {
    if (!token)
    {
      await $nuxt.$http.post("AppApi/News/QiNiu/Token")
        .then(data => {
          token = data.token;
          domain = data.domain;
        }).catch(error => console.log(error))
    }
    if (token && domain)
    {
      const putExtra = {
        fname: file.name,
        mimeType: file.type,
        // customVars: { 'x:test': 'qiniu', ... },
        // metadata: { 'x-qn-meta': 'qiniu', ... },
      };
      const observable = qiniu.upload(file, DateFormat("yyyyMMddhhmmss") + '/' + file.name, token, putExtra, config);
      // 上传开始
      const subscription = observable.subscribe(
        function next (total) {
          /**
          total.loaded: number，已上传大小，单位为字节。
          total.total: number，本次上传的总量控制信息，单位为字节，注意这里的 total 跟文件大小并不一致。
          total.percent: number，当前上传进度，范围：0～100。
           */
          console.log(total);
          if (watch)
            watch(total);
        },
        function error (err) {
          /**
          err.isRequestError: 用于区分是否 xhr 请求错误；当 xhr 请求出现错误并且后端通过 HTTP 状态码返回了错误信息时，该参数为 true；否则为 undefined 。
          err.reqId: string，xhr请求错误的 X-Reqid。
          err.code: number，请求错误状态码，只有在 err.isRequestError 为 true 的时候才有效，可查阅码值对应说明。
          err.message: string，错误信息，包含错误码，当后端返回提示信息时也会有相应的错误信息。 
          */
          console.log(err);
          if (fail)
            fail(err);
          else
            $nuxt.$message.error("上传出错了");
        },
        function complete (res) {
          console.log(res);
          if (success)
            success(domain + res.key);
          else
            $nuxt.$message.success("上传成功");
        });
    }
    else
    {
      if (fail)
        fail("未获取到上传token和域名");
      else
        console.log("未获取到上传token和域名.");
    }
  }
  catch (error)
  {
    if (fail)
      fail("代码错误.");
    else
      $nuxt.$message.error("代码错误");
  }
  // subscription.unsubscribe(); // 上传取消
}