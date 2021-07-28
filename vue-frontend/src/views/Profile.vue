<template>
    <Nav redirection="/home" :logged="true" />
    <Header :home="false" header="Profil" />
    <div v-if="showProfile" id="profileContainer">
        <form>
            <div class="btns">
                <button @click.prevent="deleteProfile" class="suppr"><i class="far fa-trash-alt delete"></i>Supprimer compte</button> 
                <button @click.prevent="modifyProfile" class="config"><i class="fas fa-cog"></i>Modifier profil</button>                
            </div> 
            <div class="profileContainer">
                <img :src="user.profile" alt="photo de profil" class="profile">   
            </div>
            <button @click.prevent="modifyProfile" class="camera"><i class="fas fa-camera"></i>Choisir une nouvelle image de profil</button>
            <div class="info">
                <p>prénom: <span>{{user.firstname}}</span></p>
                <p>nom: <span>{{user.lastname}}</span></p>
                <p>email: <span>{{user.email}}</span></p>
                <p>date d'inscription: <span>{{user.date}}</span></p>
            </div>                       
        </form>        
    </div>
    <div v-else>
        <button @click.prevent="modifyProfile"><i class="fas fa-arrow-left"></i>retour au profil</button>
    </div>
</template>

<script>
import Nav from "../components/Nav.vue"
import Header from "../components/Header.vue"
export default {
    name: 'Profile',
    components: {
        Nav,
        Header
    },
    beforeCreate() {
        fetch(`http://localhost:3000/api/users/${this.$route.params.id}`)
        .then(res => res.json())
        .then(data => {
            this.user = data            
        })
        .catch(error => {error})
    },
    data() {
        return {
            showProfile: true,
            user: {},
        }
    },
    methods: {
        modifyProfile() {
            this.showProfile = !this.showProfile
        },
        deleteProfile() {
            fetch(`http://localhost:3000/api/users/${this.$route.params.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(() => console.log("user:", this.$route.params.id, "supprimé"))
            .catch(error => {error})
        }
    }    
}
</script>

<style scoped>
#profileContainer {
    max-width: 60%;
    box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
    margin: auto;
    margin-top: 2rem;
    padding: 1rem;
    border-radius: 4px;
}
form {
    display: flex;
    flex-direction: column;
}
.profileContainer {
    margin: auto;
    width: 24%;
    height: 24%;
    min-width: 64px;
    min-height: 64px;    
    box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
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
.btns {
    margin: auto;
}
.config:hover {
    color: #1c68e6;
}
.suppr:hover {
    color: red;
}
</style>