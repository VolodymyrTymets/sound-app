
mkdir server/public
rm -rf  server/public/build
rm -rf  electron/node_modules/server

cd client
npm run build
cd ..

mv client/build server/public/build
cd electron
npm i ../server