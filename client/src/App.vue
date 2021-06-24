<template>
  <div>
      <!-- login page -->
      <Login 
        v-if="activePage === 'login'"
        @submitLogin="login"
        @gotoRegister="showRegister"
        @googleLogin="loginWithGoogle"
      ></Login>

      <!-- register page -->
      <Register v-if="activePage === 'register'"
        @submitRegister="register"
        @cancelRegister="showLogin"
      ></Register>

      <!-- home page -->
      <Home 
        v-if="activePage === 'home'"
        @hitLogout="logout"
        @postCategory="createCategory"
        @destroyCategory="deleteCategory"
        @createTask="submitAddTask"
        @destroyTask="deleteTask"
        @putTask="editTask"
        :categories="categories"
      ></Home>
  </div>
</template>

<script>
import Login from "./views/Login";
import Register from "./views/Register.vue";
import Home from "./views/Home.vue";
// import axios from 'axios'
import axios from "./api/server.js";

export default {
    name: "App",
    data(){
        return {
            activePage: 'login',
            categories: []
        }
    },
    methods: {
        login(payload){
            axios({
                method: "POST",
                url: "/login",
                data: {
                    email: payload.email,
                    password: payload.password
                }
            })
            .then(({data})=>{
                localStorage.setItem('access_token', data.access_token);
                this.fetchCategoriesTasks()
                this.activePage = 'home'
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        loginWithGoogle(token){
            axios({
                method: 'POST',
                url: '/googlelogin',
                data: {
                    idToken: token
                }
            })
            .then(({data}) => {
                console.log(`sucsess login google`)
                localStorage.setItem('access_token', data.access_token);
                this.fetchCategoriesTasks()
                this.activePage = 'home'
            })
            .catch(err => {
                console.log(err)
            })
        },
        logout(){
            localStorage.clear()
            let auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function() {
                console.log('User signed out.');
            });
            // var auth2 = gapi.auth2.getAuthInstance();
            // auth2.signOut()
            this.activePage = 'login'
            // console.log('logout');
        },
        register(payload){
            axios({
                method: "POST",
                url: "/register",
                data: {
                    username: payload.username,
                    email: payload.email,
                    password: payload.password
                }
            })
            .then(({data})=>{
                this.activePage = 'login'
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        showRegister(){
            this.activePage = 'register'
        },
        showLogin(){
            this.activePage = 'login'
        },
        fetchCategoriesTasks(){
            axios({
                method: "GET",
                url: "/tasks",
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
            .then(({data})=>{
                this.categories = data
                // console.log(this.categories);
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        submitAddTask(taskInstance){
            // console.log(taskInstance, 'this from app');
            axios({
                method: "POST",
                url: "/tasks",
                headers: {
                    access_token: localStorage.getItem("access_token")
                },
                data: {
                    title: taskInstance.title,
                    status: taskInstance.status,
                    description: taskInstance.description,
                    CategoryId: taskInstance.CategoryId
                }
            })
            .then(({data})=>{
                console.log(data);
                this.fetchCategoriesTasks()
                this.activePage = 'home'
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        deleteTask(taskId){
            axios({
                method: "DELETE",
                url: `/tasks/${taskId}`,
                headers: {
                    access_token: localStorage.getItem("access_token")
                } 
            })
            .then(({data})=>{
                console.log(data);
                this.fetchCategoriesTasks()
                this.activePage = 'home'
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        editTask(editedTask){
            // console.log(editedTask, '<<<< dari app');
            axios({
                method: "PUT",
                url: `/tasks/${editedTask.id}`,
                headers: {
                    access_token: localStorage.getItem("access_token")
                } ,
                data: {
                    title: editedTask.title,
                    status: editedTask.status,
                    description: editedTask.description,
                    CategoryId: editedTask.CategoryId
                }
            })
            .then(({data})=>{
                console.log(data);
                this.fetchCategoriesTasks()
                this.activePage = 'home'
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        createCategory(newCategoryInstance){
            // console.log(newCategoryInstance, '<<<<<<< from app');
            axios({
                method: "POST",
                url: "/categories",
                headers: {
                    access_token: localStorage.getItem("access_token")
                },
                data: {
                    categoryName: newCategoryInstance.categoryName
                }
            })
            .then(({data})=>{
                console.log(data);
                this.fetchCategoriesTasks()
                this.activePage = 'home'
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        deleteCategory(categoryId){
            console.log(categoryId, '<<<,to delete from App');
            axios({
                method: "DELETE",
                url: `/categories/${categoryId}`,
                headers: {
                    access_token: localStorage.getItem("access_token")
                } 
            })
            .then(({data})=>{
                console.log(data);
                this.fetchCategoriesTasks()
                this.activePage = 'home'
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    },
    components: {
        Login,
        Register,
        Home
    },
    created(){
        if (localStorage.access_token) {
            this.fetchCategoriesTasks()
            this.activePage = 'home'
        } else {
            this.activePage = 'login'
        }
    }

}
</script>

<style>

</style>