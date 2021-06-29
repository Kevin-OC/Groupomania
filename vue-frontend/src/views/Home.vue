<template>
  <Nav redirection="/home" />
</template>

<script>
import Nav from '../components/Nav.vue'
export default {
  name: 'Home',
  components: {
    Nav
  },
  data() {
    return {
      logged: true
    }
  }
}
</script>