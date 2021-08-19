<template>
    <header>
        <!--  si on ne se trouve pas sur la page 'home' (accueil) alors on peut y revenir via la flèche "retour" -->
        <div v-if="!home" id="back">
            <router-link to="/home" class="back"><i class="fas fa-arrow-left"></i>accueil</router-link>
        </div>      
        <div id="text">
            <img src="../assets/logos/icon-left-font-monochrome-black.svg" alt="GROUPOMANIA">
            <h3>{{header}}</h3>  
        </div>             
    </header>
</template>

<script>
export default {
    name: 'Header',
    props: {
        header: String,
        home: Boolean
    }
}
</script>

<style scoped>
header {
    margin: 2rem;
}
.back {
    text-decoration: none;
    color: black;
}
#text {
    text-align: center;
}
img {
    height: 2rem;
}
p {
    font-weight: bold;
}
i {
    margin-right: 0.5rem;
}
</style>