<template>
  <div id="app">
    <img src="./assets/screenx.png" width="400px" height="100px">
    <hr>
    <nav>
      <router-link to="/home">대시보드</router-link>    |
      <router-link to="/moni">모니터링</router-link>    |
      <router-link to="/log">로그</router-link>    |
      <router-link to="/set">설정</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav{
  padding: 30px;
  font-size:40px;
}

nav a{
  font-weight : bold;
  color :#2c3e50
}


nav a.router-link-exact-active {
  color: #42b983;
}
</style>
