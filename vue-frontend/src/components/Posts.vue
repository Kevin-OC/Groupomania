<template>
    <div v-if="posts.length > 0" id="postsContainer">
        <div :key="post.id" v-for="post in posts" class="post">
            <div class="header">
                <div class="profileContainer">
                    <img :src="'http://localhost:3000/images/' + post.user.profile" :alt="post.user.profile" class="profile">    
                </div>
                <div class="description">
                    <div>
                        <h4>{{ post.user.firstname }} {{ post.user.lastname }}</h4>
                        <p>posté le {{ post.createdAt }}</p>
                    </div>                 
                    <div v-if="connectedUser == post.userId" class="optionsBtn">
                        <button @click="modifyPost(post.id)"><i class="far fa-edit modify"></i>modifier</button>
                        <button @click="deletePost(post.id)"><i class="far fa-trash-alt delete"></i>supprimer</button>    
                    </div>
                </div>                               
            </div>
            <p class="text">{{ post.text }}</p>
            <div v-if="post.file" class="fileContainer">          
                <img :src="'http://localhost:3000/images/' + post.file" :alt="post.file" class="file">
            </div>
            <p class="like"><i class="fas fa-thumbs-up likeCount"></i> {{ post.likes }}</p>
            <div class="interaction">
                <button class="btn"><i class="far fa-thumbs-up likeBtn"></i> J'aime</button>
                <button class="btn"><i class="far fa-comment"></i> Commentaires</button>
            </div>
            <Comments :comments="comments"/>
        </div>
    </div>
    <div id="noPost" v-else>
        <p>Il n'y a pas encore de publications! Cliquez sur "créer un post" pour en faire une.</p>
    </div>
</template>

<script>
import Comments from "../components/Comments.vue"
import router from '../router'
export default {
    name: 'Posts',
    components: {
        Comments
    },
    props: {
        posts: Array   
    },
    data() {
        return {
            comments: [],
            connectedUser: localStorage.getItem('userId'),
        }
    },
    methods: {
        deletePost(id) {
            console.log(id)
            if (confirm("êtes vous sûr de vouloir supprimer cette publication ?")) {
                    fetch(`http://localhost:3000/api/posts/${id}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }                        
                    })
                        .catch(error => console.log(error))
                this.$emit('delete-Post', id)
            }
        },
        modifyPost(id) {
            router.push({ path: `/modify-post/${id}` })
        },
        /*
        async fetchComments() {
            const resComments = await fetch(`http://localhost:3000/api/comments/3/all`)
            const dataComments = await resComments.json()
            dataComments.reverse()
            return dataComments
        }
        */
    },
    /*
    async created() {
        this.comments = await this.fetchComments()
    }
    */
}
</script>

<style scoped>
#postsContainer {
    width: 80%;
    margin: auto;
    border-radius: 4px;
}
.post {
    box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
    margin: 2rem;
    padding: 1rem 2rem 1rem 2rem;
    border-radius: 4px;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.description {
    display: flex;
    justify-content: space-between;
    vertical-align: center;
    width: 90%;
    padding-left: 16px;
}
.profileContainer {
    margin: auto;
    max-width: 96px;
    max-height: 96px;
    min-width: 64px;
    min-height: 64px;
    border-radius: 50%;
    overflow: hidden;
}
.profile {
    height: 100%;
    width: 100%;
    object-fit: cover;
}
.modify, .delete {
    margin: 0 0.2rem 0 1rem;
}
.text {
    margin: 1.4rem 0 1.4rem 0;
}
.fileContainer {
    overflow: hidden;
    text-align: center;
}
.file {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1)
}
button {
    background: none;
    border-style: none;
    outline: none;   
}
.interaction {
    display: flex;
    justify-content: space-around;
}
.like {
    margin: 1rem 0 1rem 0;
}
.likeCount {
    color: white;
    background-color: #3174e4;
    border-radius: 50%;
    padding: 0.5rem;
}
#noPost {
    margin: 2rem;
}
</style>