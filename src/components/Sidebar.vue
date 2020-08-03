<template>
  <md-app>
    <div v-if="this.getSidebar != 'agent'" class="sidebar mx-auto">
      <v-navigation-drawer class="accent-4" color="#473390" dark permanent>
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <div v-if="this.$router.currentRoute.name == 'Chat'">
                <v-btn icon x-large color="white" @click="GoTo('Chat')" id="chat" disabled>
                  <v-icon dark>mdi-message-processing</v-icon>
                </v-btn>
              </div>
              <div v-else>
                <v-btn icon x-large color="white" @click="GoTo('Chat')" id="chat">
                  <v-icon dark>mdi-message-processing</v-icon>
                </v-btn>
              </div>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <div v-if="this.$router.currentRoute.name == 'Agent'">
                <v-btn icon x-large color="white" @click="GoTo('Agent')" id="kontak" disabled>
                  <v-icon dark>mdi-contacts</v-icon>
                </v-btn>
              </div>
              <div v-else>
                <v-btn icon x-large color="white" @click="GoTo('Agent')" id="kontak">
                  <v-icon dark>mdi-contacts</v-icon>
                </v-btn>
              </div>
            </v-list-item-icon>
          </v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn icon x-large color="white" @click="logout" id="keluar">
              <v-icon dark>mdi-login-variant</v-icon>
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </div>

    <div v-else class="sidebar mx-auto">
      <v-navigation-drawer class="accent-4" color="#473390" dark permanent>
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <div v-if="this.$router.currentRoute.name == 'Chat'">
                <v-btn icon x-large color="white" @click="GoTo('Chat')" id="chat" disabled>
                  <v-icon dark>mdi-message-processing</v-icon>
                </v-btn>
              </div>
              <div v-else>
                <v-btn icon x-large color="white" @click="GoTo('Chat')" id="chat">
                  <v-icon dark>mdi-message-processing</v-icon>
                </v-btn>
              </div>
            </v-list-item-icon>
          </v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn icon x-large color="white" @click="logout" id="keluar">
              <v-icon dark>mdi-login-variant</v-icon>
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </div>
  </md-app>
</template>

<script>
export default {
  data: () => ({
    path: "",
    getSidebar: sessionStorage.getItem("user"),
  }),
  mounted: {
  },
  methods: {
    GoTo: function (path) {
      // router.push({ name: path })
      this.$router.push({ name: path });
      console.log();
      this.path.push(this.$router.currentRoute.name);
      console.log(this.path);
    },
    logout: function () {
      sessionStorage.clear();
      window.location.href = "../";
    },
  },
};
</script>

<style>
.sidebar {
  height: 100vh;
  background-color: #473390;
  width: 78px;
  box-shadow: 0 0 10px 0;
  position: fixed;
  z-index: 10;
}
</style>