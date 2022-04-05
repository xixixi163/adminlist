<template>
  <div class="ordering set-shop-info">
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
    <!-- 商品名称 -->
    <div class="home-list">
      <div class="home-title">专辑名称</div>
      <el-input
        v-model="input"
        placeholder="请填写专辑名称"
      ></el-input>
    </div>
    <!-- 歌手名称 -->
    <div class="home-list">
      <div class="home-title">歌手名称</div>
      <el-input
        v-model="master"
        placeholder="请填写专辑名称"
      ></el-input>
    </div>
    <!-- 发行时间 -->
    <div class="home-list">
      <div class="home-title">发行时间</div>
      <el-date-picker
        v-model="releasetime"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </div>
    <!-- 专辑特色 -->
    <!-- <div class="home-list">
      <div class="home-title">专辑特色</div>
      <div class="home-search">
        <el-input
          v-model="unique"
          placeholder="请填写专辑特色,比如现摘,新鲜"
        ></el-input>
        <el-row class="home-btning">
          <el-button
            type="primary"
            @click="addIing()"
          >确定</el-button>
        </el-row>
      </div>
      <!-- 分类显示 -->
      <!-- <div class="classify-lable">
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
    </div> --> 
    <div class="home-list">
      <div class="home-title">专辑状态</div>
      <el-select
        v-model="state"
        placeholder="请选择专辑状态"
        @change="musicState"
      >
        <el-option
          v-for="item in optionsState"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>
    <!-- 专辑划线价 -->
    <div class="home-list">
      <div class="home-title">专辑发售价(单位元)</div>
      <el-input
        v-model="Price"
        placeholder="请输入专辑划线价"
      ></el-input>
    </div>
    <!-- 专辑优惠价 -->
    <div class="home-list">
      <div class="home-title">专辑定金(单位元)</div>
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
    <div class="home-list">
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
</template>

<script>
import { home } from '../../api/api.js'
// 请求接口getshopcalssurl
import { getdishesurl, dishesurl, getshopcalssurl, uploadImg, updatapreferurl } from '../../api/request.js'
import qs from 'qs'
export default {
  data () {
    return {
      master: '', // 歌手名称
      releasetime: '',
      // 专辑库存
      stock: '',
      // 商品名称
      input: '',
      // 商品特色
      tags: [],
      // 划线价
      Price: '',
      // 商品优惠价
      Discount: '',
      // 商品分类
      optidata: '',
      // 上传的图片files
      files: '',
      fileimg: '',
      // 商品特色input
      unique: '',
      options: [],
      optionsState: [
        {
          id:0,
          name: '预售'
        },{
          id:1,
          name: '正常发售'
        },{
          id:2,
          name: '售罄'
        }
      ],
      value: '',
      optidataState: '', // 专辑状态
      state: 1, // 专辑状态 数值
      id: '5dfcf328da83f620e4077103'
    }
  },
  methods: {
    // 上传图片
    async successing (file, fileList) {
      this.fileimg = file.url
      this.files = file.raw
      let params = [{
        file: this.files
      }]
      let uploading = await new this.myreferto(params).appfrom()
      home(uploading, uploadImg)
      .then(res => {
        if(res.data.state) {
          this.uploadName = res.data.data
        }
      })
      .catch((err) => {
        new this.mytitle(this.$message, 'info', '上传失败').funtitle()
        console.log(err);
      })
      .finally( () => {
        new this.myreferto(params).men()
      })
      
    },

    // 取到单个分类
    listmin (val) {
      console.log(val)
      this.options.forEach((item) => {
        if (item.id === val) {
          console.log(item.name)
          this.optidata = item.name
        }
      })
    },
    // 取到单个分类
    musicState (val) {
      this.optionsState.forEach((item) => {
        if (item.id === val) {
          this.optidataState = item.name
        }
      })
    },
    // 删除商品特色
    handleClose (tag) {
      console.log(tag)
      this.tags.splice(tag, 1)
    },

    // 添加商品特色
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
      console.log(33,this.value, this.input, this.master, this.uploadName,this.dateFormat('yyyy-MM-dd', this.releasetime));
      if(!this.value || !this.input || !this.releasetime || !this.master || !this.Price || !this.Discount || !this.stock || !this.uploadName) {
        new this.mytitle(this.$message, 'info', '请填写完整信息').funtitle()
        return
      }
      let list = [
        { "type": this.value },
        { "name": this.input },
        { "releasetime": this.dateFormat('yyyy-MM-dd', this.releasetime)},
        { "master": this.master},
        { "state": this.state },
        { "price": this.Price },
        { "deposit": this.Discount },
        { "num": this.stock },
        { "avatar": this.uploadName}
      ]

      if(this.id) {
        list.push({
          "id": this.id
        })
      }

      let uploading = await new this.myreferto(list).appfrom()
      let url = this.id ? updatapreferurl : dishesurl;

      home(uploading, url)
        .then((res) => {
          new this.myreferto(list).men()
          console.log(res)
          if (res.data.state) {
            new this.mytitle(this.$message, 'success', '提交成功').funtitle()
            this.optidata = ''
            this.files = ''
            this.input = ''
            this.tags = []
            this.Price = ''
            this.Discount = ''
            this.stock = ''
            this.optidata = ''
            // 上传的图片files
            this.files = ''
            this.fileimg = ''
            this.value = ''
            this.id = ''
          } else {
            new this.mytitle(this.$message, 'warning', res.data.msg).funtitle()
          }
        })
        .catch((err) => {
          new this.myreferto(list).men()
          new this.mytitle(this.$message, 'info', '提交失败').funtitle()
        })
    },

    // 拉取分类
    geTdata () {
      home(1, getshopcalssurl)
        .then((res) => {
          console.log(11,res)
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
    /**
 * 格式化时间
 * @param fmt 格式
 * @param date 时间
 * example: dateFoemat('yyyy-MM-dd HH:mm:ss', Mon Sep 28 2020 13:05:07 GMT+0800 (中国标准时间))
 * return: 2020-09-28 13:05:07
 * */
dateFormat(fmt, date) {
  var ret;
  date = new Date(date);
  var opt = {
    "y+": date.getFullYear().toString(),
    // 年
    "M+": (date.getMonth() + 1).toString(),
    // 月
    "d+": date.getDate().toString(),
    // 日
    "H+": date.getHours().toString(),
    // 时
    "m+": date.getMinutes().toString(),
    // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串

  };

  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);

    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    }
  }
  return fmt;
}

},
  //
  mounted () {
    this.geTdata()
    // 接收修改传过来的值
    console.log(this.$route.params)
    let dataedit = this.$route.params.datas
    if(dataedit) {
      this.id = dataedit.id
      this.input = dataedit.name
      this.master = dataedit.master
      this.fileimg = 'http://121.4.124.243/uploads/' + dataedit.avatar
      this.uploadName = dataedit.avatar;
      this.Discount = dataedit.deposit
      this.Price = dataedit.price
      this.value = dataedit.type
      this.state = dataedit.state
      this.stock = dataedit.num
      this.releasetime = dataedit.releasetime
    }
  },


}
</script>

<style scoped="scoped">
@import "../../../style/pubiss.css";
@import "../../../style/table.css";
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
