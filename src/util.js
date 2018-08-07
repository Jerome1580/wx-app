// 工具函数库

import  config from './config'

export function get(url) {
  return new Promise((resolve,reject)=>{
    wx.request({
      url: config.host + url, //仅为示例，并非真实的接口地址
      success: function(res) {
        if(res.data.code === 0){
          resolve(res.data.data)
        }else{
          reject(res.data)
        }
      }
    })
  })
}

export function showSuccess(text) {
  wx.showToast({
    title:text,
    icon:'success'
  })

}
