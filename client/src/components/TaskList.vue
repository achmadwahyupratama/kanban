<template>
<div>
    <div v-if="showEditForm === false" class="task">
        <p class="task-title">{{task.title}}</p>
        <p class="taks-desc">Description: {{task.description}}</p>
        <p class='task-status'>Status: {{task.status}}</p>
        <button class="btn btn-light btn-sm" @click="showsEditForm(task)" >edit task</button>
        <button class="btn btn-danger btn-sm" @click="deleteTask(task.id)" >delete task</button>
    </div>
    <form v-else id="editTaskForm" @submit.prevent="submitPutTask(task)" class="form">
        <div class="form-group">
            <input v-model="updatedTitle" type="text" class="form-control" placeholder="Edit Task Title" >
        </div>
        <div class="form-group">
            <input v-model="updatedDescription"  type="text" class="form-control" placeholder="Edit Task Description">
        </div>
        <div class="form-group">
            <input v-model="updatedStatus" type="text" class="form-control" placeholder="Edit Task Status">
        </div>
        <div class="task-manager">
            <button class="btn btn-primary" type="submit">update</button>
            <button @click.prevent="cancelUpdate"  class="btn btn-danger" >Cancel</button>
        </div>
    </form>

</div>
</template>

<script>
export default {
    name: "Task",
    data(){
        return{
            showEditForm: false,
            updatedTitle: '',
            updatedDescription: '',
            updatedStatus: ''
        }
    },
    props: ['task'],
    methods: {
        deleteTask(taskId){
            this.$emit('destroyTask', taskId)
        },
        showsEditForm(task){
            this.updatedTitle = task.title,
            this.updatedDescription = task.description,
            this.updatedStatus = task.status,
            this.showEditForm = true
        },
        submitPutTask(task){
            let updatedTask = {
                id: task.id,
                title: this.updatedTitle,
                description: this.updatedDescription,
                status: this.updatedStatus,
                CategoryId: task.CategoryId            
            }
            // console.log(updatedTask);
            this.$emit('putTask', updatedTask)
            this.showEditForm = false
        },
        cancelUpdate(){
            this.showEditForm = false
        }
    }
}
</script>

<style>

</style>