<template>
    <Nav redirection="/home" :logged="true" />  
    <Header :home="false" header="Membres" />
    <div id="usersContainer">            
        <div :key="user.id" v-for="user in users" class="user">
            <div class="profileContainer">
                <img :src="user.profile" alt="photo de profil" class="profile">    
            </div>
            <div>
                <p>{{user.username}}</p>    
            </div>            
        </div>    
    </div>    
</template>

<script>
import Nav from "../components/Nav.vue"
import Header from "../components/Header.vue"
export default {
    name: 'Team',
    components: {
        Nav,
        Header
    },
    data() {
        return {
            users: []
        }
    },
    methods: {
        async fetchUsers() {
            const res = await fetch('api/users')
            const data = await res.json()
            return data
        }
    },
    async created() {
        this.users = await this.fetchUsers()
    }
}
</script>

<style scoped>
#usersContainer {
    width: 80%;
    margin: auto;
    border-radius: 4px;
    display: flex;
    flex-wrap: wrap;
}
.user {
    box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
    margin: 1rem;
    padding: 1rem;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.profileContainer {
    width: 8%;
    height: 8%;
    min-width: 64px;
    min-height: 64px;    
    box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
    border-radius: 50%;
    overflow: hidden;
}
.profile {
    height: 100%;
    width: 100%;
    object-fit: cover;
}
</style>