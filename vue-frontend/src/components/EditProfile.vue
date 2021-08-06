<template>
    <div id="editProfile">
        <div class="showProfile">
            <button @click.prevent="$emit('toggle-Profile')"><i class="fas fa-arrow-left"></i>retour au profil</button>    
        </div>         
        <form @submit.prevent="editProfile">

            <label for="file" class="profileLabel">
                <div>
                    Changer d'image de profil :
                </div>
                <div class="profileContainer">
                    <img :src="user.profile" :alt="user.profile" class="profile">   
                </div>                
            </label>
            <input type="file" ref="file" name="file" id="file" @change="selectFile">           

            <label for="firstname">Changer de prénom :</label>
            <input type="text" name="firstname" v-model="updateUser.firstname">

            <label for="lastname">Changer de nom :</label>
            <input type="text" name="lastname" v-model="updateUser.lastname">

            <label for="email">Changer email :</label>
            <input type="email" name="email" v-model="updateUser.email">

            <label for="password">Changer de mot de passe :</label>
            <input type="password" name="password" placeholder="entrez un nouveau mot de passe" v-model="updateUser.password">

            <button @click.prevent="deleteProfile" class="delete"><i class="far fa-trash-alt delete"></i>Supprimer compte</button> 

            <input type="submit" value="modifier" class="btn" @click.prevent="modifyProfile">
        </form>
        <h4>{{ errMsg }}</h4>
    </div>
</template>

<script>
import router from '../router'
import axios from 'axios';
export default {
    name: 'Edit',
    props: {
        user: Object
    },
    data() {
        return {
            updateUser: {
                firstname: this.user.firstname,
                lastname: this.user.lastname,
                email: this.user.email,
                password: null
            },
            file: '',
            errMsg: null
        }
    },
    methods: {
        deleteProfile() {
            if (confirm("êtes vous sûr de vouloir supprimer votre compte ?")) {
                fetch(`http://localhost:3000/api/users/${localStorage.getItem('userId')}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })  
                    .then(localStorage.clear()) // <- on vide le localStorage(userId et token)
                    .then(router.push({ path: '/' }))
                    .catch(error => {error})
            }
        },
        selectFile() {
            this.file = this.$refs.file.files[0]
        },
        modifyProfile() {            
            let formData = new FormData()
            formData.append('firstname', this.updateUser.firstname)
            formData.append('lastname', this.updateUser.lastname)
            formData.append('email', this.updateUser.email)
            if (this.updateUser.password) {
                formData.append('password', this.updateUser.password)
            }
            if (this.file) {
                formData.append('file', this.file)
            }
            
            /*
            // nos regex
            const regexName = /^[a-zéèçàêïü]{2,50}(-| )?([a-zéèçà]{2,50})?$/gmi;
            const regexEmail = /^[\w-.]{2,32}@([\w-]+\.)+[\w-]{2,4}$/g;
            const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,32})/;
            // nos véfifications
            if (!(regexName.test(this.updateUser.firstname && this.updateUser.lastname))) {
                this.errMsg = "Name Err! => format nom et/ou prénom incorrect";
                return
            }
            if (!(regexEmail.test(this.updateUser.email))) {
                this.errMsg = "Email Err! => l'email inscrit n'a pas le bon format (exemple@mail.com)"
                return
            }
            if(!(regexPassword.test(this.updateUser.password))) {
                this.errMsg = "Password Err! => entre 8 et 32 caractères + 1 minuscule min + 1 maj min + 1 caractère spécial"
                return
            }*/

            if (confirm("êtes vous sûr de vouloir modifier votre profil ?")) {
                axios.put(`http://localhost:3000/api/users/${localStorage.getItem('userId')}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(location.reload())
                    .catch(error => {error})
            } else {
                location.reload()
            }
        }
    }
}
</script>

<style scoped>
#editProfile {
    max-width: 60%;
    box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
    margin: auto;
    margin-top: 2rem;
    padding: 1rem;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
}
.showProfile {
    text-align: right;
}
form {
    display: flex;
    flex-direction: column;
}
label {
    margin-top: 1rem;
}
input {
    margin: 0.8rem;
    padding: 10px;
    box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
    border-style: none;
    border-radius: 4px;
    outline: none;
}
.profileLabel {
    display: flex;
    align-items: center;
}
.profileContainer {
    margin-left: 1rem;
    width: 78px;
    height: 78px;
    min-width: 64px;
    min-height: 64px;
    border-radius: 50%;
    overflow: hidden;
}
img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}
#file {
    /*position: absolute;
    left: 0;
    top: 0;
    opacity: 0.01;*/
    cursor: pointer;
}
i {
    padding-right: 0.5rem;
}
button {
    background: transparent;
    border: none;
    margin: 1rem;
    font-size: 0.94rem;
}
.btn {
    margin-top: 1rem;
    color: white;
    background: #1c69e6e7;
}
.btn:hover {
    box-shadow: 2px 2px 8px 5px #1c69e665;
    background: #1c68e6;
}
.btn:active {
    transform: scale(0.98);
}
.delete:hover {
    color: red;
    font-weight: bold;
}
</style>