<template>
  <div class="ordering">
    <div class="set-shop-info">
      <div class="home-list">
        <div class="home-title">专辑分类</div>
        <el-select
          v-model="value"
          placeholder="请选择专辑分类"
          @change="listmin"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <!-- 专辑名称 -->
      <div class="home-list">
        <div class="home-title">专辑名称</div>
        <el-input
          v-model="input"
          placeholder="请填写专辑名称"
        ></el-input>
      </div>
      <!-- 专辑特色 -->
      <div class="home-list">
        <div class="home-title">专辑特色</div>
        <div class="home-search">
          <el-input
            v-model="unique"
            placeholder="请填写专辑特色,比如重量,清甜"
          ></el-input>
          <el-row class="home-btning">
            <el-button
              type="primary"
              @click="addIing()"
            >确定</el-button>
          </el-row>
        </div>
        <!-- 分类显示 -->
        <div class="classify-lable">
          <el-tag
            effect="dark"
            class="eltab"
            v-for="(tag,index) in tags"
            :key="index"
            closable
            type="warning"
            @close="handleClose(index)"
          >
            {{tag}}
          </el-tag>
        </div>
      </div>
      <!-- 专辑划线价 -->
      <div class="home-list">
        <div class="home-title">专辑划线价(单位元)</div>
        <el-input
          v-model="Price"
          placeholder="请输入专辑划线价"
        ></el-input>
      </div>
      <!-- 专辑优惠价 -->
      <div class="home-list">
        <div class="home-title">专辑优惠价(单位元)</div>
        <el-input
          v-model="Discount"
          placeholder="请输入专辑优惠价"
        ></el-input>
      </div>
      <!-- 专辑库存 -->
      <div class="home-list">
        <div class="home-title">专辑库存</div>
        <el-input
          v-model="stock"
          placeholder="请输入专辑库存"
        ></el-input>
      </div>
      <!-- 专辑图片 -->
      <div
        class="home-list"
        v-bind="upImg"
      >
        <div class="home-title">上传专辑图片</div>
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
import { home } from '../../../api/api.js'
// 请求地址
import { updategoodsurl, getdishesurl, dishesurl, getshopcalssurl } from '../../../api/request.js'
export default {
  data () {
    return {
      // 专辑库存
      stock: '',
      // 专辑名称
      input: '',
      // 专辑特色
      tags: [],
      // 划线价
      Price: '',
      // 专辑优惠价
      Discount: '',
      // 专辑分类
      optidata: '',
      // 上传的图片files
      files: '',
      fileimg: '',
      upfile: '',
      // 专辑特色input
      unique: '',
      options: [],
      value: '',
      id: '',
      sales: '',
      state: ''
    }
  },
  methods: {
    // 上传图片
    successing (file, fileList) {
      this.fileimg = file.url
      this.files = file.raw
    },

    // 取到单个分类
    listmin (val) {
      // console.log(val)
      this.options.forEach((item) => {
        if (item.id === val) {
          this.optidata = item.name
        }
      })
    },

    // 删除专辑特色
    handleClose (tag) {
      console.log(tag)
      this.tags.splice(tag, 1)
    },

    // 添加专辑特色
    addIing () {
      if (this.unique != '') {
        console.log(this.unique)
        this.tags.push(this.unique)
        let newarr = Array.from(new Set(this.tags))
        this.tags = newarr
        this.unique = ''
      }
    },
    // 提交
    async btNs () {
      console.log('提交')
      // 转为数组字符串，否则后端接收到变为字符串了！！一个坑
      let tags = JSON.stringify(this.tags)
      // console.log(this.upfile);
      // return false
      let list = [
        { "ids": this.id },
        { "optidata": this.optidata },
        { "file": this.upfile },
        { "input": this.input },
        { "tags": tags },
        { "Price": this.Price },
        { "Discount": this.Discount },
        { "stock": this.stock },
        { "sales": this.sales },
        { "state": this.state }
      ]

      let uploading = await new this.myreferto(list).appfrom()
      console.log(list);
      // return false
      home(uploading, updategoodsurl)
        .then((res) => {
          new this.myreferto(list).men()
          // console.log(res)
          if (res.data.msg == 'SUCCESS') {
            new this.mytitle(this.$message, 'success', '修改成功').funtitle()
            this.$router.push({ name: 'variety' });
          } else {
            new this.mytitle(this.$message, 'warning', res.data.msg).funtitle()
          }
        })
        .catch((err) => {
          new this.myreferto(list).men()
          new this.mytitle(this.$message, 'info', '修改失败').funtitle()
        })
    },
    // 拉取分类
    geTdata () {
      home(1, getshopcalssurl)
        .then((res) => {
          console.log(222222,res)
          if (res.data.state) {
            // this.noclass = false
            this.options = res.data.data
          } else {
            // this.noclass = true
          }

        })
        .catch((err) => {
          console.log(err)
        })
    },

  },

  // 进入页面请求数据
  mounted () {
    this.geTdata()
    let time = [];
    // 接收修改传过来的值
    console.log(this.$route.params)
    let dataedit = this.$route.params.datas
    this.id = dataedit._id
    this.input = dataedit.objdis.input
    this.fileimg = dataedit.objdis.image
    this.Discount = dataedit.objdis.Discount
    this.Price = dataedit.objdis.Price
    this.tags = dataedit.objdis.tags
    this.value = dataedit.optidata
    this.optidata = dataedit.optidata

    this.stock = dataedit.stock
    this.sales = dataedit.sales
    this.state = dataedit.state
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
        // console.log(this.upfile)
      }
    }
  }


}
</script>

<style scoped="scoped">
@import "../../../../style/pubiss.css";
@import "../../../../style/table.css";
.el-select {
  width: 100%;
}
.home-search {
  display: flex;
}
.home-btning {
  margin-left: 10px;
}
.classify-lable {
  margin-top: 20px;
}
.eltab {
  margin: 5px;
}
</style>
