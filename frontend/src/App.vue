<template>
  <div id="app" >
    <header>
    <nav class="c">
        <div style="float:left;" >
        <router-link to="/ "><img src="./assets/sx_log.png" left></router-link>
        </div>
      <router-link to="/home">DASHBOARD</router-link> &nbsp;
      <router-link to="/moni">MONITORING</router-link>&nbsp;
      <router-link to="/log">LOG</router-link>&nbsp;
      <router-link to="/set">SETTING</router-link>&nbsp;
    </nav>
    <router-view/>
    </header>
  </div>
</template>


<script>
import Slider from '@jeremyhamm/vue-slider'

export default {
  name: 'App',
  components: {
    'slider': Slider
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

@font-face {
    font-family: 'HallymGothic-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2204@1.0/HallymGothic-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}

nav{
    text-align: right;
    box-shadow:0 1px 1px #ccc;
    border-radius:0 2px 2px 0;
    padding: 30px;
    font-size:25px;
    font-family: HallymGothic-Regular;
}



nav a{
  font-weight : bold;
  color :#2c3e50
}



.c {
        letter-spacing: 5px;
        font-size:18px;
}

.a {
        background-color: #dfeffc;
}

nav a.router-link-exact-active {
  color: #4387d4;
}
</style>
