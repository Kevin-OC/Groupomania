<template>
    <div id="nav">
        <div id="logo">
            <router-link :to="redirection"><img src="../assets/logos/icon-left-font.png" alt="logo"></router-link>
        </div>
        <div id="routes" v-if="!logged">
            <router-link to="/signup" class="link">Sign up</router-link>
            <router-link to="/login" class="link">Login</router-link>    
        </div>      
    </div>
</template>

<script>
export default {
    name: 'Nav',
    props: {
        redirection: String
    },
    data() {
        return {
            logged: false
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
    border-bottom: 2px solid rgba(255, 15, 15, 0.5);
}
#routes {
    display: flex;
    justify-content: flex-end;  
    width: 100%;  
}
.link {
    text-align: center;
    padding: 1rem;
    width: 80px;
    text-decoration: none;
    color: black;
}
.link:hover{
    color: rgb(255, 15, 15);
    box-sizing: content-box;
    font-weight: bold;
}
</style>