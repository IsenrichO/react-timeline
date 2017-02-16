'use strict';
const Cloudinary = require('cloudinary');


Cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});




// function ajaxSuccess() {
//   let res = JSON.parse(this.response);
//   // console.log(res.secure_url);
// }

// function postImage(img) {
//   let data = new FormData();
//   data.append('upload_preset', 'standard');
//   data.append('file', img);
//   data.append('api_key', API.development.api_key);

//   let xhr = new XMLHttpRequest();
//   xhr.onload = ajaxSuccess;
//   xhr.open('post', API.base_url, true);
//   xhr.send(data);
//   // console.log(xhr.responseText);
// }

// function handleUpload(event) {
//   let files = event.target.files;
//   for (var i = 0; i < files.length; i++) {
//     postImage(files[i]);
//   }
// }

// function testSuccess() {
//   let res = JSON.parse(this.response);
//   // debugger;
//   // console.log(res.secure_url);
// }

// function testAPI(event) {
//   // let xhr = new XMLHttpRequest();
//   // xhr.onload = testSuccess;
//   // xhr.open("get", `${API.admin_url}/resorces/image`, true);
//   // xhr.send();
//   // console.log(xhr.responseText);
//   $.getJSON(`${API.admin_url}/resorces/image`, (data) => {
//     // console.log(data);
//   });
// }

// document.addEventListener('DOMContentLoaded', () => {
//   let div = document.createElement('DIV');
//   div.innerHTML = 'HELLO';
//   document.body.appendChild(div);

//   let inpt = document.createElement('INPUT');
//   inpt.setAttribute('type', 'file');
//   inpt.setAttribute('multiple', true);
//   document.body.appendChild(inpt);
//   inpt.addEventListener('change', handleUpload);

//   let btn = document.createElement('BUTTON');
//   btn.innerHTML = 'TEST';
//   document.body.appendChild(btn);
//   btn.addEventListener('click', testAPI);
// });
