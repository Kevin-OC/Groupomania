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
                    <div v-if="auth(post.userId)" class="optionsBtn">
                        <button @click="modifyPost(post.id)"><i class="far fa-edit modify"></i>modifier</button>
                        <button @click="deletePost(post.id)"><i class="far fa-trash-alt delete"></i>supprimer</button>    
                    </div>
                </div>                               
            </div>
            <p class="text">{{ post.text }}</p>
            <div v-if="post.file" class="fileContainer">          
                <img :src="'http://localhost:3000/images/' + post.file" :alt="post.file" class="file">
            </div>
            <div class="interaction">
                <Likes :postId="post.id" :userId="userId" />
                |
                <button @click="toggleComments(post.id)" class="btn comments"><i class="far fa-comment"></i>Commentaires</button>
            </div>
            <Comments v-if="showComments == post.id" :comments="comments" :isAdmin="isAdmin" :userId="userId" :postId="post.id" 
                @created="addComment" @deleted="deleteComment" />             
        </div>
    </div>
    <div id="noPost" v-else>
        <p>Il n'y a pas encore de publications! Cliquez sur "créer un post" pour en faire une.</p>
    </div>
</template>

<script>
import Comments from "../components/Comments.vue"
import Likes from "../components/Likes.vue"
import router from '../router'
export default {
    name: 'Posts',
    components: {
        Comments,
        Likes
    },
    props: {
        posts: Array,
        isAdmin: Boolean,
        userId: Number
    },
    data() {
        return {
            comments: [],
            likes: [],
            showComments: null,
        }
    },
    methods: {
        auth(postUserId) {
            if (this.isAdmin) {
                return true
            }
            if (this.userId !== postUserId) {
                return false
            }
            return true              
        },
        toggleComments(postId) {
            if (this.showComments == postId) {
                postId = null
            }
            this.showComments = postId
            this.fetchComments(postId)
        },
        deletePost(postId) {
            const data = {
                userId: localStorage.getItem('userId')
            }
            if (confirm("êtes vous sûr de vouloir supprimer cette publication ?")) {
                    fetch(`http://localhost:3000/api/posts/${JSON.stringify(postId)}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(data)                
                    })
                        .catch(error => console.log(error))
                this.$emit('delete-Post', postId)
            }
        },
        modifyPost(id) {
            router.push({ path: `/modify-post/${id}` })
        },
        async addComment(commentId) {
            const comment = await fetch(`http://localhost:3000/api/comments/${JSON.stringify(commentId)}`)
            const newComment =  await comment.json()
            this.comments.unshift(newComment)
            return newComment
        },
        async deleteComment(commentId) {
            this.comments = this.comments.filter((comment) => comment.id != commentId)
        },
        async fetchComments(postId) {
            if (postId == null) {
                return
            }
            const resComments = await fetch(`http://localhost:3000/api/comments/${JSON.stringify(postId)}/all`)
            const dataComments = await resComments.json()
            dataComments.reverse()
            console.log(dataComments)
            this.comments = dataComments
            return dataComments
        }        
    }
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
    border-top: 1px solid rgb(0 0 0 / 10%);
    padding-top: 2rem;
    display: flex;
    justify-content: space-between;
}
.comments {
    width: 40%;
}
#noPost {
    margin: 2rem;
}
i {
    margin-right: 4px;
}
</style>