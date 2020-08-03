<template>
  <md-app class="app-wrapper">
    <v-container fluid v-if="rr != null" class="py-0">
      <v-row>
        <!-- Tombol sisi kiri -->
        <sidebar/>

        <!-- </div> -->
        <v-col cols="6" md="6" lg="6" style="padding:0px">
          <div class="listuser1">
            <div style="margin-top: 80px ">
              <template>
                <div style="margin-left: 10px ">
                  <div class="tabelagent">
                    <v-simple-table height="100%" id="warnavutura">
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Nama</th>
                            <th class="text-left">Username</th>
                            <!-- <th class="text-left">Password</th> -->
                            <th class="text-left"></th>
                          </tr>
                        </thead>
                        <tbody style="overflow-y: auto">
                          <!-- LOOPING ALL AGENT -->
                          <template v-for="(item, index) in agent">
                            <tr v-if="agent" :key="index" @click="getAkun(item.username)">
                              <td>{{item.name}}</td>
                              <td>{{item.username}}</td>
                              <!-- <td> {{item.password}} </td> -->
                              <td>
                                <v-btn icon @click="getAgent(item._id)">
                                  <v-icon>mdi-pencil</v-icon>
                                </v-btn>

                                <!-- Popup -->
                                <div class>
                                  <v-dialog v-model="dialog" width="500">
                                    <template v-slot:activator="{ on }">
                                      <v-btn icon v-on="on" @click="getAgentHapus(item._id)">
                                        <v-icon>mdi-delete</v-icon>
                                      </v-btn>
                                    </template>
                                    <v-card>
                                      <v-card-title
                                        class="headline grey lighten-2"
                                        primary-title
                                      >warning</v-card-title>

                                      <v-card-text>
                                        <h2>Apakah data akan dihapus ?</h2>
                                      </v-card-text>

                                      <v-divider></v-divider>

                                      <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" text @click="hapusAgent(idh)">Hapus</v-btn>

                                        <v-btn color="primary" text @click="dialog=false">Cancel</v-btn>
                                      </v-card-actions>
                                    </v-card>
                                  </v-dialog>
                                </div>
                              </td>
                            </tr>
                          </template>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </v-col>
        <!-- Bagian List agent -->

        <!-- Bagian Edit Agent -->
        <v-col cols="6" md="6" lg="6" style="padding:0px">
          <div class="listuser2">
            <div class="manage">
              <v-card-text>
                <!-- Header -->
                <div style="text-align: center ">
                  <p class="display-1 text--primary">MANAGE AGENT {{title}}</p>
                </div>

                <!-- Isi -->

                  <div class="isian">
                    <div style="text-align: center ">
                      <h3>NAMA</h3>
                      <v-text-field v-model="name" width="200px" placeholder="Tuliskan Nama"></v-text-field>
                    </div>
                    <div style="text-align: center ">
                      <h3>USERNAME</h3>
                      <v-text-field
                        v-model="username"
                        width="200px"
                        placeholder="Tuliskan Username"
                      ></v-text-field>
                    </div>
                    <div style="padding-top: 30px"></div>
                    <div style="text-align: center ">
                      <h3>PASSWORD</h3>
                      <v-text-field
                        type="password"
                        v-model="password"
                        width="200px"
                        placeholder="Tuliskan Passsword"
                      ></v-text-field>
                    </div>
                  </div>
 
              </v-card-text>

              <!-- Tombol -->

              <div v-if="this.tipe == 'tambah'" style="text-align: center ">
                <v-btn
                  dark
                  color="#FF6C00"
                  flat
                  width="200px"
                  height="50px"
                  @click="tambahAgent"
                >TAMBAH AGENT</v-btn>
                <div style="padding-top: 20px"></div>
              </div>

              <div v-if="this.tipe == 'ubah'" style="text-align: center ">
                <v-btn
                  dark
                  color="#FF6C00"
                  flat
                  width="200px"
                  height="50px"
                  @click="ubahAgent"
                >SIMPAN PERUBAHAN</v-btn>
                <div style="padding-top: 20px"></div>
              </div>

              <div v-if="this.tipe == 'ubah'" style="text-align: center ">
                <v-btn
                  dark
                  color="red"
                  flat
                  width="200px"
                  height="50px"
                  @click="batalUbahAgent"
                >BATALKAN PERUBAHAN</v-btn>
                <div style="padding-top: 20px"></div>
              </div>

            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </md-app>
</template>


<script>
import moment from "moment";
import axios from "axios";
import sidebar from "../components/Sidebar";
export default {
  components: {
    sidebar,
  },
  data: () => ({
    dialog: false,
    rr: sessionStorage.getItem("login"),
    idh: null,
    name: null,
    username: null,
    password: null,
    message: null,
    warning: null,
    rid: null,
    title: null,
    messageGambar: null,
    item: 1,
    agent: [],
    tipe: "tambah",
    /* agent : [
      {nama: 'Adlin', email: 'torq@gmail.com', password: 'touring'},
      {nama: 'Pewd', email: 'tor@ymail.com', password: 'GRANDTOURER'},
      {nama: 'Von', email: 'zyl@gmail.com', password: 'layz'},
    ], */
    chat: [],
    adadi: null,
    date: "",
  }),

  methods: {
    /* CREATE AGENT */
    tambahAgent: function () {
      axios
        .post("http://intern.vutura.io:3000/admin/agents/create", {
          name: this.name,
          username: this.username,
          password: this.password,
        })
        .then((Response) => {
          if (Response.status == 201) {
            this.name = null;
            this.username = null;
            this.password = null;
            /* this.warning = "Tambah Agent Sukses"; */
            alert("Data Berhasil Ditambahkan");
            window.location.href = "../agent";
          } else {
            this.warning = "Gagal";
          }
        });
    },

    /* EDIT AGENT */
    ubahAgent: function () {
      axios
        .post("http://intern.vutura.io:3000/admin/agents/update/" + this.rid, {
          name: this.name,
          username: this.username,
          password: this.password,
        })
        .then((Response) => {
          if (Response.status == 200) {
            this.name = null;
            this.username = null;
            this.password = null;
            alert("Update Berhasil");
            window.location.href = "../agent";
            this.tipe = 'tambah'
          } else {
            this.warning = "Gagal";
          }
        });
    },

    batalUbahAgent: function(){
      this.name = null;
      this.username = null;
      this.password = null;
      this.title = null;
      this.tipe = 'tambah'
    },

    /* Get Agent */
    getAgent: function (id) {
      axios.get("http://intern.vutura.io:3000/admin/agents/" + id).then((r) => {
        this.name = r.data.data.name;
        this.title = r.data.data.name;
        this.username = r.data.data.username;
        this.password = r.data.data.password;
        this.rid = r.data.data._id;
        this.tipe = 'ubah'
      });
    },

    getAgentHapus: function (id) {
      axios.get("http://intern.vutura.io:3000/admin/agents/" + id).then((r) => {
        this.idh = r.data.data._id;
      });
    },

    /* Hapus Agent */
    hapusAgent: function (id) {
      axios
        .delete("http://intern.vutura.io:3000/admin/agents/delete/" + id)
        .then((Response) => {
          if (Response.status == 200) {
            window.location.href = "../agent";
            this.dialog = false;
          } else {
            this.warning = "Hapus gagal";
            this.dialog = false;
          }
        });
    },

    /* -------------- Ini untuk Logout  ----------- */
    logout: function () {
      sessionStorage.clear();
      window.location.href = "../";
    },
  },
  filters: {
    changeDateFilter: function (value) {
      return moment(value).format("LT");
    },
    changeDateFilterDate: function (value) {
      return moment(value).format("L");
    },
  },

  /* MELOAD SELURUH AGENT */
  mounted() {
    axios
      .get("http://intern.vutura.io:3000/admin/agents") /* ENDPOINT BELUM ADA */
      .then((r) => {
        this.agent = r.data.data;
      });
  },
};
</script>

<style>
textarea {
  overflow: auto;
  resize: none;
}
.container-fluid {
  min-height: 100vh;
  position: absolute;
}
.boxisian {
  margin: 1px;
}
.manage {
  /* margin: 100px; */
  border-radius: 5px;
  height: auto;
  background-color: white;
  width: 70vh;
  box-shadow: 0 0 30px 1px;
  /* position: relative; */
}
.listuser1 {
  background-color: #f1efff;
  position: relative;
  left: 70px;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}
.listuser2 {
  background-color: white;
  position: relative;
  padding-top: 10vh;
  left:15vh;
  width: 100%;
  height: 100vh;
}
#warnavutura {
  background-color: #f1efff;
}
#boxchat1 {
  background-color: #ffffff;
  position: absolute;
  left: 800px;
  z-index: 0;
  width: 67%;
  height: 100%;
}
#boxeditagent1 {
  background-color: white;
  position: fixed;
  top: 7%;
  left: 1000px;
  width: 30%;
  height: 100%;
}
#boxuser1 {
  position: absolute;
  background-color: #f1efff;
  top: 70px;
  width: 150%;
  height: 80%;
  box-shadow: 0 -5px 5px -5px rgb(214, 214, 214);
  overflow-x: hidden;
  overflow-y: auto;
}

.perulanganuser1 {
  width: 100%;
  height: 60px;
  position: static;
  background-color: #f1efff;
  margin-top: 2px;
  box-shadow: 0 5px 10px -10px #333;
}
.perulanganuser:hover,
.perulanganuser:focus {
  text-decoration: none;
  cursor: pointer;
  background-color: #dedaff;
}

#header-chat {
  background-color: #f1efff;
  height: 70px;
  width: 100%;
  position: absolute;
  top: 0px;
}
.terima {
  padding: 5px 0 0 10px;
  float: left;
  width: 80%;
}
.kirim {
  padding: 5px 0 0 10px;
  float: right;
  position: relative;
  width: 80%;
}
#console {
  width: 100%;
}
#console-admin {
  width: 100%;
}

#keluar {
  bottom: 12px;
  position: absolute;
  left: 12px;
}
#chat {
  top: 80px;
  position: absolute;
  left: 12px;
}
#kontak {
  top: 150px;
  position: absolute;
  left: 12px;
}
#logo-vutura {
  height: 70px;
  position: absolute;
  padding: 10px;
  right: 45%;
}
.image {
  width: 40px;
  border-radius: 30px;
}
#tglchat {
  position: absolute;
  top: 80px;
  background-color: #f1efff;
  margin: 0 -50% 0 40%;
  padding: 5px;
  border-radius: 5px;
}
.isian {
  margin-right: 100px;
  margin-left: 100px;
}
.tabelagent {
  position: static;
  margin-left: 50px;
  margin-right: 50px;
  min-width: 100px;
  overflow-y: auto;
}
</style>
