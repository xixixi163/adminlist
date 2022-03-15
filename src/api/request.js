var url = 'http://localhost:3000/api/'

// 添加为你优选
let preferurl = `${url}banner/prefer/`

// 商家添加商品
let dishesurl = `${url}banner/dishes/`

// 拉取商品分类
let getshopcalssurl = `${url}forshop/getshopcalss`

// 添加商品分类
let shopcalssurl = `${url}banner/shopcalss`

// 删除商品分类
let deleshopcalssurl = `${url}banner/deleshopcalss`

// 修改商品
let updatapreferurl = `${url}banner/updataprefer/`

// 提交商家设置
let shopossurl = `${url}banner/setshop/`

// 更改商家设置
let updateshopurl = `${url}banner/updateshop`

// 更改商品
let updategoodsurl = `${url}banner/updategoodsurl`

// 上架下架
let editstateurl = `${url}banner/updatestateurl`

// 搜索商品
let searchdishesurl = `${url}forshop/searchdishes`

//请求成功显示商家信息{商家设置}
let shopsuccurl = `${url}forshop/shop`

// 登录
let loginurl = `${url}pcuser/login`

// 查询是否注册过
let orregiurl = `${url}pcuser/queryuser`

// 注册
let rejisturl = `${url}pcuser/register`

// 发送验证码
let codeurl = `${url}pcuser/smcode`

// 商家订单
let merchantorderurl = `${url}forshop/merchantorder`

// 订单已处理，更改处理状态
let updatedealurl = `${url}banner/updatedeal`

// 拉取为你优选
let getpreferurl = `${url}forshop/getprefer`

// 为你优选删除商品
let delepreferurl = `${url}banner/deleprefer`

// 菜品管理
let getdishesurl = `${url}forshop/getdishes`

// 菜品管理{删除商品}
let deledishesurl = `${url}banner/deledishes`

let getopenidurl = `${url}forshop/getopenid`

// 获取图表所需数据
let getechartdataurl = `${url}banner/getechart`

// 获取评论信息
let getcommeturl = `${url}forshop/merchantmes`

// 回复评论
let replaymesurl = `${url}banner/replaymes`

export {
  preferurl, dishesurl, getshopcalssurl, shopcalssurl, deleshopcalssurl, updatapreferurl,
  shopossurl, shopsuccurl, loginurl, orregiurl, updateshopurl, updategoodsurl, rejisturl, codeurl, merchantorderurl, getpreferurl, delepreferurl,
  getdishesurl, deledishesurl, editstateurl, searchdishesurl, getopenidurl, getechartdataurl, updatedealurl,
  getcommeturl, replaymesurl
}
