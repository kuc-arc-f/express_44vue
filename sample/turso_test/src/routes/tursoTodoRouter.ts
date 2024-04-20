import express from 'express';
//import axios from 'axios';
//import { createClient } from "@libsql/client";
const router = express.Router();
import LibTurso from '../lib/LibTurso';

/**
* 
* @param
*
* @return
*/
router.get('/test', async function(req: any, res: any) {
  try {
    const client = await LibTurso.getClient();
    //console.log("url=", process.env.API_URL);
//    const resulte = await client.execute("SELECT * FROM test");
    const resulte = await client.execute("SELECT * FROM todos");
    console.log(resulte.rows);
    //return res.json(response.data);
    return res.json({data: resulte.rows});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
/**
* 
* @param
*
* @return
*/
router.post('/get_list', async function(req: any, res: any) {
  try {
    const retObj = {ret: "NG", data: [], message: ""};
    if(req.body){
console.log('#POST /get_list');
    //console.log("url=", process.env.API_URL);
      const client = await LibTurso.getClient();
      const sql = `SELECT * FROM todos ORDER BY id DESC LIMIT 100;`;
console.log(sql);
      const resulte = await client.execute(sql);
//console.log(resulte.rows);
      retObj.ret = "OK";
      //@ts-ignore
      retObj.data = resulte.rows;
      return res.json(retObj);
    }
    return res.json(retObj);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
/**
* 
* @param
*
* @return
*/
router.post('/create', async function(req: any, res: any) {
  try {
    const retObj = {ret: "NG", data: [], message: ""};
    if(req.body){
      const body = req.body;
console.log(body);
      const sql = `
      INSERT INTO todos (title, content, userId) VALUES(
      '${body.title}' , '${body.content}' , 0
      )
      `;
console.log("sql=", sql);
      const client = await LibTurso.getClient();
      const resulte = await client.execute(sql);
//console.log(resulte.rows);
      retObj.ret = "OK";
      //@ts-ignore
      retObj.data = resulte.rows;
      return res.json(retObj);
    }
    return res.json(retObj);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
/**
* 
* @param
*
* @return
*/
router.post('/get', async function(req: any, res: any) {
  try {
    const retObj = {ret: "NG", data: [], message: ""};
    if(req.body){
      const body = req.body;
    //console.log("url=", process.env.API_URL);
      const client = await LibTurso.getClient();
      const sql = `SELECT * FROM todos WHERE id=${body.id};`;
console.log(body);
console.log(sql);
      const resulte = await client.execute(sql);
//console.log(resulte.rows);
      retObj.ret = "OK";
      //@ts-ignore
      retObj.data = resulte.rows;
      return res.json(retObj);
    }
    return res.json(retObj);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
/**
* 
* @param
*
* @return
*/
router.post('/delete', async function(req: any, res: any) {
  try {
    const retObj = {ret: "NG", data: [], message: ""};
    if(req.body){
      const body = req.body;
    //console.log("url=", process.env.API_URL);
      const client = await LibTurso.getClient();
      const sql = `DELETE FROM todos WHERE id=${body.id};`;
console.log(body);
console.log(sql);
      const resulte = await client.execute(sql);
//console.log(resulte.rows);
      retObj.ret = "OK";
      //@ts-ignore
      retObj.data = resulte.rows;
      return res.json(retObj);
    }
    return res.json(retObj);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
export default router;
