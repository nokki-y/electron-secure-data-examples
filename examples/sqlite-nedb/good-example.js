const { app } = require('electron');
const Datastore = require("nedb");
const bcrypt = require("bcrypt");
const path = require("path");

exports.runGoodExample = async () => {
	const result = {
		userData: null,
		storePath: null,
		message: ''
	};

	try {
		// 保存ファイルパス
		const dbFilePath = path.join(app.getPath('userData'), "users.db");
		const db = new Datastore({ 
			filename: dbFilePath, 
			autoload: true,
			fileMode: 0o600
		});

		const data = { username: "user_a", password: "mypassword" };
		const saltRounds = 10;

		// パスワードのハッシュ化
		const hash = await bcrypt.hash(data.password, saltRounds);

		// ハッシュ化したパスワードで置き換え
		const secureData = {
			username: data.username,
			password: hash
		};

		const newDoc = await new Promise((resolve, reject) => {
			db.insert(secureData, (err, doc) => {
				if (err) reject(err);
				else resolve(doc);
			});
		});

		// 結果を設定（パスワードは非表示に）
		result.userData = { 
			...newDoc, 
			password: '[HASHED]' 
		};
		result.storePath = dbFilePath;
		result.message = '✅ パスワードがハッシュ化されて保存されました。これは安全な実装例です！';

		return result;

	} catch (error) {
		throw new Error(`Good Example Error: ${error.message}`);
	}
};
