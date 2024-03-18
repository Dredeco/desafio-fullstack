<template>
  <q-layout view="lHr lpr lFf">
      <q-page-container>
          <q-page class="flex flex-center bg-cyan">
            <div class="column q-pa-md" style="width: 400px">
              <div class="row q-mb-md">
                <q-btn color="primary" label="Login" @click="showLogin = true, showRegister = false" />
                <q-btn color="primary" label="Cadastro" @click="showRegister = true; showLogin = false" class="q-ml-sm" />
              </div>
              <q-form @submit.prevent="onSubmit" class="q-gutter-md bg-white rounded-borders q-px-lg q-py-md flex flex-center column">
                <q-input label="E-mail" v-model="form.email" type="email" required class="full-width"/>
                <q-input v-if="showLogin || showRegister" label="Senha" v-model="form.password" type="password" required class="full-width"/>
                <q-input v-if="showRegister" label="Confirme a senha" v-model="form.confirmPassword" type="password" required class="full-width"/>
                <div class="flex flex-center q-mt-xl">
                  <q-btn type="submit" color="primary" label="Entrar" class="q-px-xl" />
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

          localStorage.setItem('userId', response.data.id);

          this.$router.push('/tasks');
        } catch (error) {
          alert(error.response.data.message)
        }
      } else {
        if (this.form.password !== this.form.confirmPassword) {
          this.error = 'As senhas não são iguais.';
          alert(this.error)
        } else {
          try {
            await apiClient.post('/user', {email: this.form.email, password: this.form.password});
            this.showLogin = true;
            this.showRegister = false;
            this.form.email = '';
            this.form.password = '';
            this.form.confirmPassword = '';
            alert("Usuário cadastrado com sucesso.")
          } catch (error) {
            this.error = 'Erro ao criar o usuário.';
            alert(this.error)
          }
        }
      }
    },
  },
};
</script>