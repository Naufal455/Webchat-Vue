<template>
  <v-app id="inspire">
    
   <h2>hai</h2>
    <template>
      <div>
        <div class="col-md-1">
          <div class="">

            <label class="custom-file-upload">
              <input type="file" @change="previewImage"/>
              <i class="mdi mdi-36px mdi-image"></i>
            </label>

          </div>
        </div>

        <div>
          <p>Progress: {{uploadValue.toFixed()+"%"}}
          <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
        </div>

        <div v-if="imageData!=null">
            <img class="preview" :src="picture" width="300" height="200">
        </div>

        <button @click="onUpload">Upload</button>
        <h1> {{picture}} </h1>
      </div>
    </template>
    
  
    
  </v-app>
</template>

<script>
import firebase from 'firebase';

export default {
  data: () => ({
      imageData: null, /* foto yg diupload */
      picture: null, /* Buat nyimpen url */
      uploadValue: 0
  }),

  methods: {
    previewImage(event) {
      this.uploadValue=0;
      this.imageData = event.target.files[0];
    },

    onUpload(){
      this.picture=null; /* picUrl */
      const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
      storageRef.on(`state_changed`,
        snapshot=>{
          this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, 
        error=>{console.log(error.message)},()=>{
          this.uploadValue=100; /* Delete */
          storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            this.picture =url; /* picUrl */
          });
        }
      );
    }
    },
  

  mounted(){
    this.firstName='godafari'
  }

};
</script>

<style>
input[type="file"] {
    display: none;
}
.custom-file-upload2 {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 50px 50px;
    cursor: pointer;
    background-color: red;
}
.tombol{
  max-width: 10px;
  max-height: 10px;
}
</style>



 