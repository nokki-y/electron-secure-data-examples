const { app } = require('electron');
const fs = require("fs");
const path = require("path");

exports.runBadExample = async () => {
    const result = {
        userData: null,
        storePath: null,
        message: ''
    };

    try {
        // 保存ファイルパス
        const filePath = path.join(app.getPath('userData'), "userData.json");
        
        const data = { username: "user_a", password: "mypassword" };

        // 平文で保存
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        // 結果を設定
        result.userData = data;
        result.storePath = filePath;
        result.message = '⚠️ ユーザーデータが平文で保存されました。これは安全ではありません！';

        return result;

    } catch (error) {
        throw new Error(`Bad Example Error: ${error.message}`);
    }
};
