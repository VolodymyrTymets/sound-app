const moment = require('moment');
const path = require('path');
const fs = require('fs');
const home = require('os').homedir();
const config = require('../../config');

class Storage {
	constructor() {
		this._appName = config.storeFolderName;
		this._dateFormat = 'DD-MM-YYYY';
		this._minuteFormat = 'HH mm';
	}

	getPath() {
		return path.resolve(home ,`Documents/${this._appName}/`);
	}

	getFolderName (startRecordDate) {
		const folderPath = this.getPath();
		if (!fs.existsSync(folderPath)){
			fs.mkdirSync(folderPath);
		}
		const dateFolder = path.resolve(folderPath, moment(startRecordDate).format(this._dateFormat));
		if (!fs.existsSync(dateFolder)){
			fs.mkdirSync(dateFolder);
		}
		const minuteFolder = path.resolve(dateFolder, moment(startRecordDate).format(this._minuteFormat));
		if (!fs.existsSync(minuteFolder)){
			fs.mkdirSync(minuteFolder);
		}
		return minuteFolder;
	}

	_getFileNameByTime(startRecordDate) {
		const duration = moment.duration(moment().diff(startRecordDate));
		return`${duration.minutes()} m ${duration.seconds()} s`;
	}
	getSegmentsFolder(startRecordDate) {
	  const fileName = this._getFileNameByTime(startRecordDate);
		const segmentsFolderPath = path.resolve(this.getFolderName(startRecordDate), './segments');
		if (!fs.existsSync(segmentsFolderPath)){
			fs.mkdirSync(segmentsFolderPath);
		}
		return path.resolve(segmentsFolderPath, `${fileName}.wav`);
	}
	getTissueFolder(startRecordDate, typeOfTissue) {
		const fileName = this._getFileNameByTime(startRecordDate);
		const segmentsFolderPath = path.resolve(this.getFolderName(startRecordDate), `./${typeOfTissue}`);
		if (!fs.existsSync(segmentsFolderPath)){
			fs.mkdirSync(segmentsFolderPath);
		}
		return path.resolve(segmentsFolderPath, `${fileName}.wav`);
	}
}

const storage = new Storage();

module.exports = { storage };