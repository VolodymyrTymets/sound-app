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
		usbDetect.on('add', () => this._setUSBPath());
		usbDetect.on('remove', () => { this._device = null; });
		this._dateFormat = 'DD-MM-YYYY';
		this._minuteFormat = 'HH-MM';
		this._setUSBPath();
	}

	_setUSBPath() {
		drivelist.list((error, drives) => {
			if (!error) {
				const usbDrivers = drives.filter(d => d.isUSB);
				const usbDriver = usbDrivers[0];
				if(usbDriver && usbDriver.mountpoints[0]) {
					this._usbDriver = usbDriver.mountpoints[0];
				}
			}
		});
	}
	_getUSBPath() {
		return path.resolve(this._usbDriver.path, this._appName);
	}
	_getPCPath() {
		return path.resolve(home ,`Documents/${this._appName}/`);
	}

	getPath() {
		return this._usbDriver ? this._getUSBPath() : this._getPCPath();
	}

	getFolderName () {
		console.log('home ->', home);
		const folderPath = this.getPath();
		if (!fs.existsSync(folderPath)){
			fs.mkdirSync(folderPath);
		}
		const dateFolder = path.resolve(folderPath, moment().format(this._dateFormat));
		if (!fs.existsSync(dateFolder)){
			fs.mkdirSync(dateFolder);
		}
		const minuteFolder = path.resolve(dateFolder, moment().format(this._minuteFormat));
		if (!fs.existsSync(minuteFolder)){
			fs.mkdirSync(minuteFolder);
		}
		return minuteFolder;
	}
}

const storage = new Storage();

module.exports = { storage };