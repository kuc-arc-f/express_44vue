

const Crud = {
  /* modal-name */
  modalIdName: {
    show: "page_show_modal_1",
    edit: "page_edit_modal_1",
  },
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
        'name', 'email', 'password',
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
  /**
  * startProc
  * @param
  *
  * @return
  */   
  startProc :async function (): Promise<void> 
  {
    try{
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
//Crud.startProc();

export default Crud;
