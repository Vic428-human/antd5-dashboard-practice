// 假設這裡都是拿get的資料
import colorSystemAxios from  "./colorSystemAxios";
import { type savePayload } from "../types/global/save.ts";

// 舉例： 透過語言，拿到球種，這支範例API不會用到商戶token
// 但是其他API，像是獲取設定檔，都會基於token來獲取透過 interceptors.request.use 方式授權 config.headers.Authorization
export const apiLangStatic = () => colorSystemAxios.get(`lang-static/?language=en&page_names=burger`);

export const saveAPI = (payload: savePayload) => colorSystemAxios.post<any>(`admin/merchant/merchant-spec-appearance/`, payload);
