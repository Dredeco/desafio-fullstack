<template>
  <q-layout view="hHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>Lista de Tarefas</q-toolbar-title>
        <q-btn color="indigo-6" @click="logout">Sair</q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container class="bg-cyan window-width flex flex-center">
      <q-page class="flex flex-center q-px-lg q-py-lg">
        <div class="text-center rounded-borders bg-white full-width q-px-lg">
          <h5>Nova Tarefa</h5>
          <q-input v-model="newTask.title" label="Título" />
          <q-input v-model="newTask.description" label="Descrição" />
          <q-btn color="primary" label="Adicionar" @click="addTask" class="q-mt-md q-mb-xl" />
          <q-separator inset />
          <q-list separator class="q-mt-md">
            <h5 class="">Minhas tarefas</h5>
            <q-item v-for="(task, index) in tasks" :key="index">
              <q-item-section avatar>
                <q-checkbox v-model="task.status" @click="updateTask(task)" />
              </q-item-section>

              <q-item-section class="text-left">
                <template v-if="!task.editing">
                  <q-item-label :class="{ 'text-strike': task.status }">{{ task.title }}</q-item-label>
                  <q-item-label caption v-if="task.description">{{ task.description }}</q-item-label>
                </template>
                <template v-else>
                  <q-input v-model="task.title" label="Novo título" ref="editedTitleInput" @keyup.enter="saveTask(task)" />
                  <q-input v-model="task.description" label="Nova descrição " @keyup.enter="saveTask(task)" />
                </template>
              </q-item-section>

              <q-item-section side>
                <q-btn
                  flat
                  round
                  dense
                  :icon="task.editing ? 'save' : 'edit'"
                  @click="task.editing ? saveTask(task) : enableEdit(task)"
                />
                <q-btn
                  flat
                  round
                  dense
                  icon="delete"
                  @click="deleteTask(task.id)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import tasksStore from '../store/tasks';

export default {
  data() {
    return {
      tasks: [],
      newTask: { title: '', description: '', createdAt: new Date(), status: false, userId: null },
      editedTask: null,
    };
  },
  methods: {
    async addTask() {
      const userId = this.getUserId();
      if(userId) {
        if (this.newTask.title.trim()) {
          this.newTask.userId = userId;
          const task = await tasksStore.addTask(this.newTask);
          this.tasks.push(task);
          this.newTask = { title: '', description: '', createdAt: new Date(), status: false, userId: null };
        }
      } else {
        console.error("userId inválido.");
      }
    },
    enableEdit(task) {
      task.editing = true;
      this.$nextTick(() => {
        this.$refs.editedTitleInput[task.id].focus();
      });
    },
    async saveTask(task) {
      const userId = this.getUserId();
      if (userId) {
        if (task.title.trim()) {
          await tasksStore.editTask(task.id, { title: task.title, description: task.description, status: task.status });
          task.editing = false;
        }
      } else {
        console.error("userId inválido.");
      }
    },
    async updateTask(task) {
      const userId = this.getUserId();
      if (userId) {
        await tasksStore.editTask(task.id, { status: task.status });
      } else {
        console.error("userId inválido.");
      }
    },
    async deleteTask(id) {
      const userId = this.getUserId();
      if (userId) {
        await tasksStore.deleteTask(id);
        this.tasks = this.tasks.filter((task) => task.id !== id);
      } else {
        console.error("userId inválido.");
      }
    },
    async loadTasks() {
      const userId = this.getUserId();
      if (userId) {
        console.log("user id:", userId)
        const tasksData = await tasksStore.getTasks();
        this.tasks = tasksData.filter(task => task.userId === userId);
      } else {
        console.error("userId inválido.");
      }
    },
    logout() {
      localStorage.setItem('userId', '0');
      this.$router.push('/');
    },
    getUserId() {
      if (typeof localStorage !== 'undefined') {
        const userId = Number(localStorage.getItem('userId'));
        if (isNaN(userId) || userId <= 0) {
          this.$router.push('/');
        }
        return userId;
      } else {
        console.error("localStorage not supported in this environment.");
        this.$router.push('/');
      }
    },
  },
  created() {
    this.loadTasks();
  },
};
</script>

<style scoped>
.q-page {
  max-width: 600px;
  width: 600px;
}
h5 {
  margin: 2rem 0;
  text-transform: uppercase;
  font-weight: bold;
}
</style>