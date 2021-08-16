<template>
    <Nav redirection="/login" :logged="false"/>
    <div id="loginForm">
        <h3>Login</h3>
        <form @submit.prevent="onSubmit">
            <input type="email" name="email" placeholder="Email" v-model="dataForm.email">
            <input type="password" name="password" placeholder="Mot de passe" v-model="dataForm.password">
            <input type="submit" value="Login !" class="btn">
        </form>
        <h4>{{ errMsg }}</h4>
        <p>Je n'ai pas créé de compte ? Cliquez ici: <router-link to="/signup">Signup</router-link></p>
    </div>
</template>

<script>
import store from '../store/index.js'
import Nav from '../components/Nav.vue'
import router from '../router'
export default {
    name: 'Login',
    components: {
        Nav
    },
    data() {
        return {
            dataForm: {
                email: null,
                password: null  
            },
            errMsg: null
        }
    },
    methods: {
        onSubmit() {
            // assigne les valeurs du form à l'objet data
            const data = {
                ...this.dataForm
            }      
            // vérifie si tous les champs sont bien remplis
            if (!data.email || !data.password) {
                this.errMsg = "Err! Remplissez tous les champs du formulaire"
                return
            }
            // méthode POST pour l'envoi de body
            fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => {
                    const localData = res
                    store.state.isLogged = true
                    localData.json().then(data => {
                        localStorage.setItem('token', data.token)
                        localStorage.setItem('userId', data.userId)
                        localStorage.setItem('isAdmin', data.isAdmin)
                    })
                    if (res.status === 200 ) {
                        router.push({ path: 'home' })
                    }  else {
                        this.errMsg = "Email ou mot de passe incorrect"
                    }             
                })                
                .catch(error => {console.error(error)})
        }
    }
}
</script>

<style scoped>
#loginForm {
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