<template>
    <div id="nav">
        <div id="logo">
            <router-link :to="redirection">
                <img src="../assets/logos/icon-left-font.svg" alt="logo">
            </router-link>
        </div>
        <div id="routes" v-if="!logged">
            <router-link to="/signup" class="link">Sign up</router-link>
            <router-link to="/login" class="link">Login</router-link>    
        </div>  
        <div id="options" v-else>
            <router-link to="/team" class="link"><i class="fas fa-users"></i> Membres</router-link>
            <router-link :to="path" class="link"><i class="fas fa-user"></i> Profil</router-link>
            <button @click="logout" class="link"><i class="fas fa-sign-out-alt"></i> Déconnexion</button>
        </div>    
    </div>
</template>

<script>
import router from '../router'
export default {
    name: 'Nav',
    props: {
        redirection: String,
        logged: Boolean,
    },
    created() {
        const userId = "1" // <- ici il faudra trouver le userId dynamiquement
        this.path = `/profile/${userId}`
    },
    data() {
        return {
            path: ""
        }
    },
    methods: {
        logout() {
            if (confirm("Souhaitez-vous vous déconnecter ?")) {
                fetch('http://localhost:3000/logout')
                .then(router.push({ path: '/' }))
                .catch(error => console.error(error))    
            }            
        }
    }
}
</script>

<style scoped>
#nav {
    display: flex;
    align-items: center;
    overflow: hidden;
    height: 100px;
    border-bottom: 1px solid red;
}
#routes, #options {
    display: flex;
    justify-content: flex-end;  
    width: 100%;  
}
img {
    height: 16rem;
}
.link {
    text-align: center;
    padding: 1rem;
    text-decoration: none;
    color: rgba(0, 0, 0, 0.75);
}
.link:hover{
    color: black;
    box-sizing: content-box;
}
</style>