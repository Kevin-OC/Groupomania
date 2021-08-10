<template>
    <form @submit.prevent="createComment">
            <input name="comment" placeholder="Publiez un commentaire" v-model="commentaire" class="text">                           
            <input type="submit" value="Je commente!" class="btn">
        </form>
    <div id="commentsContainer">
        <div :key="comment.id" v-for="comment in comments"> 
            <p>{{comment.text}}</p>   
        </div>
    </div>
</template>

<script>
export default {
    name: 'Comments',    
    props: {
        comments: Array
    },
    data() {
        return {
            commentaire: null
        }
    },
    methods: {
        createComment() {
            console.log("create comment")
        }
    }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
input {
    margin-top: 1rem;
    width: 100%;
    padding: 10px;
    box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
    border-style: none;
    border-radius: 4px;
    outline: none;
}
.btn {
    width: 30%;
}
.btn:hover {
    box-shadow: 2px 2px 8px 5px #00000033;
}
.btn:active {
    transform: scale(0.98);
}
</style>