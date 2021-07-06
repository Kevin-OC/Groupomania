<template>
  <div id="container">
    <router-view/>
    <div id="dot"></div>   
  </div>  
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
* {
  font-family: 'Roboto', sans-serif;
  font-size: 1.06rem;
  margin: 0;
  padding: 0;
}
#container {
  max-width: 80%;
  min-height: 100vh;
  margin: auto;
}
#dot {
  margin: auto;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
}
button {
  cursor: pointer;
}
button:active {
  transform: scale(0.98);
}
</style>