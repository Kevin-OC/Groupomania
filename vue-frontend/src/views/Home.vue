<template>
    <Nav redirection="/home" :logged="true" />
    <Header :home="true" header="Accueil" />
    <router-link to="/new-post" class="btn">Créer un nouveau post</router-link>
    <Posts :posts="posts" @deletePost-emit="deletePostFrontend" />
</template>

<script>
import Nav from "../components/Nav.vue"
import Header from "../components/Header.vue"
import Posts from "../components/Posts.vue"

export default {
    name: "Home",
    components: {
        Nav,
        Header,
        Posts
    },
    data() {
        return {
            posts: []
        }
    },
    methods: {
        deletePostFrontend(id) {
            this.posts = this.posts.filter((post) => post.id !== id)
        }
    },
    beforeCreate() {
        fetch(`http://localhost:3000/api/posts/all`)
            .then(res => res.json())
            .then(data => {
                data.reverse()
                this.posts = data    
            })
            .catch(error => {error})
    },
    async create() {
        this.posts = await this.fetchPosts()
    }
}
</script>

<style scoped>
.btn {
    display: inline-block;
    color: white;
    background: #1c68e6;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
}
.btn:hover {
    box-shadow: 2px 2px 8px 5px #1c69e665;
}
.btn:active {
    transform: scale(0.98);
}
.btn-block {
    display: block;
    width: 100%;
}
</style>