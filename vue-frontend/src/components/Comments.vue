<template>
    <div v-if="commentSection" class="commentsContainer">
        <div :key="comment.id" v-for="comment in comments" class="comment">
            <div class="profileContainer">
                <img :src="comment.profile" alt="profile">
            </div>                
            <div class="creatorContainer">
                <p class="commentCreator">{{ comment.creator }}</p> 
                <button class="option" @click="option(comment.id)">...</button>
                <p class="commentText">{{ comment.text }}</p>                    
            </div>                       
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'Comments',
    props: {
        comments: Array,
        commentSection: Boolean
    },
    methods: {
        option(id) {
            console.log(id)
        }
    }
}
</script>

<style scoped>
.comment {
    margin-top: 2rem;
    display: flex;
    align-items: flex-start;
    border-top: 1px solid rgb(0 0 0 / 10%);
    padding: 1rem;
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
img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}
.creatorContainer {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
}
.commentCreator {
    padding: 1rem;
}
.commentText {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    padding: 1rem;
    line-height: 1.6rem;
    margin-left: 1rem;
    width: 100%;
}
.option {
    font-size: 2rem;
    color: rgba(0, 0, 0, 0.7);
    background: none;
    border-style: none;
    outline: none;
}
.option:hover {
    color: black;
    transform: scale(1.04);
}
</style>