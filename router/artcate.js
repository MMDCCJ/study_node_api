const express = require("express")
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const artCate_handler = require('../router_handler/artcate')
const {add_cate_schema} = require("../schema/artcate")
router.get('/cates', artCate_handler.getArticleCates)
router.post('/addcates',expressJoi(add_cate_schema),artCate_handler.addArticleCates)
module.exports = router