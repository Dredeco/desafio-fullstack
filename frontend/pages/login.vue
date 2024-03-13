<template>
    <q-layout view="lHr lpr lFf">
        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
            <q-toolbar-title>
                Todo List
            </q-toolbar-title>
            </q-toolbar>
        </q-header>
    
        <q-page-container>
            <q-page class="flex flex-center">
            <q-card class="q-pa-md" style="width: 400px">
                <q-card-section>
                <div class="text-h6">Login</div>
                </q-card-section>
    
                <q-card-section>
                <q-input
                    v-model="email"
                    label="Email"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
    
                <q-input
                    v-model="password"
                    label="Password"
                    lazy-rules
                    :type="isPwd ? 'password' : 'text'"
                    :rules="[ val => val !== null && val !== '' || 'Please type your password']"
                >
                    <template v-slot:append>
                    <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                    />
                    </template>
                </q-input>
                </q-card-section>
    
                <q-card-actions align="center" class="text-primary">
                <q-btn
                    flat
                    label="LOGIN"
                    @click="login"
                    color="primary"
                    :disable="!isLoginEnabled"
                />
                </q-card-actions>
            </q-card>
            </q-page>
        </q-page-container>
    </q-layout>
</template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        isPwd: true
      }
    },
    computed: {
      isLoginEnabled() {
        return this.email !== '' && this.password !== '';
      }
    },
    methods: {
      async login() {
        try {
        const response = await fetch(`http://localhost:5001/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });
        
        console.log(response)
        if (response.ok) {
          // Se a resposta da API for bem-sucedida, redireciona para a página de tasks
          this.$router.push('/tasks');
        } else {
          // Se a resposta da API não for bem-sucedida, mostra uma mensagem de erro
          console.error('Failed to login');
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
      }
    }
  }
  </script>