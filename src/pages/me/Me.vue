<template>
    <div class="container">
      <div class="userinfo">
        <img :src="userinfo.avatarUrl" alt="">
        <p open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo1">{{ userinfo.nickName}}</p>
        <button v-if="!userinfo.city" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo1">点击登录</button>
        <YearProgress></YearProgress>
        <button v-if="userinfo.city" @click="scanBook" class="btn">添加图书</button>
      </div>
    </div>
</template>

<script>
  import { showSuccess } from '../../util'
  import qcloud from 'wafer2-client-sdk'
  import config from '@/config'

  import YearProgress from '@/components/YearProgress'
export default {
    name: 'Me',
    components: {
      YearProgress
    },
    data () {
      return {
        userinfo: {
          avatarUrl: '../../../static/img/me.png',
          nickName: '未登录'
        }
      }
    },
    mounted () {
      // 一进来看看用户是否授权过
      this.getSetting()
    },
    methods: {
      // 扫码功能
      scanBook () {
        wx.scanCode({
          success: (res) => {
            console.log(res)
          }
        })
      },
      getSetting () {
        let self = this
        wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: function (res) {
                  console.log(res.userInfo)
                  self.userinfo = res.userInfo
                  // 用户已经授权过
                  console.log('用户已经授权过')
                }
              })
            } else {
              console.log('用户还未授权过')
            }
          }
        })
      },
      getUserInfo1 () {
        console.log('click事件首先触发')
        // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
        // console.log(wx.canIUse('button.open-type.getUserInfo'))
        if (wx.canIUse('button.open-type.getUserInfo')) {
          // 用户版本可用
        } else {
          console.log('请升级微信版本')
        }
      },
      bindGetUserInfo (e) {
        // console.log(e.mp.detail.rawData)
        if (e.mp.detail.rawData) {
          // 用户按了允许授权按钮
          console.log('用户按了允许授权按钮')
          // 登录到后端，存储openid
          qcloud.setLoginUrl(config.loginUrl)
          qcloud.login({
            // 返回的信息有openid
            success: userinfo => {
              console.log('登录成功', userinfo)
              showSuccess('登录成功')
              wx.setStorageSync('userinfo', userinfo)
              this.userinfo = userinfo
            },
            fail: function (err) {
              console.log('登录失败', err)
            }

          })
        } else {
          // 用户按了拒绝按钮
          console.log('用户按了拒绝按钮')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.container{
  padding: 0 30rpx;
  .userinfo{
    margin-top:100rpx;
    text-align:center;
    img{
      width:150rpx;
      height:150rpx;
      margin:20rpx;
      border-radius:50%;
    }
  }
}
</style>
