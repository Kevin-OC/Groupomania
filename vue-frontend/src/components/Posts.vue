<template>
    <div v-if="!posts" id="postsContainer">
        <div :key="post.id" v-for="post in posts" class="post">
            <div class="header">
                <div class="profileContainer">
                    <img :src="post.profile" alt="photo de profil" class="profile">    
                </div>
                <div class="description">
                    <div>
                        <h4>{{ post.creator }}</h4>
                        <p>posté le {{ post.date }}</p>    
                    </div>                 
                    <button class="option" @click="optionBtn(post)">...</button>
                </div>                               
            </div>
            <p class="text">{{ post.text }}</p>
            <div class="mediaContainer">          
                <img :src="post.media" :alt="post.media" class="media">
            </div>
            <p class="like"><i class="fas fa-thumbs-up"></i> {{ post.likes }}</p>
            <div class="interaction">
                <button class="btn"><i class="far fa-thumbs-up" ></i> J'aime</button>
                <button class="btn" @click="toggleComment(post)"><i class="far fa-comment"></i> Commentaires</button>
            </div>
            <Comments :commentSection="showComment" :comments="comments" />   
        </div>     
    </div>
    <div v-else>
        <p>Il n'y a pas encore de publications! Cliquez sur "créer un post" pour en faire une.</p>
    </div>  
</template>

<script>
import Comments from "../components/Comments.vue"
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
            showComment: false
        }
    },
    methods: {
        optionBtn(post) {
            console.log(post)
        },
        toggleComment(post) {
            console.log(post)
            this.showComment = !this.showComment;
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
.text {
    margin: 1.4rem 0 1.4rem 0;
}
.mediaContainer {
    overflow: hidden;
    text-align: center;
}
.media {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1)
}
button {
    background: none;
    border-style: none;
    outline: none;   
}
.option {
    font-size: 2rem;
    color: rgba(0, 0, 0, 0.7);
}
.option:hover {
    color: black;
    transform: scale(1.04);
}
.interaction {
    display: flex;
    justify-content: space-around;
}
.like {
    margin: 1rem 0 1rem 0;
}
.fas {
    color: white;
    background-color: #3174e4;
    border-radius: 50%;
    padding: 0.5rem;
}
</style>