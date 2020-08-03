<template>
  <md-app class="app-wrapper">
    <v-container fluid v-if="rr != null" class="py-0">
      <v-row>
        <!-- Side Bar -->
        <sidebar/>

        <v-col
          cols="3"
          md="3"
          lg="3"
          id="listuser"
          style="border-right-style: solid;  border-color: #C1C1C1; margin-left:80px"
        >
          <!-- Logo -->
          <v-row>
            <v-col id="logo">
              <img
                src="../assets/logo-vutura.png"
                style="
                width:40px;
                margin:auto;
                display: block;
                margin-left: auto;
                margin-right: auto;"
              />
            </v-col>
          </v-row>

          <!-- Bar Search User -->
          <v-row>
            <div id="boxsearchuser">
              <div style="margin: 7px">
                <v-text-field
                  v-model="search"
                  id="search-user"
                  class="search-user"
                  placeholder="Cari Pengguna"
                  outlined
                ></v-text-field>
              </div>
            </div>
          </v-row>

          <!-- Perulangan user -->
          <v-row>
            <div id="boxuser" v-on:scroll.passive="handleScrollUser">
              <!-- <div v-for="(item, index) in user" :key="index"> -->
              <div v-for="(item, index) in filteredUser" :key="index">
                <div class="perulanganuser" @click="getMessage(item._id, item.username)">
                  <v-row>
                    <v-col cols="3" class="text-center">
                      <v-avatar color="#473390">
                        <span
                          class="white--text headline text-capitalize"
                        >{{item.profile.username.charAt(0)}}</span>
                      </v-avatar>
                    </v-col>
                    <v-col cols="7">
                      <p class="text-h6" style="margin-top:7px;">{{item.profile.username}}</p>
                    </v-col>
                    <v-col>
                      <v-badge
                        :content="item.notification"
                        :value="item.notification"
                        color="#473390"
                        overlap
                      ></v-badge>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </div>
          </v-row>
        </v-col>

        <!-- Box Chat -->
        <v-col id="boxchat">
          <div v-if="cid">
            <!-- <div id="tglchat" v-if="date">{{date | changeDateFilterDate}}</div> -->

            <v-row>
              <v-col id="header-chat">
                <div class="row">
                  <div class="col-2">
                    <v-dialog v-model="dialog" width="500">
                      <template v-slot:activator="{ on }">
                        <v-btn
                          icon
                          v-on="on"
                          class="custom-file-upload"
                          @click="getProfileCust(cid)"
                        >
                          <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title class="headline lighten-2" primary-title>
                          <!-- Data {{nama}} -->
                        </v-card-title>

                        <div style="padding-top:0.5cm"></div>

                        <v-card-text>
                          <div class="isian">
                            <div style="text-align: center ">
                              <h3>NAMA</h3>
                              <v-text-field
                                v-model="namaCust"
                                width="200px"
                                placeholder="Tuliskan Nama"
                              ></v-text-field>
                            </div>
                            <div style="padding-top: 30px"></div>
                            <div style="text-align: center ">
                              <h3>EMAIL</h3>
                              <v-text-field
                                v-model="emailCust"
                                width="200px"
                                disabled
                                placeholder="Tuliskan Email"
                              ></v-text-field>
                            </div>
                            <div style="padding-top: 30px"></div>
                            <div style="text-align: center ">
                              <h3>INFORMASI</h3>
                              <v-textarea v-model="noteCust" width="200px" label="Tuliskan Info"></v-textarea>
                            </div>
                          </div>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" text @click="updateCust(); dialog=false;">Update</v-btn>

                          <v-btn color="primary" text @click="dialog=false">Cancel</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>

                  <div class="col">
                    <h1 class="custom-nama">{{nama}}</h1>
                  </div>

                  <!-- Bar Search User -->
                  <div class="col">
                    <div style="margin-right: 40px">
                      <v-text-field
                        v-model="searchmsg"
                        id="search-msg"
                        class="search-msg"
                        placeholder="Cari Pesan"
                      ></v-text-field>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col id="isichat" v-if="chat != []" v-on:scroll.passive="handleScroll">
                <!-- Chat yg dikirim ditampilkan -->

                <!-- Dari damin -->
                <div id="console-admin" ref="console">
                  <template v-for="(item, index) in filteredMsg">
                    <div class="kirim" v-if="item.from == 'admin'" :key="index">
                      <div class="row">
                        <div class="col">
                          <div class="kirim-warna">
                            <a v-if="item.img " :href="item.img" target="_blank">
                              <img v-if="item.img " class="preview" :src="item.img" />
                              <p></p>
                            </a>

                            <div v-if="item.file">
                              <p></p>
                              <v-btn
                                depressed
                                color="blue"
                                :href="item.file"
                                target="_blank"
                                class="ma-2 white--text"
                              >
                                <h5>{{item.msg}}</h5>
                                <v-icon right dark>mdi-file</v-icon>
                              </v-btn>
                              <p></p>
                            </div>

                            <p v-if="item.img == '' && item.file == ''">{{item.msg}}</p>

                            <div class="time-send">
                              <small>{{item.date | changeDateFilter}}</small>
                              <v-icon
                                v-if=" item.read == true"
                                color="blue"
                                style="font-size:15px;"
                              >mdi-check-all</v-icon>
                              <v-icon v-else color="blue" style="font-size:15">mdi-check-all</v-icon>
                            </div>
                          </div>
                        </div>

                        <div class="col-1">
                          <img src="../assets/logo-vutura.png" class="image" />
                        </div>
                      </div>
                    </div>

                    <!-- Dari Customer -->
                    <div class="terima" v-else :key="index">
                      <div class="row">
                        <!-- <img src="../assets/avatar1.png" class="image"> -->
                        <div class="col-1">
                          <div class="size" color="#473390">
                            <span class="white--text headline text-capitalize">{{ava}}</span>
                          </div>
                        </div>

                        <!-- <img :src="icon" class="image"> -->
                        <div class="col">
                          <div class="terima-warna">
                            <a v-if="item.img " :href="item.img" target="_blank">
                              <img v-if="item.img " class="preview" :src="item.img" />
                            </a>

                            <div v-if="item.file">
                              <p></p>
                              <v-btn
                                depressed
                                color="blue"
                                :href="item.file"
                                target="_blank"
                                class="ma-2 white--text"
                              >
                                <h5>{{item.msg}}</h5>
                                <v-icon right dark>mdi-file</v-icon>
                              </v-btn>
                              <p></p>
                            </div>

                            <p v-if="item.img == '' && item.file == ''">{{item.msg}}</p>

                            <div class="time-send">
                              <small id="jamterima">{{item.date | changeDateFilter}}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>

                <!-- Chat dari socket -->
              </v-col>
            </v-row>

            <!-- BAGIAN KIRIM-KIRIM -->
            <div v-if="messageGambar" class="vgambar" style="position: fixed">
              <div>
                <v-btn icon color="pink" @click="hapusFile">
                  <v-icon>mdi-window-close</v-icon>
                </v-btn>
              </div>
              <div style="position: fixed">
                <img v-if="messageGambar" :src="messageGambar" width="300" height="200" />
              </div>
            </div>

            <div v-if="messageDocument" class="vgambar2" style="position: fixed">
              <div>
                <v-btn icon color="pink" @click="hapusFile">
                  <v-icon>mdi-window-close</v-icon>
                </v-btn>
              </div>
              <div style="position: fixed width: 20vw">
                <h1 v-if="messageDocument">{{ namaDoc }}</h1>
              </div>
            </div>

            <v-row>
              <v-col id="message">
                <div class="row my-n3">
                  <!-- Add Dokumen -->
                  <div class="col-md-1">
                    <label class="custom-file-upload">
                      <input
                        type="file"
                        ref="file"
                        accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        :disabled="messageGambar !== null || message !== ''"
                        @change="viewDocument"
                      />
                      <i class="mdi mdi-36px mdi-file-document"></i>
                    </label>
                  </div>

                  <!-- Add Gambar -->
                  <div class="col-md-1">
                    <label class="custom-file-upload3">
                      <input
                        type="file"
                        ref="file"
                        accept="image/x-png, image/jpeg"
                        :disabled="message !== '' || messageDocument !== null"
                        @change="viewGambar"
                      />
                      <i class="mdi mdi-36px mdi-image"></i>
                    </label>
                  </div>

                  <!-- Tulis Pesan -->
                  <div class="col-md-9">
                    <v-text-field
                      outlined
                      height="10px"
                      :disabled="messageGambar !== null || messageDocument !== null"
                      v-model="message"
                      name="pesan"
                      id="textarea1"
                      class="materialize-textarea"
                      cols="75"
                      placeholder="Masukkan Pesan..."
                      @keydown="inputHandler"
                    ></v-text-field>
                  </div>

                  <!-- Tombol Kirim Pesan -->
                  <div class="col">
                    <v-btn
                      v-if="message"
                      icon
                      large
                      color="black"
                      type="submit"
                      @click="sendMessage "
                    >
                      <v-icon>mdi-send</v-icon>
                    </v-btn>

                    <v-btn
                      v-if="messageGambar"
                      icon
                      large
                      color="black"
                      type="submit"
                      @click="sendPicture "
                    >
                      <v-icon>mdi-send</v-icon>
                    </v-btn>

                    <v-btn
                      v-if="messageDocument"
                      icon
                      large
                      color="black"
                      type="submit"
                      @click="sendDocument "
                    >
                      <v-icon>mdi-send</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
          <div v-else id="NoMessage">
            <img src="../assets/icon chat.png" id="logo-vutura2" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </md-app>
</template>

<script src="/socket.io/socket.io.js"></script>

<script>
import moment from "moment";
import axios from "axios";
import io from "socket.io-client";
import firebase from "firebase/app";
import sidebar from "../components/Sidebar";

var socket = io("http://intern.vutura.io:3000"); /* Koneksi */

export default {
  components: { sidebar },
  data: () => ({
    io,
    rr: sessionStorage.getItem("login") /* Nyimpen id admin */,
    nama: "",
    firstname: "",
    dialog: false,
    profile: "",
    message: "",
    msg: null /* untuk didalem fungsi aja */,
    img: null /* untuk didalem fungsi aja */,
    idcust: null /* untuk didalem fungsi aja */,
    icon: null,
    messageGambar: null,
    messageDocument: null,
    item: 1,
    user: [],
    cid: null /* Menyimpan id cust yg dipencet */,
    chat: [] /* Penampung dari API */,
    chat1: [] /* Penampung dari socket */,
    adadi: null,
    date: "",
    pic: null,
    picUrl: "" /* nyimpen url hasil upload */,
    picUrl2: null,
    uploadValue: 0,
    ava: "",
    status: "",
    search: "",
    searchmsg: "",

    /* manage cust */
    namaCust: null,
    emailCust: null,
    noteCust: null,

    namaDoc: null,
    namaImg: null,
  }),

  /* Untuk searching */
  computed: {
    filteredUser: function () {
      return this.user.filter((names) => {
        return names.profile.username.match(this.search);
      });
    },

    filteredMsg: function () {
      return this.chat.filter((names) => {
        return names.msg.match(this.searchmsg);
      });
    },
  },
  mounted() {
    this.getCustomer();
    /* register as admin */
    // console.log("before");
    socket.emit("register-as-admin");
    // console.log("after");
    /* Open admin */
    socket.on("open-admin");
    this.setupWebSocket();
    socket.on("customerChat", (r) => {
      var idChatNotification = r._id;
      var getidcust = sessionStorage.getItem("idCust");
      if (getidcust == r._id) {
        this.chat.push({
          msg: r.msg,
          from: r._id,
          img: r.img,
          file: r.file,
        });
      }
      /* insert nontification */
      var ClickCustomers = sessionStorage.getItem("idCust");
      if (ClickCustomers != idChatNotification) {
        for (let i = 0; i < this.user.length; i++) {
          if (this.user[i]._id == idChatNotification) {
            this.user[i].notification += 1;
          }
        }
      } else {
        for (let i = 0; i < this.user.length; i++) {
          if (this.user[i]._id == idChatNotification) {
            this.user[i].notification = 0;
          }
        }
      }
      this.$nextTick(() => {
        this.scrollToEnd();
      });
      // console.log("in")
    });
  },
  methods: {
    getCustomer: function () {
      axios.get("http://intern.vutura.io:3000/admin/limit/home").then((r) => {
        this.user = r.data.data;
        sessionStorage.setItem("idCustForScroll", r.data.data[14]._id);
        // console.log(r.data.data)
      });
    },

    pindah: function () {
      // socket.emit("close-admin");
    },

    viewGambar(e) {
      const file = e.target.files[0];
      this.pic = e.target.files[0];
      this.namaImg = file.name;
      this.messageGambar = URL.createObjectURL(file);
    },

    viewDocument(e) {
      const file = e.target.files[0];
      this.pic = e.target.files[0];
      this.namaDoc = file.name;
      this.messageDocument = URL.createObjectURL(file);
    },

    hapusFile() {
      this.messageGambar = null;
      this.messageDocument = null;
    },

    /* Ini untuk kirim chat */
    sendMessage: function (event) {
      const id = sessionStorage.getItem("idCust");
      if (this.message) {
        /*  axios.post('http://intern.vutura.io:3000/admin/home/chat/'+id,{
            message: this.message
          })
          .then((Response) =>{
            console.log(Response.status)
            if(Response.status == 201){ */
        console.log(Response);
        this.chat.push({
          /* langsung tampil di boxchat */
          img: "",
          from: "admin",
          msg: this.message,
          file: "",
        });

        /* Ini untuk emit text aja ke socket */
        var data = {};
        data.msg = this.message;
        data.idcust = this.cid;
        data.img = "";
        data.file = "";
        socket.emit("adminChat", data, (callback) => {
          console.log(callback);
        });
        console.log("habis emit");

        console.log(this.chat);
        this.message = "";
        this.$nextTick(() => {
          this.scrollToEnd();
        });
      }
    },

    sendPicture: function (event) {
      const id = sessionStorage.getItem("idCust");
      const file = this.$refs.file.files[0];

      /* Bagian Upload */
      this.picUrl = null;
      if (file.size > 1024 * 1024) {
        console.log("file kegedean");
        alert("Foto melebihi kapasitas 1MB");
        return;
      } else {
        const storageRef = firebase
          .storage()
          .ref(`${this.pic.name}`)
          .put(this.pic);
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          /* Bagian Push ke chatbox */
          this.chat.push({
            msg: this.namaImg,
            from: "admin",
            img: url,
          });

          /* EMIT URL HARUS DARI SINI, kalau tidak bakal null */
          /* Ini untuk emit chat ke socket */
          var data = {};
          (data.msg = this.namaImg), (data.idcust = this.cid);
          data.img = url;
          data.file = "";
          socket.emit("adminChat", data, (callback) => {
            console.log(callback);
            if (callback == true) {
              this.status = "read";
            }
          });
          socket.on("open-cust", (data) => {
            console.log(data.msg);
          });
        });
      }
      this.messageGambar = null;
      this.$nextTick(() => {
        this.scrollToEnd();
      });
    },

    sendDocument: function (event) {
      const id = sessionStorage.getItem("idCust");
      const file = this.$refs.file.files[0];

      /* Bagian Upload */

      const storageRef = firebase
        .storage()
        .ref(`${this.pic.name}`)
        .put(this.pic);
      storageRef.snapshot.ref.getDownloadURL().then((url) => {
        /* Bagian Push ke chatbox */
        this.chat.push({
          msg: this.namaDoc,
          from: "admin",
          img: "",
          file: url,
        });

        /* EMIT URL HARUS DARI SINI, kalau tidak bakal null */
        /* Ini untuk emit chat ke socket */
        var data = {};
        data.msg = this.namaDoc;
        data.idcust = this.cid;
        data.img = "";
        data.file = url;
        socket.emit("adminChat", data, (callback) => {
          console.log(callback);
          if (callback == true) {
            this.status = "read";
          }
        });
        socket.on("open-cust", (data) => {
          console.log(data.msg);
        });
      });

      this.messageDocument = null;
      console.log("dokumen kekirim");
      this.$nextTick(() => {
        this.scrollToEnd();
      });
    },

    inputHandler: function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        if (this.message) {
          this.sendMessage();
        }
      }
    },

    /* Ini untuk Logout */

    /* Get msg id & username (klik user) */
    getMessage: function (s, u) {
      for (let i = 0; i < this.user.length; i++) {
        if (this.user[i]._id == s) {
          this.user[i].notification = 0;
        }
      }
      sessionStorage.removeItem("listChat");
      /* close socket */
      // socket.emit("close-admin");

      this.chat = [];
      this.date = "";
      this.nama = "";
      /* this.getNamaCust(s); */
      console.log("halo");
      const nm = "";
      axios
        .get("http://intern.vutura.io:3000/customers/profile/" + s)
        .then((r) => {
          this.nama = r.data.profile.username;
          this.ava = r.data.profile.username.charAt(0);
        });

      /* this.ava = this.nama.charAt(0); */
      this.cid = s; /* Menyimpan ID yg dipencet */
      sessionStorage.setItem("idCust", s);
      sessionStorage.removeItem("listChat");
      axios
        .get("http://intern.vutura.io:3000/admin/home/limit/" + s)
        .then((r) => {
          // console.log(r.data.data);
          this.date = r.data.data[0].date;
          this.chat = r.data.data.reverse();
          sessionStorage.setItem("lastChatId", this.chat[0]._id);
          // sessionStorage.setItem("listChat", JSON.stringify(r.data.data));
          /* if the chat is not empty then it will scroll the chat to the bottom of page */
          if (this.chat != []) {
            /* 
                $nextTick is 
                Defer the callback to be executed after the next DOM update cycle. 
                Use it immediately after you’ve changed some data to wait for the DOM update. 
                This is the same as the global Vue.nextTick, except that the callback’s this context 
                is automatically bound to the instance calling this method. 
            */
            this.$nextTick(() => {
              this.scrollToEnd();
              console.log($("#console-admin").height());
            });
          }
        });

      /* open socket */
      socket.emit("open-admin", s);
      this.searchmsg = "";
      this.message = "";
      this.messageDocument = null;
      this.messageGambar = null;
    },

    scrollToEnd: function () {
      // $("#isichat").scrollTop($("console-admin").height())
      $("#isichat")
        .stop()
        .animate({ scrollTop: $("#console-admin").height() }, 1000);
    },

    handleScroll: function (e) {
      var idCust = sessionStorage.getItem("idCust");
      var lastIdChat = sessionStorage.getItem("lastChatId");
      // sessionStorage.removeItem("idCust");
      // sessionStorage.setItem("idCust", s);
      // console.log($("#console-admin").height())
      var chatDivHeight = $("#console-admin").height();
      var scrollPosition = e.target.scrollTop;
      if (scrollPosition == 0) {
        axios
          .get(
            "http://intern.vutura.io:3000/admin/home/scroll/" +
              idCust +
              "/" +
              lastIdChat
          )
          .then((r) => {
            var data = r.data.data;
            // console.log(data);
            if (data != []) {
              for (let i = 0; i < data.length; i++) {
                this.chat.unshift(data[i]);
                sessionStorage.setItem("lastChatId", data[i]._id);
              }
              this.$nextTick(() => {
                var newchatDivHeight = $("#console-admin").height();
                // $(".modal-content")[0].scrollTo(0, NewHeight-modalHeight)
                $("#isichat").scrollTop(newchatDivHeight - chatDivHeight);
                console.log(newchatDivHeight - chatDivHeight);
                // console.log(this.chat)
              });
            }
          });
      }
    },

    handleScrollUser: function (e) {
      var ScrollUserPosition = e.target.scrollTop;
      /* 91.703 is the difference bettwen ScrollUserPosition and  heightUserDiv*/
      var heightUserDiv = $("#boxuser").height() + 91.703;
      var lastIdCust = sessionStorage.getItem("idCustForScroll");
      if (ScrollUserPosition == heightUserDiv) {
        axios
          .get("http://intern.vutura.io:3000/admin/scroll/home/" + lastIdCust)
          .then((r) => {
            var data = r.data.data;
            if (data) {
              for (let i = 0; i < data.length; i++) {
                this.user.push(data[i]);
              }
            }
            // console.log(r.data.data)
          });
      }
      // console.log($("#boxuser").height())
    },

    getNamaCust: function (id) {
      axios
        .get("http://intern.vutura.io:3000/customers/profile/" + id)
        .then((r) => {
          this.nama = r.data.profile.username;
        });
    },

    /* get profile cust */
    getProfileCust: function (id) {
      axios
        .get("http://intern.vutura.io:3000/customers/profile/" + id)
        .then((r) => {
          this.namaCust = r.data.profile.username;
          this.emailCust = r.data.profile.email;
          this.noteCust = r.data.profile.note;
        });
    },

    /* Edit cust */
    updateCust: function () {
      axios
        .post(
          "http://intern.vutura.io:3000/customers/profile/update/" + this.cid,
          {
            username: this.namaCust,
            email: this.emailCust,
            note: this.noteCust,
          }
        )
        .then((Response) => {
          if (Response.status == 200) {
            console.log("update cust sukses");
            window.location.href = "../Chat";
          } else {
            this.warning = "Gagal";
          }
        });
    },

    /* Untuk Scroll bagian chat */

    setupWebSocket() {
      try {
        const socket = this.io("http://intern.vutura.io:3000");
        socket.on("open-cust", (r) => {
          console.log(r.msg);
        });

        socket.on("customerChat", (r) => {
          var getidcust = sessionStorage.getItem("idCust");
          if (getidcust == r._id) {
            this.chat.push({
              msg: r.msg,
              from: r._id,
              img: r.img,
              file: r.file,
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },

  watch: {
    firstname: function (newValue) {
      this.r = this.getFirstLetter(newValue);
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

  /* MELOAD ALL CUSTOMER */
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
body {
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  font-size: 12px;
}
textarea {
  overflow: auto;
  resize: none;
}
.preview {
  max-width: 250px;
  max-height: 250px;
  width: auto;
  height: auto;
  border-radius: 5px;
}
.container .app-wrapper {
  min-height: 100vh;
  position: absolute;
}

#listuser {
 
  background-color: #f1efff;
  z-index: 0;
  width: 60vh;
  height: 100%;
}
#boxchat {
  position: relative;
  padding: 0px, 0px, 0px,10px;
  background-color: #ffffff;
  width: 85%;
  height: 100vh;
}
#NoMessage {
  background-color: #ffffff;
  position: fixed;
  right: 0px;
  z-index: 0;
  width: 50%;
  height: 100vh;
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
#boxsearchuser {
  z-index: 100;
  background-color: #f1efff;
  /* top: 70px; */
  width: 100%;
  height: 10vh;
}
#search-user {
  height: 40px;
  font-size: 15pt;
}
.search-user label[for] {
  height: 40px;
  font-size: 15pt;
}
#search-msg {
  height: 20px;
  font-size: 10pt;
}
.search-msg label[for] {
  height: 20px;
  font-size: 10pt;
}
#boxuser {
  z-index: 0;
  background-color: #f1efff;
  width: 100%;
  height: 80vh;
  box-shadow: 0 -5px 5px -5px rgb(214, 214, 214);
  overflow-x: hidden;
  overflow-y: auto;
}

.perulanganuser {
  width: 100%;
  height: 70px;
  position: relative;
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
  background-color: #f1efff !important;
  height: 70px !important;
  width: 100% !important;

}
#isichat {
  position: absolute;
  top: 72px;
  width: 100%;
  /* padding: 30px 50px 50px 50px; */
  background-color: white;
  height: 80%;
  overflow-x: hidden;
  overflow-y: scroll;
}
.terima {
  padding: 5px 0 0 10px;
  float: left;
  width: 80%;
  /* position: relative; */
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
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: auto;
  padding: 20px 50px 50px 50px;
}
.jamterima {
  font-size: 8px;
  position: relative;
  bottom: 0px;
}
.terima-warna {
  max-width: 80%;
  float: left;
  background-color: #f1efff;
  border-radius: 0px 15px 15px 15px;
  padding: 5px 10px;
  font-style: poppins;
  position: static;
  text-align: left;
  word-break: break-word;
  width: auto;
  min-width: 80px;
}
.kirim-warna {
  background-color: #beb6d7;
  border-radius: 15px 0 15px 15px;
  max-width: 60%;
  float: right;
  padding: 5px 10px;
  font-style: poppins;
  position: static;
  text-align: left;
  word-break: break-word;
  width: auto;
  min-width: 80px;
}
#message {
  padding: 10px;
  position: absolute;
  bottom: 0px;
  height: 75px;
  max-height: 40%;
  width: 100%;
  background-color: #f1efff;
}
#keluar {
  bottom: 12px;
  position: absolute;
  left: 12px;
}
#logo {
  width: 100%;
  height: 10vh;
}

#logo-vutura2 {
  height: 300px;
  position: absolute;
  padding: 10px;
  top: 30%;
  right: 45%;
}
/* .image {
  width: 48px;
  height: 48px;
  border-radius: 30px;
} */
#tglchat {
  position: absolute;
  top: 80px;
  background-color: #f1efff;
  margin: 0 -50% 0 40%;
  padding: 5px;
  border-radius: 5px;
}
.tombol2 {
  position: fixed;
  max-width: 50px;
  max-height: 50px;
}
input[type="file"] {
  display: none;
}
.custom-file-upload {
  display: inline-block;
  cursor: pointer;
  width: 80px;
  margin-left: 20px;
}
.custom-file-upload3 {
  display: inline-block;
  cursor: pointer;
  width: 80px;
  margin-left: 2px;
}
.custom-nama {
  display: inline-block;
  width: 300px;
  margin-top: 0px;
  margin-left: -40px;
}
.custom-btn {
  display: inline-block;
  cursor: pointer;
  width: 80px;
  margin-top: 1%;
  margin-left: -20px;
}
.vgambar {
  position: fixed;
  padding-bottom: 10px;
  padding-left: 10px;
  bottom: 210px;
  height: 10%;
  max-height: 40%;
  width: 67%;
}
.vgambar2 {
  position: fixed;
  padding-bottom: 10px;
  padding-left: 10px;
  bottom: 13vh;
  height: 10%;
  max-height: 40%;
  width: 20vw;
}
.time-send {
  font-size: 10px;
  float: right;
}
.size {
  background-color: #473390;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  text-align: center;
}
/* .item-left {
  float: right;
} */
/* @media only screen and (min-width: 1920px) {
  #boxchat {
    width: 74.5%;
  }
} */
</style>
