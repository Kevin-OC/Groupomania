<template>
    <Nav redirection="/home" :logged="true" />
    <Header :home="false" header="Profil" />
    <div v-if="showProfile" id="showProfile">
        <div class="modify">
            <button @click.prevent="toggleProfile" class="config"><i class="fas fa-cog"></i>Modifier profil</button>                
        </div> 
        <div class="profileContainer">
            <img :src="imgPath + user.profile" :alt="user.profile" class="profile">   
        </div>
        <button @click.prevent="toggleProfile" class="camera"><i class="fas fa-camera"></i>Choisir une nouvelle image de profil</button>
        <div class="info">
            <p>prénom: <span>{{user.firstname}}</span></p>
            <p>nom: <span>{{user.lastname}}</span></p>
            <p>email: <span>{{user.email}}</span></p>
            <p>date d'inscription: <span>{{user.createdAt}}</span></p>
        </div>                             
    </div>
    <div v-if="editProfile" id="editProfile">
        <button @click.prevent="toggleProfile"><i class="fas fa-arrow-left"></i>retour au profil</button> 
        <form @submit.prevent="editProfile">

            <label for="file" class="profileLabel">
                <div>
                    Changer d'image de profil :
                </div>
                <div class="profileContainer">
                    <img :src="imgPath + user.profile" :alt="user.profile" class="profile">   
                </div>
                <input type="file" ref="file" name="file" id="file">
            </label>            

            <label for="firstname">Changer de prénom :</label>
            <input type="text" name="firstname" :placeholder="user.firstname">

            <label for="lastname">Changer de nom :</label>
            <input type="text" name="lastname" :placeholder="user.lastname">

            <label for="email">Changer email :</label>
            <input type="email" name="email" :placeholder="user.email">

            <label for="password">Changer de mot de passe :</label>
            <input type="password" name="password" placeholder="entrez un nouveau mot de passe">

            <button @click.prevent="deleteProfile"><i class="far fa-trash-alt delete"></i>Supprimer compte</button> 

            <input type="submit" value="modifier" class="button" @click.prevent="toggleProfile">
        </form>
    </div>
</template>

<script>
import Nav from "../components/Nav.vue"
import Header from "../components/Header.vue"
import router from '../router'
export default {
    name: 'Profile',
    components: {
        Nav,
        Header
    },
    beforeCreate() {
        fetch(`http://localhost:3000/api/users/${localStorage.getItem('userId')}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                data.createdAt = data.createdAt.split('T')[0]
                this.user = data    
            })
            .catch(error => {error})
    },
    data() {
        return {
            showProfile: true,
            editProfile: false,
            user: {},
            imgPath: "http://localhost:3000/images/"
        }
    },
    methods: {
        toggleProfile() {
            this.showProfile = !this.showProfile
            this.editProfile = !this.editProfile
        },
        deleteProfile() {
            if (confirm("êtes vous sûr de vouloir supprimer votre compte?")) {
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
        }
    }   
}
</script>

<style scoped>
#showProfile {
    max-width: 60%;
    box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
    margin: auto;
    margin-top: 2rem;
    padding: 1rem;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
}
.modify {
    text-align: right;
}
.profileContainer {
    margin: auto;
    width: 24%;
    height: 24%;
    min-width: 64px;
    min-height: 64px;
    border-radius: 50%;
    overflow: hidden;
}
button {
    background: transparent;
    border: none;
    margin: 1rem;
    font-size: 0.94rem;
}
.camera:hover {
    color: #0a9c64;
}
i {
    padding-right: 0.5rem;
}
img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}
.info {
    margin: auto;
    line-height: 2rem;
}
span {
    font-style: italic;
    font-weight: 500;
}
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
form {
    display: flex;
    flex-direction: column;
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
#file {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.01;
    cursor: pointer;
}
</style>