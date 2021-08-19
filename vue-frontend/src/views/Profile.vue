<template>
    <Nav redirection="/home" :logged="true" />
    <Header :home="false" header="Profil" />
    <div v-if="showProfile" id="showProfile">
        <div class="modify">
            <button @click.prevent="toggleProfile"><i class="fas fa-cog"></i>Modifier profil</button>                
        </div> 
        <div class="profileContainer">
            <img :src="user.profile" :alt="user.profile" class="profile">   
        </div>
        <button @click.prevent="toggleProfile"><i class="fas fa-camera"></i>Choisir une nouvelle image de profil</button>
        <div class="info">
            <p>prénom: <span>{{user.firstname}}</span></p>
            <p>nom: <span>{{user.lastname}}</span></p>
            <p>email: <span>{{user.email}}</span></p>
            <p>date d'inscription: <span>{{user.createdAt}}</span></p>
        </div>                             
    </div>
    <Edit v-if="editProfile" :user="user" @toggle-profile="toggleProfile" />
</template>

<script>
import Nav from "../components/Nav.vue"
import Header from "../components/Header.vue"
import Edit from "../components/EditProfile.vue"
export default {
    name: 'Profile',
    components: {
        Nav,
        Header,
        Edit
    },
    beforeCreate() {
        /* on récupère le profil de l'user avant la création de la page */
        fetch(`http://localhost:3000/api/users/${localStorage.getItem('userId')}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                data.createdAt = data.createdAt.split('T')[0]
                data.profile = `http://localhost:3000/images/${data.profile}`
                this.user = data                
            })
            .catch(error => {error})
    },
    data() {
        return {
            showProfile: true,
            editProfile: false,
            user: {}
        }
    },
    methods: {
        /* fonction pour switcher entre afficher/modifier profil */
        toggleProfile() {
            this.showProfile = !this.showProfile
            this.editProfile = !this.editProfile
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
    width: 78px;
    height: 78px;
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
</style>