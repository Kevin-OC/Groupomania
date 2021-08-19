<template>
    <!-- pour créer un nouveau commentaire -->
    <form @submit.prevent="createComment" v-show="!editComment">
        <input name="comment" placeholder="Publiez un commentaire" v-model="newComment" class="text">                           
        <input type="submit" value="Je commente!" class="btn" >
    </form>
    <p>{{errMsg}}</p>
    <!-- pour montrer la section commentaire (s'il y en a) -->
    <div id="commentsContainer" v-show="comments.length > 0 ">
        <div :key="comment.id" v-for="comment in comments" class="comment">
            <div class="header">
                <div class="profileContainer">
                        <img :src="'http://localhost:3000/images/' + comment.User.profile" :alt="comment.User.profile" class="profile">>    
                </div>
                <div class="commentUsername">
                    <h5>{{comment.User.firstname}} {{comment.User.lastname}}</h5>     
                </div>
                <div v-if="auth(comment.User.id)" class="optionsBtn">
                    <button v-if="editComment != comment.id" @click="toggleComment(comment.id)"><i class="far fa-edit modify"></i>modifier</button>
                    <button v-if="editComment == comment.id" @click="toggleComment(comment.id)"><i class="fas fa-arrow-left"></i>annuler</button>
                    <button @click="deleteComment(comment.id)"><i class="far fa-trash-alt delete"></i>supprimer</button>    
                </div>               
            </div>                       
            <p v-show="!editComment" class="commentText">{{comment.text}}</p>
            <!-- pour modifier le commentaire -->
            <form v-if="editComment == comment.id" @submit.prevent="modifyComment(comment.id, comment.text)">
                <input name="updateComment" v-model="comment.text" class="text">                           
                <input type="submit" value="Je modifie!" class="btn">
            </form>                          
        </div>        
    </div>
</template>

<script>
export default {
    name: 'Comments', 
    props: {
        comments: Array,
        isAdmin: Boolean,
        userId: Number,
        postId: Number
    },
    data() {
        return {
            newComment: null,
            updateComment: null,
            editComment: false,
            errMsg: null
        }
    },
    methods: {
        /* fonction pour créer un nouveau commentaire */
        createComment() {
            if (!this.newComment) {
                this.errMsg = "Erreur => vous devez remplir le champ <commentaire> pour créer un nouveau commentaire!"
                return
            }
            const data = {
                text: this.newComment,
                userId: JSON.stringify(this.userId),
                postId: JSON.stringify(this.postId)
            }
            fetch(`http://localhost:3000/api/comments/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify(data)
            })  
                .then(res => res.json())
                .then(data => this.$emit('created', data.id))
                .catch(error => {console.error(error)})
            this.newComment = ''
        },
        /* on vérifie le statut de l'user connecté */
        auth(commentUserId) {
            if (this.isAdmin) {
                return true
            }
            if (this.userId !== commentUserId) {
                return false
            }
            return true              
        },
        /* pour afficher/cacher la section commentaire de ce post */
        toggleComment(commentId) {
            if (this.editComment == commentId) {
                commentId = null
            }
            this.editComment = commentId
        },
        /* pour supprimer le commentaire */
        deleteComment(commentId) {
            if (confirm("êtes vous sûr de vouloir supprimer ce commentaire ?")) {
                fetch(`http://localhost:3000/api/comments/${JSON.stringify(commentId)}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    } 
                })
                    .catch(error => console.log(error))
                this.$emit('deleted', commentId)
            }   
        },
        /* pour modifier le commentaire */ 
        modifyComment(commentId, commentText) {
            const data = {
                text: commentText
            }
            fetch(`http://localhost:3000/api/comments/${JSON.stringify(commentId)}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) 
            })
                .catch(error => console.log(error))
            this.toggleComment(commentId)
        }
    },
    /* on indique les emitters (ici l'ajout et la suppression) */
    emits: ['created', 'deleted']
}
</script>

<style scoped>
#commentsContainer {
    margin: auto;
    border-radius: 4px;
    overflow-wrap: break-word;
}
.comment {
    border-bottom: 1px solid rgb(0 0 0 / 10%);
    margin: 2rem;
    border-radius: 4px;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.commentUsername {
    display: flex;
    justify-content: space-between;
    vertical-align: center;
    width: 90%;
    padding-left: 16px;
}
.commentText {
    margin: 1rem 0 1rem 0;
}
.profileContainer {
    margin: auto;
    max-width: 48px;
    max-height: 48px;
    min-width: 16px;
    min-height: 16px;
    border-radius: 50%;
    overflow: hidden;
}
.profile {
    height: 100%;
    width: 100%;
    object-fit: cover;
}
form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
input {
    margin-top: 1.8rem;
    width: 100%;
    padding: 10px;
    box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
    border-style: none;
    border-radius: 4px;
    outline: none;
}
.optionsBtn {
    display: flex;
}
button {
    background: none;
    border-style: none;
    outline: none;
    margin-left: 1rem;
    display: flex; 
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
i {
    margin-right: 3px;
}
</style>