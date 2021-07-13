<template>
  <Nav redirection="/login" :logged="false"/>
  <div id="signupForm">
    <h3>Signup</h3>
    <form @submit.prevent="onSubmit">
      <input type="text" name="username" placeholder="Username" v-model="dataForm.username">
      <input type="email" name="email" placeholder="Email" v-model="dataForm.email">
      <input type="password" name="password" placeholder="Mot de passe" v-model="dataForm.password">
      <input type="password" name="confirm" placeholder="Confirmation mot de passe" v-model="dataForm.confirm">
      <input type="submit" value="Je m'inscris !" class="btn">
    </form>
    <h4>{{ errMsg }}</h4>
    <p>Je possède déjà un compte ? Cliquez ici: <router-link to="/login">Login</router-link></p>
  </div>    
</template>

<script>
import Nav from '../components/Nav.vue'
import router from '../router'
export default {
  name: 'Signup',
  components: {
    Nav
  },
  data() {
    return {
      dataForm: {
        username: null,
        email: null,
        password: null,
        confirm: null  
      },
      errMsg: null
    }
  },
  methods: {
    onSubmit() {
      // assigne les valeurs entrées du formulaire à l'objet data
      const data = {
        ...this.dataForm
      }
      // vérifie si tous les champs sont bien remplis
      if (!data.username || !data.email || !data.password) {
        this.errMsg = "Err! Remplissez tous les champs du formulaire"
        return
      }
      if (data.password !== data.confirm) {
        this.errMsg = "Err! Le mot de passe et la confirmation du mot de passe ne sont pas les mêmes";
        return
      }
      // nos regex
      const regexUsername = /^(?=.{4,20}$)(?:[a-zA-Z\d]+(?:(?:\.|-|_)[a-zA-Z\d])*)+$/g;
      const regexEmail = /^[\w-.]{2,32}@([\w-]+\.)+[\w-]{2,4}$/g;
      const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,32})/;
      // nos véfifications
      if (!(regexUsername.test(data.username))) {
        this.errMsg = "Username Err! => entre 4 et 20 caractères + alphanumérique seulement + pas d'accent ni espaces";
        return
      }
      if (!(regexEmail.test(data.email))) {
        this.errMsg = "Email Err! => l'email inscrit n'a pas le bon format (exemple@mail.com)"
      }
      if(!(regexPassword.test(data.password))) {
        this.errMsg = "Password Err! => entre 8 et 32 caractères + 1 minuscule min + 1 maj min + 1 caractère spécial"
      }

      // affiche en console le body que l'on va envoyer au backend
      console.log(data)
      // envoi à l'API
      fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(router.push({ path: 'home' }))
      .catch(error => {console.error(error)})
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
  height: 160px;
  width: 160px;
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
  box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
  border-style: none;
  border-radius: 4px;
  outline: none;
}
input:hover {
  box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 18%);
}
.btn {
  color: white;
  background-color: rgba(0, 128, 0, 0.836);
  margin: 2rem;
}
</style>