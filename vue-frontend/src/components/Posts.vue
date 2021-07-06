<template>
    <div id="postsContainer">
        <div :key="post.id" v-for="post in posts" class="post">
            <div class="header">
                <div class="pictureContainer">
                    <img :src="post.profile" alt="profile picture" class="picture">    
                </div>
                <div class="description">
                    <div>
                        <h4>{{ post.username }}</h4>
                        <p>posté le {{ post.date }}</p>    
                    </div>                 
                    <button class="option" @click="optionBtn(post)">...</button>
                </div>                               
            </div>
            <p class="text">{{ post.text }}</p>
            <div class="mediaContainer">          
                <img :src="post.file" alt="post image" class="media">
            </div>
            <p class="like"><i class="fas fa-thumbs-up"></i> {{ post.likes }}</p>
            <div class="interaction">
                <button class="btn"><i class="far fa-thumbs-up" ></i> J'aime</button>
                <button class="btn"><i class="far fa-comment"></i> Commenter</button>
            </div>     
        </div>     
    </div>    
</template>

<script>
export default {
    name: 'Posts',
    props: {
        posts: Array
    },
    methods: {
        optionBtn(post) {
            console.log(post)
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
.pictureContainer {
    width: 8%;
    height: 8%;
    min-width: 64px;
    min-height: 64px;    
    box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
    border-radius: 50%;
    overflow: hidden;
}
.picture {
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