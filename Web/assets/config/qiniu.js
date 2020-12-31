import qiniu from "qiniu"
const config = {
  AccessKey: "_fpzQRvuLFPcVZ7Zj_Y6k5rdXaXLdNzQOKxJYA4R",
  SecretKey: "hLaEdKVf4aLxkJ1A-4rEw5DqEliJbhbGRBkjWd5e",
  Zone: ""
}
/** 封装本地upload方法
@param url 上传路径
@param json 包含file对象
@returns {Promise}
**/
export function upload (url, json) {
  return new Promise((resolve, reject) => {
    let size = parseInt(Number(json.file.size) / Number(process.env.MAX_FILESIZE) + 1);
    let y = 0;
    let fun = function () {
      let formData = new FormData();
      let file = json.file.slice(yprocess.env.MAX_FILESIZE, (y + 1) * process.env.MAX_FILESIZE);
      formData.append('chunk', y);
      formData.append('file_name', json.file.name);
      formData.append('count', size);
      formData.append('type', json.type);
      formData.append('file', file);
      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }, timeout: 10000000,
        onUploadProgress: progressEvent => {
          //progressEvent.loaded 为上传进度
        },
      }).then(response => {
        if (response.data.code === 200)
        {
          if (y + 1 < size)
          {
            y++;
            fun()
          } else
          {
            y = 0;
            resolve(response.data.data);
          }
        } else
        {
          Vue.prototype.$message.error(response.data.msg)
        }
      })
        .catch(err => {
          reject(err);
          let message = '请求失败！请检查网络';
          if (err.response) message = err.response.data.message;
          Vue.prototype.$$msgbox({
            title: '错误！',
            message: message,
            type: 'error',
          })
        })
    };
    fun()
  }
  );
}
/**封装七牛upload方法
@param json json中包含fail
@returns {Promise}
*/
export function uploadQiniu (json) {
  var mac = new qiniu.auth.digest.Mac(config.AccessKey, config.SecretKey);
  //自定义凭证有效期（示例2小时，expires单位为秒，为上传凭证的有效时间）
  var options = {
    scope: bucket,
    expires: 7200
  };
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken = putPolicy.uploadToken(mac);
  console.log(uploadToken);
  return;
  return new Promise((resolve, reject) => {
    axios.get('获取七牛权限的后台接口地址，主要获取七牛token', {
      params: {
        file_name: json.file.name
      }
    }).then(resData => {
      let putExtra = {
        fname: json.file.name,
        mimeType: json.mimeType || null
      };
      let congif = {};
      let observable = qiniu.upload(json.file, resData.data.data.new_name, resData.data.data.token, putExtra, congif);
      let observer = {
        next (res) {
          let progress = Number(res.total.percent.toFixed(0));
          // 此处得到上传进度百分比 可加后续操作
        },
        error (err) {
          reject(err);
          let message = '请求失败！请检查网络';
          if (err.response) message = err.response.data.message;
          Vue.prototype.$alert({
            title: '错误！',
            message: message,
            type: 'error',
          })
        },
        complete (res) {
          res.url = res.key;
          res.name = json.file.name;
          resolve(res);
        }
      };
      let subscription = observable.subscribe(observer)
    });
  })
} 