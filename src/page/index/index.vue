<template>
  <div
    style="position: relative;"
    v-bind="listrou"
  >
    <!-- 顶部 -->
    <div class="sidebar-top">
      <div>商家中心</div>
      <div @click="signOut()">退出</div>
    </div>
    <div class="sidebar-cont">
      <div
        v-for="(item,index) in sidebar"
        :key="item.id"
      >
        <router-link :to="{path:item.router,query:{item:item.id}}">
          <div
            class="sidebar-title"
            @click="sidebarCli(index)"
          >
            <img :src="item.image" />
            <span :class="{activetext:index == num}">{{item.title}}</span>
            <span
              class="tips"
              v-if="item.id == 2 && tiporder === 1"
            >{{orderlist}}</span>
          </div>
        </router-link>
      </div>
    </div>

    <!-- 语音播报 -->
    <div>
      <audio
        src="http://cityfresh.oss-cn-hangzhou.aliyuncs.com/fresh/audio.mp3"
        ref="audio"
      ></audio>
    </div>
    <!--二级路由渲染-->
    <router-view></router-view>
  </div>
</template>

<script>
import { home } from '../../api/api.js'
// 请求地址
import { getopenidurl } from '../../api/request.js'
import { mapState } from 'vuex';
import Utils from '../../api/util.js'
export default {
  data () {
    return {
      merchantid: '',
      num: 1,
      tiporder: 0,
      orderlist: 0,
      sidebar: [
        {
          'id': 0,
          'image': '',
          'title': '',
          'router': ''
        },
        // {
        //   'id': 1,
        //   'image': require('../../images/home/zhuye.svg'),
        //   'title': '商家设置',
        //   'router': 'home'
        // },
        {
          'id': 1,
          'image': require('../../images/home/dingdan.svg'),
          'title': '订单管理',
          'router': 'order'
        },
        // {
        //   'id': 3,
        //   'image': require('../../images/home/youxuan.svg'),
        //   'title': '为你优选',
        //   'router': 'preferen'
        // },
        {
          'id': 2,
          'image': require('../../images/home/caiping.svg'),
          'title': '专辑管理',
          'router': 'variety'
        },
        {
          'id': 3,
          'image': require('../../images/home/pingjia.svg'),
          'title': '评价管理',
          'router': 'message'
        },
        // {
        //   'id': 6,
        //   'image': require('../../images/home/yingxiao.svg'),
        //   'title': '营销管理',
        //   'router': 'marketing'
        // },
        // {
        //   'id': 6,
        //   'image': require('../../images/home/shujufenxi.svg'),
        //   'title': '数据分析',
        //   'router': 'analysis'
        // }

      ]
    }
  },

  methods: {
    sidebarCli (id) {
      console.log(id)
      this.num = id

      if (id === 3 && localStorage.getItem('key') != '1607850685851') {
        new this.mytitle(this.$message, 'warning', '没有权限').funtitle()
        return
      }
      // 存储到本地
      localStorage.setItem("ids", id)
      // 传到order.vue 有新订单，oeder刷新
      if (this.tiporder === 1 && id === 2) {
        Utils.$emit('news', 'msg');
      }
    },

    // 播放音频
    plays () {
      var Audio = this.$refs.audio
      Audio.play()

    },

    // 右下角的消息提示
    notiFy () {
      this.$notify.info({
        title: '提示',
        message: '你有新的生鲜配送',
        duration: 2000,
        position: 'bottom-right'
      });
    },

    // 新订单提醒，点击订单管理刷新页面成功，传值给index页面，取消红点提醒
    newTips () {
      Utils.$on('neworder', (msg) => {
        console.log('商家点击了新订单，取消红点');
        this.tiporder = 0
        this.orderlist = 0
      })
    },
    // 拿到未加密的token
    getOpen () {
      home(1, getopenidurl)
        .then((res) => {
          console.log(res)
          if (res.data.msg == 'SUCCESS') {
            // console.log(res.data.data[0].openid);
            this.merchantid = res.data.data[0].openid
            this.$store.commit('sendMerchars', this.merchantid)
            console.log(this.merchars);
          } else {
            console.log('没有用户')
          }
        })
        .catch((err) => {
          console.log(err)
        })

    },

    // 即时通讯
    tongxun () {
      // 前端的token是加密的，小程序调用支付接口后，取到的未加密的openid，在登录进入系统的时候使用Vuex存储，否则每次通信时，值又重新定义了
      // 前端传入token查找该用户的openid，返回过来，使前后端channel一致，进行通信
      console.log(localStorage.getItem("key"));
      this.$goEasy.subscribe({
        channel: localStorage.getItem("key"), //替换为您自己的channel
        // channel: "1607850685851",
        onMessage: (message) => {
          console.log(localStorage.getItem("key"));
          console.log(message.channel);
          if (message.channel == localStorage.getItem("key")) {
            this.$nextTick(() => {
              this.notiFy()
              this.plays()
              this.tiporder = 1
              // 红点++
              this.orderlist++
            })
          }

        }
      })
    },

    // 退出登录
    signOut () {
      localStorage.removeItem("openid")
      //跳转页面
      this.$router.push({ name: 'login' })
    }
  },

  mounted () {
    this.tongxun();
    this.newTips();
  },

  // 解决左边切换选中，回退按钮也选中
  beforeCreate () {
    // 读取
    let ids = localStorage.getItem("ids")
    if (!ids) {
      localStorage.setItem("ids", 1)
    }
  },
  // 解决左边切换选中，回退按钮也选中
  created () {
    let ids = localStorage.getItem("ids")
    this.num = ids
    // this.getOpen()
  },

  computed: {
    ...mapState(['merchars']),
    // 解决左边切换选中，回退按钮也选中
    listrou () {
      let ids = this.$route.query.item
      if (ids && ids != undefined) {
        localStorage.setItem("ids", ids)
        this.num = ids
      }
    }
  },

}
</script>

<style scoped="scoped">
.activetext {
  color: white !important;
}
.sidebar-top {
  width: 100%;
  background: #000000;
  height: 50px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
.sidebar-top div:nth-child(1) {
  padding-left: 22px;
  font-size: 18px;
}
.sidebar-top div:nth-child(2) {
  padding-right: 22px;
  cursor: pointer;
}
.sidebar-cont {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: #000000;
  width: 180px;
  height: 100vh;
  color: white;
  font-size: 16px;
  overflow-y: auto;
}
.sidebar-title img {
  width: 18px;
  height: 18px;
  padding-right: 7px;
}
.sidebar-title {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 20px;
}
/* 提示 */
.tips {
  background: red;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
  color: #ffffff;
  font-size: 15px;
  margin-left: 10px;
}
</style>
