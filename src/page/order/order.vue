<template>
  <div class="back">
    <div class="banner">
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
            <el-date-picker
              v-model="valuedate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
            <el-button
              type="success"
              icon="el-icon-search"
              @click="searchByDate"
            >搜索</el-button>
          </div>
        </el-row>

        <el-row class="btns-lable">
          <div class="demo-input-suffix searchflex">
            <el-input
              placeholder="按客户名模糊搜索"
              prefix-icon="el-icon-search"
              v-model="searchName"
            >
            </el-input>
            <el-button
              type="success"
              icon="el-icon-search"
              @click="searchByCustomer"
            >搜索</el-button>
          </div>
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
        <div
          v-for="(item,index) in neworder"
          :key="index"
        >

          <div class="var-banner">
            <div>{{item.timeing}}</div>
            <div class="var-content-name">
              <span>{{item.peopleobj.name}}</span>
              <span>{{item.peopleobj.address}}</span>
              <span>{{item.peopleobj.iphone}}</span>
            </div>
            <div class="var-list">
              <div
                class="var-content"
                v-for="(itemdata,index) in item.arrinfo"
                :key="index"
              >
                <div>{{itemdata.name}}</div>
                <div>{{itemdata.amount}}</div>
                <div>交易成功</div>
                <div>{{itemdata.totalPrice}}</div>
                <div>
                  <span
                    v-if="item.deal===1"
                    class="isdeal"
                  >已处理</span>
                  <span
                    v-else
                    class="orderbtn"
                    @click="comfirmDeal(item.ids,item.deal)"
                  >确认处理</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- 没有数据 -->
      <div
        class="nodatas"
        v-if="!noety"
      >
        没有订单信息哦~
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
  </div>
</template>

<script>
import { getdata, home } from '../../api/api.js'
// 请求地址
import { merchantorderurl, updatedealurl } from '../../api/request.js'
// 中转
import Utils from '../../api/util.js'
export default {
  name: 'preferen',
  data () {
    return {
      // 日期
      valuedate: '',
      searchName: '',
      // 分页
      page: 1,
      total: 0,
      hasMore: false,

      noety: true,
      tableData: ['交易时间', '收货客户', '商品', '订单数', '状态', '交易金额', '处理状态'],
      neworder: [],
      id: '5dfcf328da83f620e4077103',
      contarr: []
    }
  },

  methods: {
    // 确认处理了订单
    comfirmDeal (ids, deal) {
      const obj = {
        ids,
        deal
      }
      home(obj, updatedealurl)
        .then((res) => {
          // 成功
          console.log(res)
          if (res.data.msg == 'SUCCESS') {
            new this.mytitle(this.$message, 'success', '修改成功').funtitle()
            this.orderFun()
          } else {
            new this.mytitle(this.$message, 'warning', res.data.msg).funtitle()
          }

        })
        .catch((err) => {
          console.log(err)
          new this.mytitle(this.$message, 'info', '修改失败').funtitle()
        })
    },
    // 日期格式化
    formatDate (value) {
      const year = value.getFullYear();
      const month = (value.getMonth() + 1) <= 9 ? `0${value.getMonth() + 1}` : (value.getMonth() + 1);
      const date = (value.getDate()) <= 9 ? `0${value.getDate()}` : (value.getDate());
      return `${year}-${month}-${date}`;
    },
    // 取出两头空格
    delSpace (str) {
      return str.replace(/^\s+|\s+$/g, "")
    },
    // 显示全部
    searchAll () {
      this.orderFun()
    },
    // 按日期查找订单
    searchByDate () {
      // 注意 日历中取到的不是格式化的，是默认，需要格式化
      // console.log(this.valuedate);
      let date = this.formatDate(this.valuedate)
      if (this.delSpace(date) === '') {
        new this.mytitle(this.$message, 'info', '不能为空哦~').funtitle();
        return
      }
      // console.log(date);
      const pages = {
        page: this.page,
        size: 6,
        type: 'bydate',
        searchdata: date
      }
      this.getOrders(pages)
    },
    // 按客户查找订单
    searchByCustomer () {
      if (this.delSpace(this.searchName) === '') {
        new this.mytitle(this.$message, 'info', '不能为空哦~').funtitle();
        return
      }
      const pages = {
        page: this.page,
        size: 6,
        type: 'bycus',
        searchdata: this.searchName
      }
      this.getOrders(pages)
    },
    // 有新订单提醒被调用
    newOrder () {
      Utils.$on('news', (msg) => {
        console.log('有新订单，点击被触发');
        this.orderFun()
      })
    },

    orderFun () {
      const pages = {
        page: this.page,
        size: 6,
        type: 'all',
        searchdata: ''
      }
      this.getOrders(pages)
    },
    getOrders (pages) {
      home(pages, merchantorderurl)
        .then((res) => {
          console.log(res)
          // 新订单提醒，点击订单管理刷新页面成功，传值给index页面，取消红点提醒
          Utils.$emit('neworder', 0);
          if (res.data.msg == '没有订单数据') {
            this.noety = false
          } else {
            this.hasMore = res.data.data.hasMore
            this.contarr = res.data.data.listdata
            this.total = res.data.data.total
            this.noety = true
            // console.log(this.neworder);
            // 筛选需要的数据
            this.neworder = this.contarr.map((item) => {
              let timeing = item.wxorder.timeing
              let arrinfo = item.wxorder.Paymentinfor.arrinfo
              let peopleobj = item.wxorder.Paymentinfor.peopleobj
              let deal = item.deal
              let ids = item._id
              return {
                timeing,
                arrinfo,
                peopleobj,
                deal,
                ids
              }
            })
            console.log(this.neworder)
            // this.neworder = newOrder
          }

        })
        .catch((err) => {
          console.log(err)
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
      this.orderFun()
    }


  },

  mounted () {
    this.orderFun()
    this.newOrder()
  },



}
</script>

<style scoped="scoped">
@import "../../../style/pubiss.css";
a：hover {
  cursor: pointer;
}
/* 搜索 */
.btns {
  display: flex;
  justify-content: flex-end;
}
.btns-lable {
  margin-right: 20px;
}
/* 布局 */
.back {
  background-color: #fff;
  width: 100%;
  height: 800px;
}
.banner {
  position: relative;
  background-color: #fff;
  height: 800px;
  padding-top: 80px;
  margin-right: 10px;
  margin-left: 220px;
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
  text-align: center;
  font-weight: bold;
  color: #909399;
}
.var-title div {
  width: 200px;
  text-align: center;
}
.var-table {
  margin-top: 20px;
}
/* 按钮 */
.orderbtn {
  background-color: #ecf5ff;
  color: #409eff;
  border: 1px solid #d9ecff;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}
.isdeal {
  background-color: #ecf5ff;
  color: #329e17;
  /* border: 1px solid #d9ecff; */
  border-radius: 4px;
  padding: 5px 10px;
}
/* 菜品 */
.var-banner {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #ebebeb;
}
.var-list {
  width: 970px;
}
.var-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  /* border-bottom: 1px solid #d8d8d8; */
}
.var-content-name span {
  display: block;
  padding: 3px 0;
}
.var-content div {
  width: 145px;
  text-align: center;
}
.var-content img {
  width: 40px;
  height: 40px;
  border-radius: 5px;
}
.operation {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.operation span:nth-child(1) {
  background-color: #ecf5ff;
  color: #409eff;
  border: 1px solid #d9ecff;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}
.operation span:nth-child(2) {
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
  position: absolute;
  right: 120px;
  bottom: 90px;
  font-size: 18px;
}
.searchflex {
  display: flex;
}
</style>
