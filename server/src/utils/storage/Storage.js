const moment = require('moment');
const path = require('path');
const fs = require('fs');
const home = require('os').homedir();

class Storage {
	constructor(config) {
		this._appName = config.storeFolderName;
		this._dateFormat = 'DD-MM-YYYY';
		this._minuteFormat = 'HH-mm-ss';
	}

	getPath() {
		return path.resolve(home ,`Documents/${this._appName}/`);
	}

	getFolderName (startRecordDate) {
		const folderPath = this.getPath();
		if (!fs.existsSync(folderPath)){
			fs.mkdirSync(folderPath);
		}
		const dateFolder = path.resolve(folderPath, `date_${moment(startRecordDate).format(this._dateFormat)}`);
		if (!fs.existsSync(dateFolder)){
			fs.mkdirSync(dateFolder);
		}
		const minuteFolder = path.resolve(dateFolder, `time_${moment(startRecordDate).format(this._minuteFormat)}`);
		if (!fs.existsSync(minuteFolder)){
			fs.mkdirSync(minuteFolder);
		}
		return minuteFolder;
	}
}

module.exports = { Storage };