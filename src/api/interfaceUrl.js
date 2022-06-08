const interfaceUrl = {
     //登录页面
     login:'/seaadmin/auth', //用户登录
     kaptcha: '/seaadmin/kaptcha/new?&timestamp=', //图片验证码
     qryMaterialLiftlist: 'cusBase/materialLift/qryMaterialLiftList',
     dealMaterialLift:'cusBase/materialLift/dealMaterialLift', //快速提离提交
     queryDec:'cusBase/cusvisual/queryDec?entryId=',  //通关查询
     getHisWord:'cusBase/searchword/getHisWord',  //搜索记录
     clear:'cusBase/searchword/clear',//清除历史记录
     queryCusEntryLst:'cusBase/cusvisual/queryCusEntryLst',  //报关单列表查询接口
}


export default interfaceUrl

