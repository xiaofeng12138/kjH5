const BASEURL = process.env.NODE_ENV === 'production' ?  process.env.VUE_APP_PRO : process.env.VUE_APP_ABC; //判断是dev 还是pro 环境

export default BASEURL