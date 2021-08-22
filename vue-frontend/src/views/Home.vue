<template>
    <Nav redirection="/home" :logged="true" />
    <Header :home="true" header="Accueil" />
    <button v-if="createPost" @click="toggleCreate" class="btn">Retour au posts</button>
    <button v-else @click="toggleCreate" class="btn">Créer un nouveau message</button>    
    <CreatePost v-show="createPost" @toggle-Create="toggleCreate" @add-Post="addPostFrontend" />
    <div v-if="!createPost" id="query">
        <span><i class="fas fa-search"></i></span>
        <input type="text" placeholder="exemple: John Doe" v-model="search">
    </div>       
    <Posts :posts="filterPosts" @delete-Post="deletePostFrontend" :isAdmin="isAdmin" :userId="userId" />
</template>

<script>
import Nav from "../components/Nav.vue"
import Header from "../components/Header.vue"
import CreatePost from "../components/CreatePost.vue"
import Posts from "../components/Posts.vue"
export default {
    name: "Home",
    components: {
        Nav,
        Header,
        CreatePost,
        Posts
    },
    data() {
        return {
            posts: [],
            createPost: false,
            isAdmin: null,
            userId: null,
            search: ""
        }
    },
    methods: {
        toggleCreate() {
            this.createPost = !this.createPost
            this.search = ""
        },
        async addPostFrontend() {
            this.posts = await this.fetchPosts()    
        },
        deletePostFrontend(id) {
            this.posts = this.posts.filter((post) => post.id !== id)
        },
        async fetchPosts() {
            const resPosts = await fetch('http://localhost:3000/api/posts/all')
            const dataPosts = await resPosts.json()
            dataPosts.forEach(post => {
                post.createdAt = post.createdAt.split('T')[0]
                post.User.username = post.User.firstname + " " + post.User.lastname
            });
            dataPosts.reverse()
            console.log(dataPosts)
            return dataPosts
        }
    },
    async created() {
        this.posts = await this.fetchPosts()
        this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
        this.userId = Number(localStorage.getItem('userId'))
    },
    computed: {
        filterPosts: function() {
            return this.posts.filter((post) => {
                return post.User.username.toLowerCase().match(this.search.toLowerCase())
            })
        }
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
#query {
    margin: 1rem 0 0 0;
}
input {
    padding: 6px;
    border: 1px solid #1c68e6;
    border-radius: 0 4px 4px 0;
    border-left-style: none;
}
input:focus {
    outline: none;
}
span {
    padding: 6px;
    border: 1px solid #1c68e6;
    border-right-style: none;
    border-radius: 4px 0 0 4px;
}
@media screen and (max-width: 992px) {
    #query {
        margin-left: 2rem;
    }
    .btn {
        margin-left: 2rem;
    }
}
</style>