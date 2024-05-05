
import { createClient } from "@libsql/client";
//
const  LibTurso = {
  /**
  * 
  * @param
  *
  * @return
  */ 
  getClient: function(){
    try{
//console.log("TURSO_URL=", process.env.TURSO_URL);
//console.log("TURSO_AUTH_TOKEN=", process.env.TURSO_AUTH_TOKEN);
      const client = createClient({
        url: process.env.TURSO_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
      });
      return client;      
    } catch (err) {
      console.log(err);
      throw new Error('Error, getClient');
    }
  },       
}
export default LibTurso;
