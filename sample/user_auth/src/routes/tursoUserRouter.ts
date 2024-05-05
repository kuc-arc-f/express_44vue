import express from 'express';
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
      INSERT INTO User (name, email, password, updatedAt) VALUES(
      '${body.name}' , '${body.email}', '${body.password}', CURRENT_TIMESTAMP
      );
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
      const sql = `
        SELECT * FROM User WHERE email='${body.email}';
      `;
//console.log(body);
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
      return res.json(retObj);
    }
    return res.json(retObj);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
export default router;
