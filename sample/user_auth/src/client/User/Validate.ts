import { z } from 'zod';
import validCommon from '../lib/validCommon';
//
const FormData = z.object({
  email: z
    .string()
    .min(1, { message: '1文字以上入力してください。' }),
  password: z
    .string()
    .min(4, { message: '4文字以上入力してください。' }),
  name: z
    .string()
    .min(1, { message: '1文字以上入力してください。' }),
});
//
const Validate = {
  /**
   * 
   * @param
   *
   * @return
   */
  formValidate: function(input){
    let errors = {};
    try {
      FormData.parse(input);
//console.log(input);
      return errors;
    } catch (e) {
      const errors = validCommon.getMessageObj(e.flatten().fieldErrors);
      console.log(errors);
      console.error(e.flatten().fieldErrors);
      return errors;
    }
  },
}
export default Validate;
