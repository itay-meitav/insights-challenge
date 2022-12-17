sudo apt-get install tor
tor
cd server
npm run build
cd ../client
npm run build
cp -r dist ../server/dist
