<template>
  <div class="ordering">
    <!-- 已设置的商家 -->
    <div v-if="!homemen">
      <div class="title">
        商家信息
      </div>
      <div class="info">
        <div class="shopname">
          <div class="home-list-homemen">
            <img :src="homeData.logo" />
          </div>
          <div class="detail">
            <div class="shop-name">{{homeData.shop}}</div>
            <div class="home-title"><span class="label">主营：</span>{{homeData.describe}}</div>
            <div class="home-title"><span class="label">商家地址：</span>{{homeData.address}}</div>
          </div>
        </div>
        <div class="bott">
          <div class="home-list">
            <div class="home-title"><span class="label">起送金额：</span> {{homeData.delivering}}元</div>
          </div>
          <div class="home-list">
            <div class="home-title"><span class="label">配送金额：</span>{{homeData.physical}}元</div>
          </div>
          <div class="home-list">
            <div class="home-title"><span class="label">人均价格：</span>{{homeData.capita}}元</div>
          </div>
          <div class="home-list">
            <div class="home-title"><span class="label">商品类型：</span>{{homeData.types}}</div>
          </div>
          <div class="home-list">
            <div class="home-title"><span class="label">配送时间：</span>{{homeData.times}}</div>
          </div>
          <div class="home-list">
            <div class="home-title"><span class="label">配送时长：</span>{{homeData.duration}}分钟</div>
          </div>
          <div class="line"></div>
          <el-button
            type="success"
            @click="updateSeting(homeData)"
          >修改设置</el-button>
        </div>
      </div>

    </div>

    <div v-if="homemen">
      <div class="set-shop-info">
        <div class="home-list">
          <div class="home-title">设置店铺名</div>
          <el-input
            v-model="shop"
            placeholder="请设置你的店铺名称"
          ></el-input>
        </div>
        <!-- logo -->
        <div class="home-list">
          <div class="home-title">上传logo</div>
          <el-upload
            action="#"
            :show-file-list="false"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="successing"
          >
            <img
              v-if="fileimg"
              :src="fileimg"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            ></i>
          </el-upload>
        </div>
        <!-- 起送金额 -->
        <div class="home-list">
          <div class="home-title">起送金额(单位元)</div>
          <el-input
            v-model="delivering"
            placeholder="请输入起送金额"
          ></el-input>
        </div>
        <!-- 起送金额 -->
        <div class="home-list">
          <div class="home-title">配送金额(单位元)</div>
          <el-input
            v-model="physical"
            placeholder="请输入配送金额"
          ></el-input>
        </div>
        <!-- 人均价格 -->
        <div class="home-list">
          <div class="home-title">人均价格(单位元)</div>
          <el-input
            v-model="capita"
            placeholder="请输入人均价格"
          ></el-input>
        </div>
        <!-- 商品类型 -->
        <div class="home-list">
          <div class="home-title">商品类型</div>
          <el-input
            v-model="types"
            placeholder="请输入商品类型"
          ></el-input>
        </div>
        <!-- 配送时间 -->
        <div class="home-list">
          <div class="home-title">配送时间</div>
          <el-time-select
            placeholder="起始时间"
            v-model="startTime"
            :picker-options="{
      start: '00:00',
      step: '00:15',
      end: '24:00'
    }"
          >
          </el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="endTime"
            :picker-options="{
     start: '00:00',
      step: '00:15',
      end: '24:00',
      minTime: startTime
    }"
          >
          </el-time-select>
        </div>
        <!-- 配送时长 -->
        <div class="home-list">
          <div class="home-title">配送时长(单位分钟)</div>
          <el-input
            v-model="duration"
            placeholder="请输入配送时长"
          ></el-input>
        </div>
        <div class="home-list">
          <div class="home-title">主营</div>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入主营产品，让用户更快搜索到你~如：主营新鲜的当季水果、整箱橙子···"
            v-model="describe"
          >
          </el-input>
        </div>
        <!-- 商家地址 -->
        <div class="home-list">
          <div class="home-title">商家地址</div>
          <el-input
            v-model="address"
            placeholder="请输入商家地址"
          ></el-input>
        </div>

        <!-- 提交 -->
        <div class="home-list">
          <el-row>
            <el-button
              type="success"
              @click="btNs()"
            >提交</el-button>
          </el-row>
        </div>
      </div>
    </div>

    <!-- 引入登录提示模态框 -->
    <motal ref="mon"></motal>
  </div>
</template>

<script>
// 引入登录提示模态组件
import motal from '../../tips/login.vue'
import { home } from '../../api/api.js'
// 请求地址
import { shopossurl, shopsuccurl } from '../../api/request.js'
export default {
  components: {
    motal
  },
  data () {
    return {
      // 商家描述
      describe: '',
      startTime: '',
      endTime: '',
      homemen: true,
      homeData: {},
      shop: '',
      delivering: '',
      physical: '',
      capita: '',
      types: '',
      times: '',
      duration: '',
      address: '',
      dialogVisible: false,
      disabled: false,
      fileimg: '',
      files: ''
    }
  },
  methods: {
    // 编辑商家信息
    updateSeting (shopdata) {
      this.$router.push({ name: 'editshop', params: { datas: shopdata } });
    },
    // 设置配送时长
    setTime () {
      if (this.startTime != '' && this.endTime != '') {
        this.times = this.startTime + '-' + this.endTime
      }
    },
    successing (file, fileList) {
      this.fileimg = file.url
      console.log(file)
      console.log(fileList)
      this.files = file.raw
    },
    // 提交
    async btNs () {
      console.log('提交')
      this.setTime();
      let list = [
        { "shop": this.shop },
        { "file": this.files },
        { "delivering": this.delivering },
        { "physical": this.physical },
        { "capita": this.capita },
        { "types": this.types },
        { "times": this.times },
        { "duration": this.duration },
        { "describe": this.describe },
        { "address": this.address }
      ]

      let uploading = await new this.myreferto(list).appfrom()

      home(uploading, shopossurl)
        .then((res) => {
          console.log(res)
          new this.myreferto(list).men()
          if (res.data.msg == 'SUCCESS') {
            this.homeSucc()
            new this.mytitle(this.$message, 'success', '提交成功').funtitle()
          } else {
            new this.mytitle(this.$message, 'warning', res.data.msg).funtitle()
          }

        })
        .catch((err) => {
          new this.myreferto(list).men()
          new this.mytitle(this.$message, 'info', '提交失败').funtitle()
        })
    },

    //请求成功显示商家信息
    homeSucc () {
      home(1, shopsuccurl)
        .then((res) => {
          console.log(res)
          if (res.data.msg == 'SUCCESS') {
            // console.log(res.data)
            this.homeData = res.data.data[0]
            this.homemen = false
          } else {
            this.homemen = true
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

  },

  // 进入页面请求数据
  mounted () {
    this.homeSucc()
  },

}
</script>

<style scoped="scoped">
@import "../../../style/pubiss.css";
@import "../../../style/table.css";
.home-list-homemen img {
  margin-bottom: 20px;
  width: 150px;
  height: 150px;
  border-radius: 10px;
}
.info {
  padding: 10px 50px;
  /* background-color: #f5f5f5; */
}
.title {
  height: 80px;
  line-height: 80px;
  width: 100%;
  font-size: 27px;
  padding-left: 70px;
  background-color: #f5f5f5;
  border-bottom: 2px solid rgb(165, 164, 164);
  box-shadow: 1px 2px 5px rgb(165, 164, 164);
}
.label {
  font-size: 16px;
  font-weight: 700;
  color: rgb(71, 71, 71);
}
.shopname {
  display: flex;
  align-items: center;
  padding-left: 30px;
  padding-top: 20px;
  margin-top: 20px;
  border-bottom: 1px solid rgb(177, 175, 175);
  box-shadow: 1px 2px 5px rgb(165, 164, 164);
}
.detail {
  padding-left: 50px;
}
.detail .shop-name {
  font-size: 24px;
  font-weight: 700;
  color: rgb(92, 91, 91);
  padding-bottom: 25px;
}
.bott {
  margin-top: 30px;
  padding-left: 30px;
}
.bott .line {
  height: 1px;
  border-bottom: 1px solid rgb(177, 175, 175);
  margin-bottom: 10px;
}
</style>
