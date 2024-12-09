const { app } = require('electron');
const Datastore = require("nedb");
const path = require("path");

exports.runBadExample = async () => {
	const result = {
		userData: null,
		storePath: null,
		message: ''
	};

	try {
		// 保存ファイルパス
		const dbFilePath = path.join(app.getPath('userData'), "users.db");
		const db = new Datastore({ filename: dbFilePath, autoload: true });

		const data = { username: "user_a", password: "mypassword" };

		const newDoc = await new Promise((resolve, reject) => {
			db.insert(data, (err, doc) => {
				if (err) reject(err);
				else resolve(doc);
			});
		});

		// 結果を設定
		result.userData = newDoc;
		result.storePath = dbFilePath;
		result.message = '⚠️ パスワードが平文で保存されました。これは安全ではありません！';

		return result;

	} catch (error) {
		throw new Error(`Bad Example Error: ${error.message}`);
	}
};
