<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Task List</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="flex flex-center">
        <div class="q-pa-md">
          <q-input v-model="newTask.title" label="Title" />
          <q-input v-model="newTask.description" label="Description" />
          <q-btn color="primary" label="Add Task" @click="addTask" class="q-mt-md" />
          <q-list bordered separator class="q-mt-md">
            <q-item v-for="(task, index) in tasks" :key="index">
              <q-item-section avatar>
                <q-checkbox v-model="task.status" @click="updateTask(task)" />
              </q-item-section>

              <q-item-section>
                <template v-if="!task.editing">
                  <q-item-label :class="{ 'text-strike': task.status }">{{ task.title }}</q-item-label>
                  <q-item-label caption v-if="task.description">{{ task.description }}</q-item-label>
                </template>
                <template v-else>
                  <q-input v-model="task.title" label="Edit Title" ref="editedTitleInput" @keyup.enter="saveTask(task)" />
                  <q-input v-model="task.description" label="Edit Description" @keyup.enter="saveTask(task)" />
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
import { ref } from 'vue';
import tasksStore from '../store/tasks';

export default {
  setup() {
    const tasks = ref([]);
    const newTask = ref({ title: '', description: '', createdAt: new Date(), status: false, userId: null });
    const editedTask = ref(null);

    const loadTasks = async () => {
      tasks.value = await tasksStore.getTasks();
    };

    const addTask = async () => {
      if (newTask.value.title.trim()) {
        const task = await tasksStore.addTask(newTask.value);
        tasks.value.push(task);
        newTask.value = { title: '', description: '', createdAt: new Date(), status: false, userId: null };
      }
    };

    const enableEdit = (task) => {
      task.editing = true;
      // Focar no campo de título editável ao clicar no botão de edição
      this.$nextTick(() => {
        this.$refs.editedTitleInput[task.id].focus();
      });
    };

    const saveTask = async (task) => {
      if (task.title.trim()) {
        await tasksStore.editTask(task.id, { title: task.title, description: task.description, status: task.status });
        task.editing = false;
      }
    };

    const updateTask = async (task) => {
      await tasksStore.editTask(task.id, { status: task.status });
    };

    const deleteTask = async (id) => {
      await tasksStore.deleteTask(id);
      tasks.value = tasks.value.filter((task) => task.id !== id);
    };

    loadTasks();

    return {
      tasks,
      newTask,
      editedTask,
      addTask,
      enableEdit,
      saveTask,
      updateTask,
      deleteTask,
    };
  },
};
</script>
