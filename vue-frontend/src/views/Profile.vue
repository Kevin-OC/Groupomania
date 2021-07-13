<template>
    <Nav redirection="/home" :logged="true" />
    <Header :home="false" header="Profil" />
    <div v-if="showProfile" id="profileContainer">
        <form>
            <div class="profileContainer">
                <img :src="user.profile" alt="photo de profil" class="profile">    
            </div>
            <div>
                <h3>{{user.username}}</h3>
            </div>
            <button @click.prevent="modifyProfile"><i class="fas fa-cog"></i>Paramètres</button>
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
        fetch(`/api/users/${this.$route.params.id}`)
        .then(res => res.json())
        .then(data => {
            this.user = data
        })
        .catch(error => {error})
    },
    data() {
        return {
            showProfile: true,
            user: {}
        }
    },
    methods: {
        modifyProfile() {
            this.showProfile = !this.showProfile
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
</style>