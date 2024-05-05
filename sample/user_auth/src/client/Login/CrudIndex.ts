import HttpCommon from '../lib/HttpCommon';
import LibConfig  from '../lib/LibConfig';
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
      } catch (e) {
          console.error(e);
          throw new Error("Error, getList");
      } 
  },  
  /**
   *
   * @param
   *
   * @return
   */
  login : function() : boolean
  {
    try{
      let ret = false;
      const values = Crud.getInputValues();
console.log(values);
      const email = import.meta.env.VITE_AUTH_USER;
      const password = import.meta.env.VITE_AUTH_PASSWORD;
      //console.log("email=", email);
      if(
          (values.email === email) && (values.password === password)
      ){
          return true;
      }
      return ret;
    } catch (e) {
      console.error("Error, login");
      console.error(e);
      throw new Error('Error , login');
    }
  },
}

export default CrudIndex;
