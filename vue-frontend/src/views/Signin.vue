<template>
  <Nav />
  <div id="signupForm">
    <h3>INSCRIPTION</h3>
    <form @submit="onSubmit">
      <input type="text" name="username" placeholder="Username">
      <input type="email" name="email" placeholder="Email">
      <input type="password" name="password" placeholder="Mot de passe">
      <input type="password" name="confirm" placeholder="Confirmation mot de passe">
      <input type="submit" value="Inscription" class="btn">
    </form> 
  </div>
  <div>
    <p>Je possède déjà un compte ? Cliquez ici: <router-link to="/login">Login</router-link></p>
  </div> 
</template>

<script>
import Nav from '../components/Nav.vue'
export default {
  name: 'Signin',
  components: {
    Nav
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      console.log(this.firstName);
    }
  }
}
</script>

<style>
form {
  display: flex;
  flex-direction: column;
  width: 400px;
}
input {
  margin: 6px 6px 6px 0px;
  padding: 10px;
  box-shadow: 3px 5px 6px 2px rgb(0 0 0 / 10%);
  border-style: none;
  border-radius: 16px
}
.btn {
  color: white;
  background-color: rgba(0, 128, 0, 0.836);
}
</style>
