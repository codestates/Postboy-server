let fetch = require("node-fetch");
global.Headers = fetch.Headers;

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Cookie", "connect.sid=s%3AvrtPUzp1tW5kPlPQy8VtV-BSUQrn83Jc.F0Ca3xPoESOwxL6ZZ%2Bl2Ic8jT2%2Bk7BQh%2BqNQ20jdveE");

let urlencoded = new URLSearchParams();
urlencoded.append("email", "aaa"); //hsk9210@gmail.com
urlencoded.append("password", "aaa"); //369369

let requestOptions = {
  method: 'POST',
  mode: 'no-cors',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};
//"3.36.70.223:3000/signin"
fetch("http://localhost:3000/signin", requestOptions)
  .then(response => response.text())
  .then(result => console.log('response data: '+result))
  .catch(error => console.log('error', error));

/*

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Cookie", "connect.sid=s%3AvrtPUzp1tW5kPlPQy8VtV-BSUQrn83Jc.F0Ca3xPoESOwxL6ZZ%2Bl2Ic8jT2%2Bk7BQh%2BqNQ20jdveE");

var urlencoded = new URLSearchParams();
urlencoded.append("email", "aaa"); //hsk9210@gmail.com
urlencoded.append("password", "aaa"); //369369

var requestOptions = {
  method: 'POST',
  mode: 'no-cors',
  //headers: myHeaders,
  body: {email: "aaa", password: "aaa" },
  redirect: 'follow'
};
//"3.36.70.223:3000/signin"
fetch("http://localhost:4000/signin", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));



*/
/*
var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
 'email': 'aaa',
'password': 'aaa' 
});
var config = {
  method: 'post',
  url: 'http://localhost:3000/signin',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded', 
    'Cookie': 'connect.sid=s%3AD3ZAXC9N8BgTCq-LnMMtK5CKjlqplHUy.RV0EEz4%2BeNLkL%2BkpvF0gZk%2B%2FWtiaYP%2BTn7QixjT0FpY'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
*/