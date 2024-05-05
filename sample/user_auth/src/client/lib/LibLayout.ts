
import LibConfig from './LibConfig';
import LibCookie from './LibCookie';
//
const LibLayout = {
  /**
   *
   * @param key: any
   *
   * @return
   */  
  startProc : async function() : Promise<any>
  {
    //console.log("#Layout.startProc");
    let ret = false;
    const parsedUrl = new URL(window.location.href);
    if(
        !(parsedUrl.pathname === '/login' ||
        parsedUrl.pathname === '/usercreate'
        )
    )
    {
console.log("LibLayout.pathname=", parsedUrl.pathname);
      const name = import.meta.env.VITE_APP_NAME + "_auth";
      const authValue = localStorage.getItem(name);
      console.log(authValue);
      if(!authValue){
        location.href = '/login';
        return;
      }
    }
    return ret;
  }
}
//LibLayout.startProc();

export default LibLayout;
