import express from 'express';
import axios from 'axios';
import { createClient } from "@libsql/client";
const router = express.Router();
import LibTurso from '../lib/LibTurso';

/*
const client = createClient({
  url: process.env.TORSO_URL,
  authToken: process.env.TORSO_AUTH_TOKEN,
});
*/
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
    const resulte = await client.execute("SELECT * FROM test");
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
    //console.log("url=", process.env.API_URL);
      const client = await LibTurso.getClient();
      const resulte = await client.execute("SELECT * FROM test ORDER BY id DESC LIMIT 100;");
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
      INSERT INTO test (title, content) VALUES(
      '${body.title}' , '${body.content}'
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
export default router;
