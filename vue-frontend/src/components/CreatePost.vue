<template>
    <div id="createPost">
        <form @submit.prevent="onSubmit">
            <div id="top">
                <div id="picture">
                    <img src="../assets/logo.png" alt="profile pic">
                </div>
                <div id="text">
                    <textarea name="textarea" placeholder="Publiez votre message" v-model="dataForm.text"></textarea>
                </div>    
            </div>            
            <div id="bottom">
                <input type="file" name="file" class="upload" id="file">                  
                <input type="submit" value="Envoyez !" class="btn">
            </div>
            <p>{{errMsg}}</p>
        </form>
    </div>
</template>

<script>
import router from '../router'
export default {
    name: 'CreatePost',
    data() {
        return {
            dataForm: {
                date: null,
                text: null,
                file: null
            },
        errMsg: null
        }
    },
    methods: {
        onSubmit() {
            this.dataForm.date = new Date();
            this.dataForm.file = document.getElementById('file').value;
            const data = {
                date: this.dataForm.date,
                text: this.dataForm.text,
                file: this.dataForm.file
            }            
            if (!data.text) {
                this.errMsg = "Error => vous devez remplir le champ message pour poster!"
                return
            }
            console.log(data)
            router.push({ path: 'home' })
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
#picture {
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
    background-color: green;
    border-style: none;
    outline: none;
    width: 20%;
    border-radius: 8px;
    height: 40px;
    color: white;
}
.btn:active, .upload:active {
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