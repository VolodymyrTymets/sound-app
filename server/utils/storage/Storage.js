const usbDetect = require('usb-detection');
const drivelist = require('drivelist');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const home = require('os').homedir();

class Storage {
	constructor() {
		usbDetect.startMonitoring();
		this._appName = 'Sound-App';
		this._usbDriver = null;
		this._dateFormat = 'DD-MM-YYYY';
		this._minuteFormat = 'HH mm';
		this._socket = null;
		this._socketEventName = '';

		usbDetect.on('add', () => this._setUSBPath());
		usbDetect.on('remove', () => {
			this._usbDriver  = null;
			const path = this.getPath();
			console.log('local path -> ', path)
			this._socket && this._socket.emit(this._socketEventName, { path});
		});

		this._setUSBPath();
	}

	_setUSBPath() {
		setTimeout(() => {
			drivelist.list((error, drives) => {
				if (!error) {
					const usbDrivers = drives.filter(d => d.isUSB);
					const usbDriver = usbDrivers[0];
					if(usbDriver && usbDriver.mountpoints[0]) {
						this._usbDriver = usbDriver.mountpoints[0];
						const path = this.getPath();
						this._socket && this._socket.emit(this._socketEventName, { path });
					}
				}
			});
		}, 2000);
	}
	_getUSBPath() {
		return path.resolve(this._usbDriver.path, this._appName);
	}
	_getPCPath() {
		return path.resolve(home ,`Documents/${this._appName}/`);
	}

	saveSocket(socket, enevntName) {
		this._socket = socket;
		this._socketEventName = enevntName;
	}

	getPath() {
		return this._usbDriver ? this._getUSBPath() : this._getPCPath();
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