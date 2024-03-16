<template>
    <q-layout view="lHr lpr lFf">
        <q-page-container>
            <q-page class="flex flex-center">
              <div class="column q-pa-md" style="width: 400px">
                <div class="row q-mb-md">
                  <q-btn color="primary" label="Login" @click="showLogin = true, showRegister = false" />
                  <q-btn color="primary" label="Cadastro" @click="showRegister = true; showLogin = false" class="q-ml-sm" />
                </div>
                <q-form @submit.prevent="onSubmit" class="q-gutter-md">
                  <q-input label="Email" v-model="form.email" type="email" required />
                  <q-input v-if="showLogin || showRegister" label="Senha" v-model="form.password" type="password" required />
                  <q-input v-if="showRegister" label="Confirme a senha" v-model="form.confirmPassword" type="password" required />
                  <div class="flex flex-center q-mt-xl">
                    <q-btn type="submit" color="primary" label="Entrar" class="" />
                  </div>
                </q-form>
              </div>
            </q-page>
        </q-page-container>
    </q-layout>
  </template>
  
  <script>
  import { apiClient, authClient } from '../store/users';
  
  export default {
    data() {
      return {
        showLogin: true,
        showRegister: false,
        form: {
          email: '',
          password: '',
          confirmPassword: '',
          tasks: [],
        },
        error: null,
      };
    },
    methods: {
      async onSubmit() {
        if (this.showLogin) {
          try {
            const response = await authClient.post('/login', {
              email: this.form.email,
              password: this.form.password,
            });
  
            // Save the token in local storage or a Vuex store
            localStorage.setItem('token', response.data.token);
  
            // Navigate to the /tasks route
            this.$router.push('/tasks');
          } catch (error) {
            alert(error.response.data.message)
          }
        } else {
          // Handle registration form submission
          if (this.form.password !== this.form.confirmPassword) {
            this.error = 'As senhas não são iguais.';
            alert(this.error)
          } else {
            try {
              await apiClient.post('/user', (this.form.email, this.form.password, this.form.tasks));
              this.showLogin = false;
              this.form.email = '';
              this.form.password = '';
              this.form.confirmPassword = '';
            } catch (error) {
              this.error = 'Error creating user';
              alert(this.error)
            }
          }
        }
      },
    },
  };
  </script>
  
<style scoped>
.q-page {
  background-color: #a2aaee;
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