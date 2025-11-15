const{Router}=require('express');const r=Router();r.get('/health',(_req,res)=>res.json({ok:true,status:'ok',uptime:process.uptime(),now:new Date().toISOString(),version:'1.0.1'}));module.exports=r;
