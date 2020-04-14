# vue-mobile-boilerplate

## Before Start ( *Notice* )

```
cp .example.env .env.development
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn start
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



## Issue

*问题*   

ERROR: Failed to download Chromium r609904! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" env variable t...

*解决*

```
npm config set puppeteer_download_host=https://npm.taobao.org/mirrors

npm i xxx
```
