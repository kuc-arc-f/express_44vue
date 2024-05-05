
const validCommon = {
  /**
   * メッセージを、取得する。
   * @param
   *
   * @return
   */
  getMessageObj: function(target: any){
//    let ret = {}
    const outValues: any = {};
    try{    
      const keys = Object.keys(target);
      keys.forEach((key) => {
        let tmp = target[key]; 
//console.log(typeof(tmp));
        outValues[key] = "";
        if(tmp[0]){
          console.log(tmp);
          outValues[key] = tmp[0]; 
        }
      });
      return outValues;
    } catch (e) {
      console.error(e);
      throw new Error('Error , getInputValues');
    }
  },

}
export default validCommon;
