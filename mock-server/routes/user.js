/**
 * @description 用户模块路由定义，用于用户相关接口实现
 */
const router = require('koa-router')()
router.get("/add", async (ctx) => {
  ctx.body = mock.mock({
    "code": 0,
    "result": "Ok"
  })
});
router.get("/edit", async (ctx) => {
  ctx.body = mock.mock({
    "code": 0,
    "result": "Ok"
  })
});
router.get("/delete", async (ctx) => {
  ctx.body = mock.mock({
    "code": 0
  })
});
module.exports = router;