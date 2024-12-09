const { app } = require('electron');
const Store = require("electron-store");

exports.runBadExample = async () => {
   const result = {
       apiKey: null,
       storePath: null,
       message: ''
   };

   try {
       // Store初期化（暗号化なし）
       const store = new Store({ 
           name: "bad-example",
           cwd: app.getPath('userData')
       });

       // 機密情報を保存（暗号化なし）
       store.set("apiKey", "my-secret-api-key");

       // 結果を設定
       result.apiKey = store.get("apiKey");
       result.storePath = store.path;
       result.message = '⚠️ APIキーが平文で保存されました。これは安全ではありません！';

       return result;

   } catch (error) {
       throw new Error(`Bad Example Error: ${error.message}`);
   }
};
