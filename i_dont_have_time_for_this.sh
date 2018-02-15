rm -rf ascii2d/node_modules &&
rm -rf prerender/node_modules &&
rm -rf web/node_modules &&

cd ascii2d &&
npm install &&
npm run build &&
cd .. &&

cd prerender &&
npm install &&
npm run prerender &&
cd .. &&

cd web &&
yarn install &&
yarn start