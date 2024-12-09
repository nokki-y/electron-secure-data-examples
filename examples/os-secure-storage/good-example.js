const { app } = require('electron');
const keytar = require("keytar");
const os = require("os");

exports.runGoodExample = async () => {
    const result = {
        apiKey: null,
        storePath: null,
        message: ''
    };

    try {
        const service = "myApp";
        const account = "user_a";
        const apiKey = "my-secret-api-key";

        // セキュアストレージに保存
        await keytar.setPassword(service, account, apiKey);

        // 保存したAPIキーを取得
        const retrievedKey = await keytar.getPassword(service, account);

        // 結果を設定
        result.apiKey = retrievedKey;
        result.storePath = os.platform() === "darwin" ? 
            "Keychain Access" : 
            "OSのセキュアストレージ";
        result.message = '✅ APIキーがOSのセキュアストレージに保存されました。これは安全な実装例です！';

        return result;

    } catch (error) {
        throw new Error(`Good Example Error: ${error.message}`);
    }
};
