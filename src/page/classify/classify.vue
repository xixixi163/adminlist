<template>
  <div class="ordering set-shop-info">

    <!-- 当前已有分类 -->
    <div class="home-list">
      <div
        class="home-title"
        v-if="noclass"
      >当前已有商品分类</div>
      <!-- if没有数据 -->
      <div
        class="classify-lable"
        v-if="!noclass"
      >当前没有分类</div>
      <!-- 分类显示 -->
      <div
        class="classify-lable"
        v-if="noclass"
      >
        <el-tag
          class="eltab"
          v-for="(item) in items"
          :key="item.id"
          type="warning"
          effect="dark"
          closable
          @close="handleClose(item.id)"
        >
          {{ item.name }}
        </el-tag>
      </div>
    </div>

    <!-- 商品名称 -->
    <div class="home-list">
      <div class="home-title">添加商品分类</div>
      <div class="home-search">
        <el-input
          v-model="input"
          placeholder="比如EP,原声带专辑,每添加一个点确定"
        ></el-input>
        <el-row class="home-btning">
          <el-button
            type="primary"
            @click="addIing()"
          >确定</el-button>
        </el-row>
      </div>
    </div>

  </div>
</template>

<script>
import { home } from '../../api/api.js'
// 请求地址
import { shopcalssurl, getshopcalssurl, deleshopcalssurl } from '../../api/request.js'
import qs from 'qs';
export default {
  data () {
    return {
      noclass: true,
      input: '',
      items: [],
      id: '5dfcf328da83f620e4077103'
    }
  },
  methods: {
    // 添加
    addIing () {
      if (this.input != '') {
        this.homeData()
      }
    },

    // 提交数据
    homeData () {
      let id = {
        "name": this.input
      }
      home(qs.stringify(id), shopcalssurl)
        .then((res) => {
          if (res.data.state) {
            new this.mytitle(this.$message, 'success', '提交成功').funtitle()
            this.geTdata()
            this.input = ''
          } else {
            new this.mytitle(this.$message, 'warning', res.data.msg).funtitle()
          }
          console.log(res)

        })
        .catch((err) => {
          console.log(err)
        })
    },

    // 拉取分类
    geTdata () {
      home(1, getshopcalssurl)
        .then((res) => {
          console.log(res)
          if (res.data.state) {
            this.items = res.data.data
            this.noclass = true
          } else {
            this.noclass = false
          }

        })
        .catch((err) => {
          console.log(err)
        })
    },

    // 删除商品分类
    handleClose (tag) {
      let id = {
        "id": tag,
      }
      home(qs.stringify(id), deleshopcalssurl)
        .then((res) => {
          console.log(res)
          if(res.data.state) {
            new this.mytitle(this.$message, 'success', '删除成功').funtitle()
            this.geTdata()
          }
        })
        .catch((err) => {
          console.log(err)
          new this.mytitle(this.$message, 'info', '删除失败').funtitle()
        })
    },


  },

  //
  mounted () {
    this.geTdata()
  },


}
</script>

<style scoped="scoped">
@import "../../../style/pubiss.css";
@import "../../../style/table.css";
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
