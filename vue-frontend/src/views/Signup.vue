<template>
  <Nav redirection="/login" />
  <div id="signupForm">
    <h3>Sign up</h3>
    <form @submit="onSubmit">
      <input type="text" name="username" placeholder="Username" v-model="username">
      <input type="email" name="email" placeholder="Email" v-model="email">
      <input type="password" name="password" placeholder="Mot de passe" v-model="password">
      <input type="password" name="confirm" placeholder="Confirmation mot de passe" v-model="confirm">
      <input type="submit" value="Je m'inscris !" class="btn">
    </form>
    <h4>{{ errMsg }}</h4>
    <p>Je possède déjà un compte ? Cliquez ici: <router-link to="/login">Login</router-link></p>
  </div>    
</template>

<script>
import Nav from '../components/Nav.vue'
export default {
  name: 'Signup',
  components: {
    Nav
  },
  data() {
    return {
      username: null,
      email: null,
      password: null,
      confirm: null,
      errMsg: null
    }
  },
  methods: {
    onSubmit(e) {
      // prévient le rechargement auto de la page
      e.preventDefault();
      // assigne les valeurs du form à l'objet formData
      let formData = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      // affiche en console formData (les valeurs entrées par l'user)
      console.log(formData)
      // vérifie si tous les champs sont bien remplis
      if (!this.username || !this.email || !this.password) {
        this.errMsg = "Err! Remplissez tous les champs du formulaire"
        return
      }
      if (this.password !== this.confirm) {
        this.errMsg = "Err! Le mot de passe et la confirmation du mot de passe ne sont pas les mêmes";
        return
      }
      // nos regex
      const regexUsername = /^(?=.{4,20}$)(?:[a-zA-Z\d]+(?:(?:\.|-|_)[a-zA-Z\d])*)+$/g;
      const regexEmail = /^[\w-.]{2,32}@([\w-]+\.)+[\w-]{2,4}$/g;
      const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,32})/;
      // nos véfifications
      if (!(regexUsername.test(this.username))) {
        this.errMsg = "Username Err! => entre 4 et 20 caractères + alphanumérique seulement + pas d'accent ni espaces";
        return
      }
      if (!(regexEmail.test(this.email))) {
        this.errMsg = "Email Err! => l'email inscrit n'a pas le bon format (exemple@mail.com)"
      }
      if(!(regexPassword.test(this.password))) {
        this.errMsg = "Password Err! => entre 8 et 32 caractères + 1 minuscule min + 1 maj min + 1 caractère spécial"
      }      
      // réinitialise le formumaire
      document.querySelector('form').reset();
      // fonction fetch pour POST au backend les datas
      fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .catch(error => {console.error(error)});
    }
  }
}
</script>

<style scoped>
#signupForm {
  margin: 3rem;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
}
h3 {
  background: no-repeat center url('../assets/logos/icon.png');
  background-size: cover;
  height: 200px;
  width: 200px;
  text-align: center;
}
form {
  display: flex;
  flex-direction: column;
  width: 400px;
}
input {
  margin: 0.8rem;
  padding: 10px;
  box-shadow: 3px 5px 6px 2px rgb(0 0 0 / 10%);
  border-style: none;
  border-radius: 16px;
  outline: none;
}
input:hover {
  box-shadow: 3px 5px 6px 2px rgb(0 0 0 / 20%);
}
.btn {
  color: white;
  background-color: rgba(0, 128, 0, 0.836);
  margin: 2rem;
}
</style>