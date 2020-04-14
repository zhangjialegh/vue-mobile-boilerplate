# vue-mobile-boilerplate

## Before Start ( *Notice* )

```
cp .example.env .env.development
```

## Project setup
```
yarn
```

### Compiles and hot-reloads for development
```
yarn start
```

### Compiles and minifies for production
```
yarn build
```

## Issue

*问题*   

ERROR: Failed to download Chromium r609904! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" env variable t...

*解决*

```
npm config set puppeteer_download_host=https://npm.taobao.org/mirrors

npm i xxx
```
