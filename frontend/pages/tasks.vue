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
          <q-input v-model="newTask" label="Add a new task" @keyup.enter="addTask" />
          <q-list bordered separator>
            <q-item v-for="(task, index) in tasks" :key="index">
              <q-item-section avatar>
                <q-checkbox v-model="task.completed" @change="editTask(task)" />
              </q-item-section>

              <q-item-section>
                <q-item-label :class="{ 'text-strike': task.completed }">{{
                  task.title
                }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn
                  v-if="editedTask.id !== task.id"
                  flat
                  round
                  dense
                  icon="edit"
                  @click="editTask(task)"
                />
                <q-input v-else v-model="editedTask.title" label="Edit task" @keyup.enter="saveTask(editedTask)" />
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
  </q-layout></template>

<script>
import { ref } from 'vue';
import tasksStore from '../store/tasks';

export default {
  setup() {
    const tasks = ref([]);
    const newTask = ref('');
    const editedTask = ref({ id: null, title: '', completed: false });

    const loadTasks = async () => {
      tasks.value = await tasksStore.getTasks();
    };

    const addTask = async () => {
      if (newTask.value.trim()) {
        const task = await tasksStore.addTask({ title: newTask.value });
        tasks.value.push(task);
        newTask.value = '';
      }
    };

    const editTask = (task) => {
      editedTask.value = { ...task };
    };

    const saveTask = async () => {
      if (editedTask.value.title.trim()) {
        await tasksStore.editTask(editedTask.value.id, { title: editedTask.value.title });
        editedTask.value = { id: null, title: '', completed: false };
      }
    };

    const updateTask = async (task) => {
      await tasksStore.editTask(task.id, { completed: task.completed });
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
      editTask,
      saveTask,
      updateTask,
      deleteTask,
    };
  },
};
</script>