const { app } = require('electron');
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
require('dotenv').config();

exports.runGoodExample = async () => {
    const result = {
        userData: null,
        storePath: null,
        message: ''
    };

    try {
        // 保存ファイルパス
        const filePath = path.join(app.getPath('userData'), "userData.enc");

        // 暗号化設定
        const algorithm = "aes-256-gcm";
        const salt = crypto.randomBytes(16);
        const key = crypto.scryptSync(process.env.ENCRYPTION_KEY, salt, 32);
        const iv = crypto.randomBytes(16);

        const data = { username: "user_a", password: "mypassword" };

        // データを暗号化して保存
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const authTag = cipher.getAuthTag();

        // 暗号化データ、IV、認証タグ、ソルトをファイルに保存
        const saveData = {
            iv: iv.toString('hex'),
            salt: salt.toString('hex'),
            authTag: authTag.toString('hex'),
            encryptedData: encrypted
        };

        fs.writeFileSync(filePath, JSON.stringify(saveData));

        // 結果を設定
        result.userData = data;
        result.storePath = filePath;
        result.message = '✅ ユーザーデータが暗号化されて保存されました。これは安全な実装例です！';

        return result;

    } catch (error) {
        throw new Error(`Good Example Error: ${error.message}`);
    }
};
