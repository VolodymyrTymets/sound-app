rm -rf ../server/node_modules
cd ../server
npm i
cd ../electron
rm -rf node_modules
npm i server
npm i
./node_modules/.bin/electron-rebuild -v 2.0.5