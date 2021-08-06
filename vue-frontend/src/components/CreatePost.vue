<template>
    <div id="createPost">
        <form @submit.prevent="createPost">
            <div id="top">
                <div id="profileContainer">
                    <img src="../assets/vuejs.png" alt="profile picture">
                </div>
                <div id="text">
                    <textarea name="textarea" placeholder="Publiez votre message" v-model="text"></textarea>
                </div>    
            </div>            
            <div id="bottom">
                <input type="file" ref="file" name="file" class="upload" id="file" @change="selectFile">             
                <input type="submit" value="J'envoie !" class="btn">
            </div>
            <p>{{errMsg}}</p>
        </form>
    </div>
</template>

<script>
import router from '../router'
import axios from 'axios';
export default {
    name: 'CreatePost',
    data() {
        return {
            text: null,
            file: '',
            errMsg: null
        }
    },
    methods: {
        selectFile() {
            this.file = this.$refs.file.files[0]
        },
        createPost() {       
            if (!this.text) {
                this.errMsg = "Error => vous devez remplir le champ <message> pour créer une nouvelle publication!"
                return
            }
            
            let formData = new FormData()
            formData.append('text', this.text)
            formData.append('file', this.file)
            formData.append('userId', localStorage.getItem('userId'))
            console.log(formData.get('file'))

            axios.post('http://localhost:3000/api/posts/create', formData, {
                headers: {
                    //'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })  
                .then(router.push({ path: '/home' }))
                .catch(error => console.log(error))
        }
    }
}
</script>

<style scoped>
#createPost {
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
#profileContainer {
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
/*
.uploadFile {
    position: relative;
    margin: 1rem 0 1rem 0;
    background: rgba(128, 0, 128, 0.815);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    color: white;
    width: 40%;
    height: 60px;
}
.uploadFileInput {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.01;
    cursor: pointer;
}*/
</style>