<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<style>
html {
  height: 100%;
}
body {
  height: 100%;
}
* {
  box-sizing: border-box;
}
#app {
  color: #2c3e50;
  background-color: #f5f5f5;
  min-height: 100%;
}
</style>
