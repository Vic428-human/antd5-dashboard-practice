import axios from 'axios';

const colorSystemAxios = axios.create({
  baseURL: 'XXX',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// 透過header代入token，讓之後呼叫的API 都會帶上這個token去進行CRUD
colorSystemAxios.interceptors.request.use((config) => {
  // 預設從狀態管理獲得 商戶 token
  // if ('商戶 token') {
  //   config.headers.Authorization = `Bearer ${'商戶 token'}`;
  // }
  console.log('當商戶token拿到後，就會拿到相關的設定檔');
  return config;

});


// 統一錯誤處理
colorSystemAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    // API 有回應，但是錯誤的 status（例如 400, 401, 500）
    if (error.response) {
      const { status, data } = error.response;
      console.error('❌ API Error:', status, data);
      return Promise.reject(error); // 讓上層仍可 catch 或 react-query 捕捉
    }
  }
);

export default colorSystemAxios;