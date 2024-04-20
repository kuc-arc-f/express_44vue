require('dotenv').config();

const Common = {
  /**
  *
  * @param
  *
  * @return: false= NG
  */   
  validApiKey: function (body: any): any
  {
    try{
      let ret = false;
      const envKey = process.env.API_KEY;
      if(!envKey){
        return true;
      }
//console.log("envKey=", envKey);
      if (!body.external_api_key) {
        return ret;
      }
      if (body.external_api_key !== envKey) {
        return ret;
      }
      ret = true;
      return ret;
    } catch (e) {
      console.error(e);
    }    
  },
}
export default Common;
