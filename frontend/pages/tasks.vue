<template>
  <q-layout view="hHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="column">
          <h2>Todo List</h2>
          <q-list>
            <q-item v-for="(todo, index) in todos" :key="index">
              <q-item-section avatar>
                <q-icon name="label" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-input v-if="editingIndex === index" v-model="todo.text" @keyup.enter="doneEdit(index)" @blur="doneEdit(index)" @keyup.esc="cancelEdit(index)" ref="editInput" />
                <q-item-label v-else @click="startEdit(index)">{{ todo.text }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn @click="removeTodo(index)" color="negative" label="Remove" />
              </q-item-section>
            </q-item>
          </q-list>
          <q-form @submit.prevent="addTodo">
            <q-input v-model="newTodoText" placeholder="Add a new todo" />
            <q-btn type="submit" color="primary" label="Add" />
          </q-form>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>


<script>

export default {

  data() {

    return {
      editingIndex: -1,
      newTodoText: '',
      todos: [
        { text: 'Create a react project' },
        { text: 'Build a todo app' },
        { text: 'Learn nuxt-quasar-ui' }
      ]
    }
  },
  methods: {
    startEdit(index) {
      this.editingIndex = index
      this.$nextTick(() => this.$refs.editInput[0].focus())
    },
    
    doneEdit(index) {
      if (this.todos[index].text.trim()) {
        this.editingIndex = -1
      } else {
        this.removeTodo(index)
      }
    },

    cancelEdit(index) {
      this.editingIndex = -1
      this.todos[index].text = this.prevTodos[index].text
    },

    addTodo() {
      if (this.newTodoText.trim()) {
        this.todos.push({ text: this.newTodoText.trim() })
        this.newTodoText = ''
      }
    },

    removeTodo(index) {
      this.todos.splice(index, 1)
    }
  }

}

</script>