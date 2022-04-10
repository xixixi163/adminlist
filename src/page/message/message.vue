<template>
  <div class="ordering set-shop-info">
    <!-- 添加菜品 -->
    <div class="btns">
      <!-- <el-row class="btns-lable">
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
      </el-row> -->
      <!-- <el-row class="btns-lable">
        <div class="demo-input-suffix searchflex">
          <el-input
            placeholder="按用户昵称模糊搜索"
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
      </el-row> -->

      <!-- <el-row>
        <router-link to="/addto">
          <el-button type="success">添加商品</el-button>
        </router-link>
      </el-row> -->
    </div>
    <!-- 分类部分 -->
    <div class="tabs-block">
      <div
        v-for="(item,index) in tabsEva"
        :key="index"
        :class="{activetabs:index===num}"
        @click="tabsBtn(item,index)"
      >
        {{item}}
      </div>
    </div>
    <!-- 表格布局 -->
    <div v-if="noety">
      <!-- <div class="banner"> -->
      <el-table
        :row-style="{height:'50px'}"
        :cell-style="{padding:'5px 20px'}"
        :data="tableData"
        style="font-size: 16px"
        :header-cell-style="{background:'#eef1f6',color:'#606266', textAlign:'center',fontSize:'18px'}"
        :default-sort="{prop: 'time', order: 'descending'}"
      >
        <el-table-column
          prop="avatar"
          label="头像"
          width="170"
        >
          <template slot-scope="scope">
            <img
              :src="'http://121.4.124.243/uploads/' + scope.row.avatar"
              alt=""
              style="width: 25px;height: 25px;border-radius: 25%;display: block;margin: auto;"
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="评价时间"
          sortable
          width="210"
        >
        </el-table-column>
        <el-table-column
          prop="uname"
          label="用户昵称"
          width="130"
        >
        </el-table-column>
        <el-table-column
          prop="content"
          label="评价内容"
          min-width="580"
        >
          <template slot-scope="scope">
            <span class="mesinfo">{{scope.row.content}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="200"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleView(scope.$index, scope.row)"
            >详情</el-button>
            <el-link
              icon="el-icon-edit"
              v-show="scope.row.replies.length <= 0"
              @click="handleView(scope.$index, scope.row)"
            >待回复</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- </div> -->
    </div>

    <!-- 没有数据 -->
    <div
      class="nodatas"
      v-if="!noety"
    >
      暂无评论哦
    </div>
    <!-- 弹窗 -->

    <!-- 透明背景 遮罩层-->
    <div
      class="yin"
      v-if="isYin"
      @click="backClick"
    >

    </div>
    <div
      class="detail"
      v-if="isYin"
    >
      <div class="mesdetail">
        <div class="userinfo">
          <img
            :src="'http://121.4.124.243/uploads/' + mesInfo.avatar"
            alt=""
          >
          <div class="username">
            <div class="name">{{mesInfo.uname}}</div>
            <div class="mestime">{{mesInfo.time}}</div>
          </div>
        </div>
        <div class="mescontent">
          <span style="color:#606060;font-size:17px;background:#f5f5f5">评价：</span>{{mesInfo.content}}
        </div>
        <div v-if="mesInfo.replies.length >0">
          <div class="merchcontent">
            <span style="color:#606060;font-size:17px;background:#f5f5f5">{{'回复内容(' + mesInfo.replies[0].time + ')：'}}</span>{{mesInfo.replies[0].content}}
          </div>
          <div style="margin-top:15px;display: flex;justify-content: center;">
            <el-button
              type="info"
              size="mini"
              round
              @click="closeModal"
            >关闭</el-button>
          </div>
        </div>
        <div v-else>
          <div style="margin-bottom:10px;">
            <el-link icon="el-icon-chat-round">回复</el-link>
          </div>
          <div>
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入回复内容"
              v-model="textarea"
              style="width:430px"
            >
            </el-input>
          </div>
          <div style="margin-top:15px;display: flex;justify-content: center;">
            <el-button
              type="success"
              size="mini"
              round
              @click="replayMes"
            >确认回复</el-button>
            <el-button
              type="info"
              size="mini"
              round
              @click="closeModal"
            >关闭</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 显示具体信息 -->

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
import qs from 'qs'
// 请求地址
import { getcommeturl, replaymesurl } from '../../api/request.js'
export default {
  data () {
    return {
      // 弹窗显示消息
      isYin: false,
      mesInfo: {},
      textarea: '',
      // 分类
      num: 0,
      tabsEva: [],
      valuedate: '',
      classcoms: '',
      // 搜索
      searchname: '',
      // 分页
      page: 1,
      total: 0,
      hasMore: false,

      noety: true,
      // tableData: ['评价时间', '用户昵称', '评价内容', '操作'],
      id: '5dfcf328da83f620e4077103',
      contarr: [],
      tableData: []
    }
  },

  methods: {
    // 回复
    replayMes () {
      let replayContent = this.delSpace(this.textarea)
      if (replayContent === '') {
        new this.mytitle(this.$message, 'info', '不能为空哦~').funtitle();
        return
      }
      const obj = {
        eid: this.mesInfo.id,
        content: replayContent,
        uid: this.mesInfo.id,
        time: ''
      }
      home(qs.stringify(obj), replaymesurl)
        .then((res) => {
          // 成功
          console.log(res)
          if (res.data.state) {
            this.mesInfo.replies.push({
              content: replayContent,
              time: ''
            })
            new this.mytitle(this.$message, 'success', '回复成功').funtitle()
          } else {
            new this.mytitle(this.$message, 'warning', res.data.msg).funtitle()
          }

        })
        .catch((err) => {
          console.log(err)
          new this.mytitle(this.$message, 'info', '回复失败').funtitle()
        })
    },
    closeModal () {
      this.isYin = false
    },
    backClick () {
      this.isYin = false
    },
    handleView (index, row) {
      console.log(index, row);
      this.mesInfo = row
      this.isYin = true
      // this.dialogFormVisible = true
    },
    // 分类
    tabsBtn (item, index) {
      this.num = index;
      const pages = {
        pageNum: this.page,
        pageSize: 7,
        type: '',
        searchdata: '',
      }
      if (item != '全部') {
        pages['classmessage'] = item
        this.classcoms = item;
      } else {
        this.classcoms = '';
      }
      // this.getClassMes(pages)
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
    // 搜索
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
        pageNum: this.page,
        pageSize: 7,
        type: 'fordate',
        searchdata: date
      }
      // if (this.classcoms) {
      //   pages['classmessage'] = this.classcoms
      //   this.getClassMes(pages)
      // } else {
        this.getMes(pages)
      // }
    },
    searchByName () {
      let searchdata = this.delSpace(this.searchname)
      if (searchdata === '') {
        new this.mytitle(this.$message, 'info', '不能为空哦~').funtitle();
        return
      }
      const pages = {
        pageNum: this.page,
        pageSize: 7,
        searchdata: searchdata,
        type: 'forname'
      }
      // if (this.classcoms) {
      //   pages['classmessage'] = this.classcoms
      //   this.getClassMes(pages)
      // } else {
        this.getMes(pages)
      // }

    },
    detailMes (item) {

    },
    // 拉取商品
    getData () {
      const pages = {
        pageNum: this.page,
        pageSize: 7,
      }
      this.getMes(pages)
    },
    // 评论分类
    getClassMes (pages) {
      home(qs.stringify(pages), getcommeturl)
        .then((res) => {
          console.log(res, 'comment')
          // return false
          if (res.data.msg == 'SUCCESS') {
            this.hasMore = res.data.data.hasMore
            this.contarr = res.data.data.listdata
            this.total = res.data.data.total
            // console.log(this.contarr);
            if (this.contarr.length != 0) {
              this.tableData = this.contarr.map(item => {
                return {
                  avatarUrl: item.messagedata.avatarUrl,
                  nickName: item.messagedata.nickName,
                  time: item.messagedata.time,
                  usermess: item.messagedata.usermess,
                  openid: item.openid,
                  _id: item._id,
                  merchantid: item.merchantid,
                  replaydata: item.replaydata
                }
              })
            }
            console.log(this.tableData);
            this.noety = true
          } else {
            this.noety = false
            // new this.mytitle(this.$message, 'warning', res.data.msg).funtitle()
          }

        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 请求数据接口
    getMes (pages) {
      home(qs.stringify(pages), getcommeturl)
        .then((res) => {
          console.log(res, 9099)
          // return false
          if (res.data.state) {
            let { pageNum, totalSize, totalNum, list } = res.data.data
            this.hasMore = pageNum < totalNum
            this.tableData = list
            this.total = totalSize
            this.noety = true
          } else {
            this.noety = false
            // new this.mytitle(this.$message, 'warning', res.data.msg).funtitle()
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
      this.getData()
    }
  },

  mounted () {
    this.getData()
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
/* 弹窗遮罩 */
.yin {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 180px;
  right: 0;
  bottom: 0;
  z-index: 98;
}
.detail {
  position: fixed;
  width: 500px;
  height: 540px;
  top: 50%;
  left: 50%;
  background-color: #fff;
  z-index: 99;
  transform: translate(-50%, -50%);
}
/* 弹出内容 */
.mesdetail {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  padding: 20px;
}
.mesdetail .userinfo {
  display: flex;
  justify-self: start;
  align-items: center;
}
.userinfo img {
  width: 40px;
  height: 40px;
  border-radius: 7px;
  margin-right: 15px;
}
.userinfo .username {
  display: flex;
  flex-direction: column;
}
.username div {
  color: #333;
  font-size: 16px;
  padding: 5px;
}
.mescontent {
  height: 210px;
  margin-top: 20px;
  font-size: 17px;
  line-height: 150%;
}
.merchcontent {
  height: 150px;
  width: 450px;
  padding-top: 10px;
  font-size: 17px;
  line-height: 150%;
  border-top: 1px solid #3b3a3a;
}
/* 评论分类部分 */
.tabs-block {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.tabs-block div {
  margin: 10px 15px 5px 0;
  padding: 8px;
  border: 1px solid #77cd69;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  color: #333;
  background: #fff;
  cursor: pointer;
}
.activetabs {
  background: #77cd69 !important;
  border: 1px solid #fff !important;
  /* color: #4CD964 !important; */
  color: #fff !important;
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
/* 表格 评价过程省略*/
.mesinfo {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
