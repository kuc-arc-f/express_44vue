import HttpCommon from '../lib/HttpCommon';
import LibConfig  from '../lib/LibConfig';
import LibCrypto from '../lib/LibCrypto'
import Crud from './Crud';
//
const CrudIndex = {
  /**
   * getList
   * @param
   *
   * @return
   */
  getList :async function (): Promise<any>
  {
    try{
        const postItem = {
            userId: 0,
        }
console.log(postItem); 
        const json = await HttpCommon.post(postItem, "/api/torso/get_list");
//console.log(json);      
        let items: any[] = [];
        items = json.data;
console.log(items);
        return items;
    } catch (e) {
        console.error(e);
        throw new Error("Error, getList");
    } 
  },  
  /**
   * getList
   * @param
   *
   * @return
   */
  getItem :async function (): Promise<any>
  {
    try{
      let ret = {};
      const values = Crud.getInputValues();
console.log(values); 
      const postItem = {
          email: values.email,
      }
console.log(postItem);
      const json = await HttpCommon.post(postItem, "/api/user/get");
console.log(json);      
//console.log(items);
      if(json.ret !== LibConfig.OK_CODE){
        throw new Error("json.ret <> OK");
      }
      if(json.data && json.data.length > 0){
        ret = json.data[0];
      }
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error("Error, getItem");
    } 
  }, 
  /**
   *
   * @param
   *
   * @return
   */
  addItem : async function() : Promise<any>
  {
    let ret = false;
    try{
        
        const values = Crud.getInputValues();
        const hashedPassword = LibCrypto.encode(values.password);
        const item = {
            "api_key": "",
            "name": values.name,
            "email": values.email,
            "password": hashedPassword,
        };            
console.log(item);
        const json = await HttpCommon.post(item, "/api/user/create");
console.log(json);
        if (json.ret ===  LibConfig.OK_CODE) {
            ret = true;
        }
        return ret;
    } catch (e) {
        console.error("Error, addItem");
        console.error(e);
        return ret;
    }
  },
}

export default CrudIndex;
