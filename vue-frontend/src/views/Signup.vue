<template>
    <Nav redirection="/login" :logged="false"/>
    <div id="signupForm">
        <h3>Signup</h3>
        <form @submit.prevent="onSubmit">
            <input type="text" name="firstname" placeholder="Prénom" v-model="dataForm.firstname">
            <input type="text" name="lastname" placeholder="Nom" v-model="dataForm.lastname">
            <input type="email" name="email" placeholder="Email" v-model="dataForm.email">
            <input type="password" name="password" placeholder="Mot de passe" v-model="dataForm.password">
            <input type="submit" value="Je m'inscris !" class="btn">
        </form>
        <h4>{{ errMsg }}</h4>
        <p>Je possède déjà un compte ? Cliquez ici: <router-link to="/login">Login</router-link></p>
    </div>
</template>

<script>
import Nav from '../components/Nav.vue'
import router from '../router'
import store from '../store/index.js'
export default {
    name: 'Signup',
    components: {
        Nav
    },
    data() {
        return {
            dataForm: {
                firstname: null,
                lastname: null,
                email: null,
                password: null,
            },
            errMsg: null
        }
    },
    methods: {
        onSubmit() {
            /* assigne les valeurs entrées du formulaire à l'objet data */
            const data = {
                ...this.dataForm
            }
            const login = {
                email: this.dataForm.email,
                password: this.dataForm.password
            }
            /* vérifie si tous les champs sont bien remplis */
            if (!data.firstname || !data.lastname || !data.email || !data.password) {
                this.errMsg = "Err! Remplissez tous les champs du formulaire"
                return
            }    
            /* nos regex */
            const regexName = /^[a-zéèçàêïü]{2,50}(-| )?([a-zéèçà]{2,50})?$/gmi;
            const regexEmail = /^[\w-.]{2,32}@([\w-]+\.)+[\w-]{2,4}$/g;
            const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,32})/;
            /* nos véfifications */
            if (!(regexName.test(data.firstname && data.lastname))) {
                this.errMsg = "Name Err! => format nom et/ou prénom incorrect";
                return
            }
            if (!(regexEmail.test(data.email))) {
                this.errMsg = "Email Err! => l'email inscrit n'a pas le bon format (exemple@mail.com)"
                return
            }
            if(!(regexPassword.test(data.password))) {
                this.errMsg = "Password Err! => entre 8 et 32 caractères + 1 minuscule min + 1 maj min + 1 caractère spécial"
                return
            }

            /* envoi à l'API (signup -> login -> /home) */
            fetch('http://localhost:3000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify(data),
            })  
                .then(res => { 
                    if (res.status === 201) {
                        /* Si le signup est réussi on passe par login pour obtenir le token + userId en réponse */
                        fetch('http://localhost:3000/api/users/login', {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(login)
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
                    } else {
                        this.errMsg = "Email déjà existant"
                        return
                    }
                
                })
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
@media screen and (max-width: 992px) {
    form {
        width: 100%;
    }
}
</style>