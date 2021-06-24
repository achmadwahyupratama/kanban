<template>
    <div class="page" id="home-page">
        <div class="navbar">
            <div class="logo-navbar">
                <img class="y-kanban-logo" src="../images/logo-kanban.png" alt="Y Kanban">
            </div>
            <div class="nav-item">
                <div class="nav-button btn"><a @click.prevent="logout" href="#">Logout</a></div>
            </div>
        </div>
        <div class="container-boards row">
            <CategoryCard
                v-for="category in categories"
                :key="category.id"
                :category="category"
                @destroyCategory="deleteCategory"
                @createTask="submitAddTask"
                @destroyTask="deleteTask"
                @putTask="editTask"
            ></CategoryCard>
            <NewCategory
                @postCategory="createCategory"
            ></NewCategory>
        </div>
    </div>
  
</template>

<script>
import CategoryCard from "../components/CategoryCard.vue";
import NewCategory from "../components/NewCategory.vue";
export default {
    name: "Home",
    data() {
        return {

        }
    },
    methods: {
        logout(){
            this.$emit("hitLogout")
        },
        submitAddTask(taskInstance){
            // console.log(taskInstance, 'this from home');
            this.$emit('createTask', taskInstance)
        },
        deleteTask(taskId){
            this.$emit('destroyTask',taskId)
        },
        editTask(editedTask){
            // console.log(editedTask, '<<<< dari home');
            this.$emit('putTask', editedTask)
        },
        createCategory(newCategoryInstance){
            this.$emit('postCategory', newCategoryInstance)
        },
        deleteCategory(categoryId){
            // console.log(categoryId, '<<<,to delete from home');
            this.$emit('destroyCategory',categoryId)
        }
    },
    components: {
        CategoryCard,
        NewCategory
    },
    props: ["categories"]
}
</script>

<style>

</style>