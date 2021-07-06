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
                    <button class="btn" @click="optionBtn(post)">...</button>
                </div>                               
            </div>
            <p class="text">{{ post.text }}</p>
            <div class="mediaContainer">          
                <img :src="post.file" alt="post image" class="media">
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
    width: 70%;
    margin: auto;
    border-radius: 4px;
}
.post {
    box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);;
    margin: 2rem;
    padding: 1rem;
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
    width: 50%;
    height: 50%;
}
.btn {
    background: none;
    border-style: none;
    outline: none;
    font-size: 2rem;
    color: rgba(0, 0, 0, 0.7);
}
.btn:hover {
    color: black;
    transform: scale(1.04);
}
</style>