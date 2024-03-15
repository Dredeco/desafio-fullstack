<template>
    <q-layout view="lHr lpr lFf">
        <q-page-container>
            <q-page class="flex flex-center">
              <div class="column q-pa-md" style="width: 400px">
                <div class="row q-mb-md">
                  <q-btn color="primary" label="Login" @click="showLogin = true, showRegister = false" />
                  <q-btn color="primary" label="Register" @click="showRegister = true" class="q-ml-sm" />
                </div>
                <q-form @submit.prevent="onSubmit" class="q-gutter-md">
                  <q-input v-if="showLogin" label="Email" v-model="form.email" type="email" required />
                  <q-input v-if="showRegister" label="Name" v-model="form.name" required />
                  <q-input v-if="showLogin || showRegister" label="Password" v-model="form.password" type="password" required />
                  <q-input v-if="showRegister" label="Confirm Password" v-model="form.confirmPassword" type="password" required />
                  <div class="row">
                    <q-space />
                    <q-btn type="submit" color="primary" label="Submit" />
                  </div>
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
        showLogin: true,
        showRegister: false,
        form: {
  email: '',
          name: '',
          password: '',
          confirmPassword: '',
          rememberMe: false
        }
      }
    },
    methods: {
      onSubmit() {
        if (this.showLogin) {
          // Handle login form submission
        } else {
          // Handle registration form submission
        }
      }
    }
  }
  </script>
  
<style scoped>
.q-page {
  background-color: #f5f5f5;
}

.q-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.q-input {
  margin-bottom: 10px;
}

.q-checkbox {
  margin-bottom: 20px;
}

.q-btn {
  margin-right: 10px;
}
</style>