
//
const Crud = {
  /**
   * 
   * @param key: any
   *
   * @return
   */
  getInputValues: function() : any
  {
    try{
      const inputValues: any = {};
      const idList: any[] = [
        'email',
        'password',
      ];
      idList.forEach((id) => {
        const inputElement = document.querySelector(`#${id}`) as HTMLInputElement;
        if (inputElement) {
            let target = inputElement.value;
            inputValues[id] = "";
            if(target) {
                inputValues[id] = target.trim();
            }
        }else{
            inputValues[id] = "";
        }
      });
      return inputValues;
    } catch (e) {
      console.error(e);
      throw new Error('Error , getInputValues');
    }
  },  
  /**
   * 
   * @param
   *
   * @return
   */  
  clearInputValues: function() : void
  {
    try{
      // inputタグから値を取得し、オブジェクトにセットする
      const title = (<HTMLInputElement>document.querySelector("#title"));
      if(title) {title.value = "";}
      const content = (<HTMLInputElement>document.querySelector("#content"));
      if(content) {content.value = "";}
    } catch (e) {
      console.error(e);
      throw new Error('Error , getInputValues');
    }
  }, 
}

export default Crud;
