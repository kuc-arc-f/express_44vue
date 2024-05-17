import { z } from 'zod';
import validCommon from '../lib/validCommon';
//
const FormData = z.object({
    title: z
    .string()
    .min(1, { message: '1文字以上入力してください。' }),
    content: z
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
