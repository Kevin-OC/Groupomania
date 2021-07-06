<template>
    <div id="nav">
        <div id="logo">
            <router-link :to="redirection"><img src="../assets/logos/icon-left-font.png" alt="logo"></router-link>
        </div>
        <div id="routes" v-if="!logged">
            <router-link to="/signup" class="link">Sign up</router-link>
            <router-link to="/login" class="link">Login</router-link>    
        </div>  
        <div id="options" v-else>
            <router-link to="/team" class="link"><i class="fas fa-users"></i> Team</router-link>
            <router-link to="/user" class="link"><i class="fas fa-user"></i> User</router-link>
            <router-link to="/" class="link"><i class="fas fa-sign-out-alt"></i> Déconnexion</router-link>
        </div>    
    </div>
</template>

<script>
export default {
    name: 'Nav',
    props: {
        redirection: String,
        logged: Boolean,
    }
}
</script>

<style scoped>
#nav {
    display: flex;
    align-items: center;
    overflow: hidden;
    height: 100px;
    border-bottom: 2px solid rgba(255, 15, 15, 0.5);
}
#routes, #options {
    display: flex;
    justify-content: flex-end;  
    width: 100%;  
}
img {
    height: 200px;
}
.link {
    text-align: center;
    padding: 1rem;
    text-decoration: none;
    color: black;
}
.link:hover{
    color: rgb(255, 15, 15);
    box-sizing: content-box;
}
</style>