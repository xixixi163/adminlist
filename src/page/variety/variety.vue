<template>
  <div class="ordering set-shop-info">
    <!-- 添加菜品 -->
    <div class="btns">
      <el-row class="btns-lable">
        <div class="demo-input-suffix searchflex">
          <el-button
            type="success"
            icon="el-icon-search"
            @click="searchAll"
          >显示全部</el-button>
        </div>
      </el-row>
      <el-row class="btns-lable">
        <div class="demo-input-suffix searchflex">
          <el-input
            placeholder="按商品模糊搜索"
            prefix-icon="el-icon-search"
            v-model="searchname"
          >
          </el-input>
          <el-button
            type="success"
            icon="el-icon-search"
            @click="searchByName"
          >搜索</el-button>
        </div>
      </el-row>
      <el-row class="btns-lable">
        <div class="demo-input-suffix searchflex">
          <el-input
            placeholder="按分类模糊搜索"
            prefix-icon="el-icon-search"
            v-model="searchclassi"
          >
          </el-input>
          <el-button
            type="success"
            icon="el-icon-search"
            @click="searchByClassi"
          >搜索</el-button>
        </div>
      </el-row>
      <el-row class="btns-lable">
        <router-link to="/classify">
          <el-button type="success">添加商品分类</el-button>
        </router-link>
      </el-row>
      <el-row>
        <router-link to="/addto">
          <el-button type="success">添加商品</el-button>
        </router-link>
      </el-row>
    </div>
    <!-- 表格布局 -->
    <div
      class="var-table"
      v-if="noety"
    >
      <!-- 标题 -->
      <div class="var-title">
        <div
          v-for="(item,index) in tableData"
          :key="index"
        >{{item}}</div>
      </div>
      <!-- 内容 -->
      <div>
        <div
          class="var-content"
          v-for="(item,index) in contarr"
          :key="index"
        >
          <div class="con"><img
              :src="'http://121.4.124.243/uploads/' + item.avatar"
              alt=""
              style="width:40px;height:40px;border-radius:5px"
            > </div>
          <div class="con">{{item.type}}</div>
          <div class="con">{{item.name}}</div>
          <div class="con">{{item.master}}</div>
          <div class="con">{{item.releasetime}}</div>
          <div class="con">{{item.price}}</div>
          <div class="con">{{item.deposit}}</div>
          <div class="con">{{item.state === 0 ? '预售' : item.state === 1 ? '发售中' : '售罄'}}</div>
          <div class="con">{{item.num}}</div>
          <!-- <div class="con">{{item.sales}}</div> -->
          <div class="operation">
            <span @click="updateVariety(item)">编辑</span>
            <!-- <span @click="item.state===0&&item.stock>0&&upShelve(item._id,item.state)">上架</span>
            <span @click="item.state===1&&downShelve(item._id,item.state)">下架</span> -->
            <span @click="deLeety(item.id,item.input)">删除</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 没有数据 -->
    <div
      class="nodatas"
      v-if="!noety"
    >
      你还没有发布商品
    </div>

    <!--分页-->
    <div class="pageinfo">
      共{{total}}条记录
      <el-button
        type="primary"
        icon="el-icon-arrow-left"
        @click="fy('s')"
      >上一页</el-button>
      <el-button
        type="primary"
        @click="fy('x')"
      >下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      当前第{{page}}页
    </div>

  </div>
</template>

<script>
import { home } from '../../api/api.js'
// 请求地址
import { getdishesurl, deledishesurl, editstateurl, searchdishesurl } from '../../api/request.js'
import qs from 'qs'
export default {
  data () {
    return {
      // 搜索
      searchname: '',
      searchclassi: '',
      // 分页
      page: 1,
      total: 0,
      hasMore: false,

      noety: true,
      tableData: ['', '分类', '专辑名', '歌手', '发售时间', '售价', '定金', '状态', '库存', '操作'],
      id: '5dfcf328da83f620e4077103',
      contarr: []
    }
  },

  methods: {
    // 取出两头空格
    delSpace (str) {
      return str.replace(/^\s+|\s+$/g, "")
    },
    // 显示全部
    searchAll () {
      this.geTdata()
    },
    // 搜索
    searchByClassi () {
      let searchdata = this.delSpace(this.searchclassi)
      if (searchdata === '') {
        new this.mytitle(this.$message, 'info', '不能为空哦~').funtitle();
        return
      }
      const pages = {
        page: this.page,
        size: 7,
        searchdata: searchdata,
        type: 2
      }
      this.getGoods(pages, searchdishesurl)
    },
    searchByName () {
      let searchdata = this.delSpace(this.searchname)
      if (searchdata === '') {
        new this.mytitle(this.$message, 'info', '不能为空哦~').funtitle();
        return
      }
      const pages = {
        page: this.page,
        size: 7,
        searchdata: searchdata,
        type: 1
      }
      // console.log(this.searchname);
      this.getGoods(pages, searchdishesurl)
    },
    // 下架
    upShelve (ids, state) {
      this.editState(ids, state)
    },
    // 上架
    downShelve (ids, state) {
      this.editState(ids, state)
    },
    // 修改上架下架状态
    editState (ids, state) {
      const obj = {
        ids,
        state
      }
      home(obj, editstateurl)
        .then((res) => {
          // 成功
          console.log(res)
          if (res.data.msg == 'SUCCESS') {
            this.geTdata()
            new this.mytitle(this.$message, 'success', '修改成功').funtitle()
          } else {
            new this.mytitle(this.$message, 'warning', res.data.msg).funtitle()
          }

        })
        .catch((err) => {
          console.log(err)
          new this.mytitle(this.$message, 'info', '修改失败').funtitle()
        })
    },
    // 编辑商品
    updateVariety (contarr) {
      console.log(contarr,777);
      this.$router.push({ name: 'addto', params: { datas: contarr } });
    },
    // 拉取商品
    geTdata () {
      const pages = {
        pageNum: this.page,
        pageSize: 7,
        search: '',
        type: '',
      }
      this.getGoods(qs.stringify(pages), getdishesurl)
    },

    // 请求商品数据接口
    getGoods (pages, getdishesurl) {
      home(pages, getdishesurl)
        .then((res) => {
          console.log(res)
          // return false
          if (res.data.state) {
            const {pageNum, totalSize, list} = res.data.data;
            this.hasMore = pageNum < totalSize
            this.contarr = list
            this.total = totalSize
            // console.log(this.contarr);
            this.noety = true
          } else {
            this.noety = false
            new this.mytitle(this.$message, 'warning', res.data.msg).funtitle()
          }

        })
        .catch((err) => {
          console.log(err)
        })
    },

    // 删除商品
    deLeety (ids, name) {
      console.log(ids)
      let msg = '删除' + name + '是否继续?'
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((action) => {
        if (action === 'confirm') {
          console.log('点击了确定')
          this.deLeapi(ids)
        }

      }).catch(() => {
        console.log('点击了取消')
        new this.mytitle(this.$message, 'success', '已取消删除').funtitle()
      });
    },

    // 删除商品2
    deLeapi (ids) {
      let id = {
        "id": ids,
      }
      home(qs.stringify(id), deledishesurl)
        .then((res) => {
          // 删除成功
          if(res.data.state) {
            this.geTdata()
            new this.mytitle(this.$message, 'success', '删除成功').funtitle()
          }
        })
        .catch((err) => {
          console.log(err)
          new this.mytitle(this.$message, 'info', '删除失败').funtitle()
        })
    },
    // 切页
    fy (param) {
      if (param == 'x') {
        if (!this.hasMore) {
          new this.mytitle(this.$message, 'info', '已经是最后一页了~').funtitle();
          return false;
        }
        this.page++
      } else {
        if (this.page == 1) {
          new this.mytitle(this.$message, 'info', '已经是首页了~').funtitle();
          return false;
        }
        this.page--
      }
      this.geTdata()
    }
  },

  mounted () {
    this.geTdata()
  },



}
</script>

<style scoped="scoped">
@import "../../../style/pubiss.css";
a：hover {
  cursor: pointer;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.btns-lable {
  margin-right: 20px;
}
.var-title {
  background: #f5f7fa;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-weight: bold;
  color: #909399;
}
.var-title div:nth-child(-n + 9) {
  width: 70px;
  text-align: center;
}
.var-title div:nth-child(10) {
  width: 250px;
  text-align: center;
}
.var-table {
  margin-top: 20px;
}
/* 菜品 */
.var-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #ebebeb;
}
.var-content .con {
  width: 70px;
  text-align: center;
}
.operation {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 250px;
}
.operation span {
  background-color: #ecf5ff;
  color: #409eff;
  border: 1px solid #d9ecff;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}
.operation span:nth-child(4) {
  color: #fff;
  background-color: #f56c6c;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}
/* 没有数据 */
.nodatas {
  text-align: center;
  padding-top: 100px;
  color: #c0c4cc;
}
/* 分页 */
.pageinfo {
  position: fixed;
  right: 110px;
  bottom: 90px;
  font-size: 18px;
}
.searchflex {
  display: flex;
}
</style>
