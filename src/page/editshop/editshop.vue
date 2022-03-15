<template>
  <div class="ordering back">
    <div class="set-shop-info box">
      <!-- logo -->
      <div class="home-list">
        <div class="home-title">设置店铺名</div>
        <el-input
          v-model="shop"
          placeholder="请设置你的店铺名称"
        ></el-input>
      </div>
      <!-- logo -->
      <div
        class="home-list"
        v-bind="upImg"
      >
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
      <!-- 人均价格 -->
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
      <!-- 人均价格 -->
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
</template>

<script>
import { home } from '../../api/api.js'
// 请求地址
import { updateshopurl } from '../../api/request.js'
export default {
  data () {
    return {
      id: '',
      startTime: '',
      endTime: '',
      shop: '',
      delivering: '',
      physical: '',
      capita: '',
      types: '',
      times: '',
      duration: '',
      describe: '',
      address: '',
      fileimg: '',
      files: '',
      upfile: '',
    }
  },
  methods: {
    // 设置配送时长
    setTime () {
      if (this.startTime != '' && this.endTime != '') {
        this.times = this.startTime + '-' + this.endTime
      }
    },
    // 上传图片
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
        { "ids": this.id },
        { "shop": this.shop },
        { "file": this.upfile },
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

      home(uploading, updateshopurl)
        .then((res) => {
          new this.myreferto(list).men()
          console.log(res)
          if (res.data.msg == 'SUCCESS') {
            new this.mytitle(this.$message, 'success', '修改成功').funtitle()
            this.$router.push({ name: 'home' });
          } else {
            new this.mytitle(this.$message, 'warning', res.data.msg).funtitle()
          }
        })
        .catch((err) => {
          new this.myreferto(list).men()
          new this.mytitle(this.$message, 'info', '修改失败').funtitle()
        })
    },

  },

  // 进入页面请求数据
  mounted () {
    let time = [];
    // 接收修改传过来的值
    console.log(this.$route.params)
    let dataedit = this.$route.params.datas
    this.id = dataedit._id
    this.shop = dataedit.shop
    this.fileimg = dataedit.logo
    this.delivering = dataedit.delivering
    this.physical = dataedit.physical
    this.capita = dataedit.capita
    this.types = dataedit.types
    this.times = dataedit.times
    time = this.times.split('-')
    this.startTime = time[0]
    this.endTime = time[1]
    this.duration = dataedit.duration
    this.describe = dataedit.describe
    this.address = dataedit.address
  },

  // 计算
  computed: {
    upImg () {
      // 如果图片地址更换
      if (this.files != '') {
        // 用户更换了图片
        console.log('已更换')
        this.upfile = this.files
      } else {
        this.upfile = this.fileimg
        console.log(this.upfile)
      }
    }
  }


}
</script>

<style scoped="scoped">
@import "../../../style/pubiss.css";
@import "../../../style/table.css";
.back {
  background-color: #f5f5f5;
}
.box {
  background-color: #fff;
  width: 600px;
  margin: auto;
  border-bottom: 1px solid rgb(177, 175, 175);
  box-shadow: 1px 2px 5px rgb(165, 164, 164);
}
</style>
