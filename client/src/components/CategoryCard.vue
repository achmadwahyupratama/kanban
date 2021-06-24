<template>
    <div class="tasks-board col-3" id="done">
        <div class="categoryTitle-tasks">
            <div class="row" >
                <h4 class="col">{{category.categoryName}}</h4>
                <button class="col-3 btn" @click="deleteCategory(category.id)" >delete</button>
            </div>
            <div class="tasks-colection">
                <draggable class="list-group" :list="category.Tasks" group="tasks" style="min-height: 300px"> 
                    <Task
                        v-for="task in category.Tasks"
                        :key="task.id"
                        :task="task"
                        @destroyTask="deleteTask"
                        @putTask="editTask"
                    ></Task>
                </draggable>
            </div>                   
        </div>
        <a v-if="showAddTaskForm === false" href="#" @click.prevent="showAddTask">add task</a>
        <form v-else id="newTaskForm" @submit.prevent="submitAddTask(category.id)" class="form">
            <div class="form-group">
                <input v-model="addTaskTitle" type="text" class="form-control" placeholder="New Task Title">
            </div>
            <div class="form-group">
                <input v-model="addTaskDescription" type="text" class="form-control" placeholder="New Task Description">
            </div>
            <div class="form-group">
                <input v-model="addTaskStatus" type="text" class="form-control" placeholder="New Task Status">
            </div>
            <button class="btn btn-primary" type="submit">add</button>
            <button @click.prevent="cancelAdd"  class="btn btn-danger" >Cancel</button>
        </form>
    </div>
</template>

<script>
import Task from "./TaskList";
import draggable from "vuedraggable";
export default {
    name: "CategoryCard",
    data() {
        return {
            showAddTaskForm: false,
            UserId: localStorage.getItem('access_token'),
            addTaskTitle:'',
            addTaskDescription: '',
            addTaskStatus: ''

        }
    },
    props: ['category'],
    components: {
        Task,
        draggable
    },
    methods: {
        showAddTask(){
            this.showAddTaskForm = true
            // console.log(categoryId);
        },
        submitAddTask(categoryId){
            const newTaskInstance = {
                title: this.addTaskTitle,
                description: this.addTaskDescription,
                status: this.addTaskStatus,
                CategoryId: categoryId
            }
            this.$emit('createTask', newTaskInstance)
            this.showAddTaskForm = false
            this.addTaskTitle=''
            this.addTaskDescription= ''
            this.addTaskStatus= ''
        },
        cancelAdd(){
            this.showAddTaskForm = false
        },
        deleteTask(taskId){
            this.$emit('destroyTask',taskId)
        },
        editTask(editedTask){
            // console.log(editedTask, '<<<< dari category');
            this.$emit('putTask', editedTask)
        },
        deleteCategory(categoryId){
            // console.log(categoryId, '<<<,to delete');
            this.$emit('destroyCategory',categoryId)
        }
    },
    created(){
    }

}
</script>

<style>

</style>