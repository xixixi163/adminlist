var url = 'http://121.4.124.243/'

// 添加为你优选
let preferurl = `${url}banner/prefer/`

// 商家添加商品
let dishesurl = `${url}admin/saveAlbum/`

// 拉取商品分类
let getshopcalssurl = `${url}albumType/getAllType`

// 添加商品分类
let shopcalssurl = `${url}albumType/saveType/`

// 删除商品分类
let deleshopcalssurl = `${url}albumType/removeType/`

// 修改商品
let updatapreferurl = `${url}admin/modifyAlbum/`

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
let loginurl = `${url}user/login`

// 查询是否注册过
let orregiurl = `${url}pcuser/queryuser`

// 注册
let rejisturl = `${url}user/register`

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
let getdishesurl = `${url}album/getAllAlbum`

// 菜品管理{删除商品}
let deledishesurl = `${url}admin/removeAlbum/`

let getopenidurl = `${url}forshop/getopenid`

// 获取图表所需数据
let getechartdataurl = `${url}banner/getechart`

// 获取评论信息
let getcommeturl = `${url}forshop/merchantmes`

// 回复评论
let replaymesurl = `${url}banner/replaymes`

// 上传图片
let uploadImg = `${url}upload`

export {
  preferurl, dishesurl, getshopcalssurl, shopcalssurl, deleshopcalssurl, updatapreferurl,
  shopossurl, shopsuccurl, loginurl, orregiurl, updateshopurl, updategoodsurl, rejisturl, codeurl, merchantorderurl, getpreferurl, delepreferurl,
  getdishesurl, deledishesurl, editstateurl, searchdishesurl, getopenidurl, getechartdataurl, updatedealurl,
  getcommeturl, replaymesurl, uploadImg
}
