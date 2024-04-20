import HttpCommon from '../lib/HttpCommon';
import LibConfig  from '../lib/LibConfig';
import Crud from './Crud';
//
const CrudShow = {
    /**
     *
     * @param
     *
     * @return
     */
    get :async function (id: number): Promise<any>
    {
        try{
            const postItem = {
                id: id,
            }
            //console.log(postItem); 
            const json = await HttpCommon.serverPost(postItem, "/test/get");
//console.log(json);      
            let items: any[] = [];
            items = json.data;
//console.log(items);
            return items;
        } catch (e) {
            console.error(e);
            throw new Error("Error, get");
        } 
    },  
   /**
   * delete:
   * @param key: any
   *
   * @return
   */   
    delete : async function(id: number) : Promise<any>
    {
        try{
            let ret = false;
            const item = {
                id: id
            }
        //console.log(item);
            const json = await HttpCommon.serverPost(item, '/test/delete');
        //console.log(json);
            if (json.ret ===  LibConfig.OK_CODE) {
                ret = true;
            }      
            return ret;      
        } catch (e) {
            console.error(e);
        }
    },         
        /**
     *
     * @param
     *
     * @return
     */
    update : async function(id: number) : Promise<any>
    {
        try{
            let ret = false;
            const values = Crud.getInputValues();
            values.userId = 0;
            values.id = id;
//            values.content = "";
            values.completed = 0;
console.log(values);
//return;
            const json = await HttpCommon.post(values, '/test/update');
console.log(json);
            if (json.ret ===  LibConfig.OK_CODE) {
                ret = true;
            }
            //clear
            Crud.clearInputValues(); 
            return ret;
        } catch (e) {
            console.error("Error, update");
            console.error(e);
            throw new Error('Error , update');
        }
    },
}

export default CrudShow;
