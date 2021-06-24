<template>
    <div class="tasks-board col-3" id="new-category">
        <div class="categoryTitle-tasks">
            <h4><a href="#" id="add-new-category" @click.prevent="showsNewForm">add new category</a></h4>      
            <div v-if="showNewForm === true">
                <form @submit.prevent="createCategory">
                    <div class="form-group">
                        <input v-model="newCategoryName" type="text" class="form-control" placeholder="new category">
                    </div>
                    <button class="btn" type="submit">create card</button>
                    <button class="btn btn-danger" @click.prevent="cancelNewCat">cancel</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NewCategory',
    data(){
        return {
            showNewForm : false,
            newCategoryName : ''
        }
    },
    methods:{
        showsNewForm(){
            this.showNewForm = true
        },
        createCategory(){
            this.$emit('postCategory', {categoryName: this.newCategoryName})
            this.newCategoryName = ''
        },
        cancelNewCat(){
            this.showNewForm = false
        }
    }
}
</script>

<style scoped>

</style>