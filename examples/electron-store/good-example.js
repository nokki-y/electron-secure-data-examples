const { app } = require('electron');
const Store = require("electron-store");

exports.runGoodExample = async () => {
    const result = {
        apiKey: null,
        storePath: null,
        message: ''
    };

    try {
        // Store初期化（暗号化あり）
        const store = new Store({ 
            name: "good-example",
            cwd: app.getPath('userData'),
            encryptionKey: process.env.ENCRYPTION_KEY,
            clearInvalidConfig: true // 無効な設定ファイルをクリア
        });

        // 既存のデータをクリア
        store.clear();

        // 機密情報を保存（暗号化あり）
        store.set("apiKey", "my-secret-api-key");

        // 結果を設定
        result.apiKey = store.get("apiKey");
        result.storePath = store.path;
        result.message = '✅ APIキーが暗号化されて保存されました。これは安全な実装例です！';

        return result;

    } catch (error) {
        throw new Error(`Good Example Error: ${error.message}`);
    }
};
