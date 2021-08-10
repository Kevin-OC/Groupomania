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
            <router-link to="/profile" class="link"><i class="fas fa-user"></i> Profil</router-link>
            <router-link to="/" @click="logout" class="link"><i class="fas fa-sign-out-alt"></i> Déconnexion</router-link>
        </div>    
    </div>
</template>

<script>
export default {
    name: 'Nav',
    props: {
        redirection: String,
        logged: Boolean,
    },
    methods: {
        logout() {
            // pour déconnecter l'user on appelle la méthode clear() pour effacer tous les items dans localStorage
            localStorage.clear() 
            console.log("user déconnecté")       
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