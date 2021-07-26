<template>
    <div id="modifyPost">
        <form @submit.prevent="modifyPost">
            <div id="top">
                <div id="profile">
                    <img src="../assets/logo.png" alt="profile picture">
                </div>
                <div id="text">
                    <textarea name="textarea" v-model="post.text"></textarea>
                </div>    
            </div>            
            <div id="bottom">
                <label for="file">ancien fichier: {{post.file}}</label>                
                <input type="file" name="file" class="upload" id="file">          
                <input type="submit" value="Je modifie !" class="btn">
            </div>
            <p>{{errMsg}}</p>
        </form>
    </div>    
</template>

<script>
export default {
    name: 'ModifyPost',
    beforeCreate() {
        fetch('http://localhost:3000/api/posts')
        .then(res => res.json())
        .then(data => {
            let currentPostId = this.$route.params.id - 1
            this.post = data[currentPostId]
            console.log(data)
        })
        .catch(error => {console.error(error)})
    },
    data() {
        return {
            post: "",
            errMsg: null
        }
    },
    methods: {
        modifyPost() {
            console.log('hello')
        }
    }    
}
</script>

<style scoped>
#modifyPost {
    max-width: 60%;
    box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
    margin: auto;
    margin-top: 2rem;
    padding: 1rem;
    border-radius: 4px;
}
form {
    display: flex;
    flex-direction: column;
}
#top {
    display: flex;
    align-items: center;
}
#profile {
    width: 10%;
    height: 10%;
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
#text {
    width: 100%;
    padding: 20px;
}
textarea {
    width: 100%;
    height: 6rem;
    padding: 8px;
}
#bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid hsla(0, 0%, 0%, 0.5);
    padding-top: 2rem;
}
.btn {
    background-color: #1c68e6;
    border-style: none;
    outline: none;
    width: 20%;
    border-radius: 8px;
    height: 40px;
    color: white;
}
.upload:active {
  transform: scale(0.98);
}
p {
    margin-top: 1.6rem;
}
</style>