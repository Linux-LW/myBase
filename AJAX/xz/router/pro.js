const express=require('express');
const router =express.Router();
const ajaxPool =require('../pool/pool.js');

//登录  get 
router.get('/v1/login',(req,res)=>{
	var $uname =req.query.uname
	var $upwd =req.query.upwd
	console.log($uname)
	console.log($upwd)
	ajaxPool.query('select * from xz_user where uname=? and upwd=?',[$uname,$upwd],(err,s)=>{
		if(err)throw err;
		if(s.length>0){
			res.send("1")
		}else{
			res.send("0")
		}
	})
})
//查询列表  get  /pro/v1/list
router.get('/v1/list',(req,res)=>{
	ajaxPool.query('select * from xz_user',(err,result)=>{
		if(err)throw err;
		res.send(result);
	})
})
//根据id删除用户 delete /pro/v1/del/:uid  响应 1  成功  0  失败
router.delete('/v1/delete/:uid',(req,res)=>{
	var $uid=req.params.uid
	ajaxPool.query('delete from xz_user where uid=?',[$uid],(err,s)=>{
		if(s.affectedRows>0){
			res.send("1")
		}else{
			res.send("0")
		}
	})
})
//根据uid查询用户信息 get  /pro/v1/search/:uid//响应 json
router.get('/v1/search/:uid',(req,res)=>{
	var $uid =req.params.uid
	ajaxPool.query('select * from xz_user where uid=?',[$uid],(err,s)=>{
		if(err)throw err;
		if(s.length>0){
			res.send(s)
		}else{
			res.send("0")
		}
	})
});

//根据uid修改用户信息  put/pro/v1/update/
//  1成功 0失败
router.put('/v1/update',(req,res)=>{
	var obj=req.body
	var $uid=req.body.uid
	var $uname=req.body.uname
	var $upwd=req.body.upwd
	var $email=req.body.email
	var $phone=req.body.phone
	var $avatar=req.body.avatar
	var $user_name=req.body.user_name
	var $gender=req.body.gender
	ajaxPool.query('update xz_user set ? where uid =?',[obj,$uid],(err,s)=>{
		if(err)throw err;
		if(s.affectedRows>0){
			res.send("1")

		}else{
			res.send("0")
		}
	})
});

//get restful login
router.get('/restful_login/:uname&:upwd',(req,res)=>{
	var $uname =req.params.uname
	var $upwd =req.params.upwd
	ajaxPool.query("select * from xz_user where uname=? and upwd=?",[$uname,$upwd],(err,s)=>{
		if(err)throw err;
		if(s.length>0){
			res.send("1")
		}else{
			res.send("0")
		}
	})
})
module.exports=router;