<template>
  <div class="home">
    <v-app>
      <!--------------LOGIN----------------------------------------->
      <template>
        <v-container fluid class="my-auto">
          <v-row align="center" justify="center">
            <v-col cols="12" sm="12" md="4">
              <v-card class="elevation-10" color="#F1EFFF" >
                <v-toolbar color="#F1EFFF" flat>
                  <v-spacer></v-spacer>
                  <div id="logo">
                    <img src="../assets/logo-vutura.png" id="logo-vutura" />
                  </div>
                  <v-spacer></v-spacer>
                </v-toolbar>

                <div style="padding-top:0.5cm"></div>

                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <div style="padding-top:1cm"></div>
                    <v-toolbar flat color="#F1EFFF">
                      <v-spacer></v-spacer>
                      <v-text-field
                      
                        v-model="username"
                        label="Username"
                        :rules="usernameRules"
                        name="username"
                        solo
                        flat
                        class="my-input"
                      ></v-text-field>
                      <v-spacer></v-spacer>
                    </v-toolbar>

                    <div style="padding-top:0.5cm"></div>

                    <v-toolbar flat color="#F1EFFF">
                      <v-spacer></v-spacer>
                      <v-text-field
                        v-model="password"
                        id="password"
                        label="Password"
                        :rules="passwordRules"
                        v-on:keyup.enter="login"
                        name="password"
                        solo
                        flat
                        class="my-input"
                        type="password"
                      ></v-text-field>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn dark color="#FF6C00" @click="login" flat width="200px" height="50px">Login</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>

                <v-card-text class="justify-center">
                  <div style="text-align: center">
                    <h8>{{pesanError}}</h8>
                  </div>
                </v-card-text>

                <v-layout row v-if="error">
                  <v-flex xs12 sm6 offset-sm3>
                    <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
                  </v-flex>
                </v-layout>

                <div style="padding-bottom:1cm"></div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <!--------------End LOGIN----------------------------------------->
    </v-app>
  </div>
</template>


<script src="/socket.io/socket.io.js"></script>

<script>
import axios from "axios";
export default {
  data: () => ({
    valid: true,
    username: "",
    password: "",
    pesanError: "",
    alert: false,
    usernameRules: [(v) => !!v || "Masukan Username"],
    passwordRules: [(v) => !!v || "Masukan Password"],
  }),

  methods: {
    login: function () {
      axios
        .post("http://intern.vutura.io:3000/admin/login", {
          username: this.username,
          password: this.password,
        })
        .then((Response) => {
          const log = Response.data;
          console.log(log.data);
          sessionStorage.setItem("login", log.data._id);
          sessionStorage.setItem("user", log.data.role);
          /* Register socket */
          /* socket.emit('register-as-admin', log.id); */
          if (log.msg == "Login Sukses") {
            axios.get("http://intern.vutura.io:3000/admin/home").then((r) => {
              const user = r.data.data;
              sessionStorage.setItem("userChat", JSON.stringify(user));
              console.log(JSON.parse(sessionStorage.getItem("userChat")));
            });
            window.location.href = "../Chat";
          } else if (log.msg != "Login Sukses") {
            this.pesanError = "Username atau Password Salah";
            this.alert = true;
          }
        })
        .catch((err) => {
          /* untuk error 4xx */
          if (err.response) {
            this.pesanError = "Username atau Password Salah";
            this.alert = true;
          } else {
            /* misal req error dll */
            this.pesanError = "Sistem Sedang Gangguan";
            this.alert = true;
          }
        });
    },
  },
};
</script>

<style>
body {
  overflow: hidden;
}
.my-input.v-input .v-input__slot {
  border-radius: 100px;
  width: auto;
}

.tengah {
  text-align: center;
}
</style>
