// importing named exports we use brackets
import { createPostTile, uploadImage } from './helpers.js';

// when importing 'default' exports, use below syntax
import API from './api.js';

const api  = new API();


const output = document.getElementById('large-feed');

/* for get user/feed 
    get the token from login
    loop to get each follows post
    use get methods
    name,picture,comments,likes,post time
*/
 function fff(token) {

    console.log(token);

    const result =	fetch("http://127.0.0.1:5000/user/feed",{
	 		headers: {
	 				'Accept':'application/json',
                     'Content-Type': 'application/json',
                     'Authorization': 'Token '+token
	 				},
	 		method:'GET',
             })
             .then(response => response.json())
             .then(json => {
                 for(let post of json.posts){
                    const elem2 = document.createElement("div");
                    elem2.className = "nametag";
                    const e = document.createElement("e");
                    e.textContent = post.meta.author;
                    elem2.appendChild(e);
                    output.appendChild(elem2);

                    const elem = document.createElement("div");
                     elem.className = "img-post";
                     const img = document.createElement("img");
                     img.src = "data:image/jpeg;base64,"+post.src;
                     const t = document.createElement("p");
                     t.innerText = new Date(post.meta.published*1000).toLocaleString();
                     const com = document.createElement("e");
                     com.innerText = post.meta.author + ": "+post.meta.description_text + " \n ";
                    

                    const likes_button = document.createElement("BUTTON");
	                likes_button.id = 'likes_button';
	                likes_button.appendChild(document.createTextNode("show likes"));
                     const likes = document.createElement("l");
                     likes.innerText = (post.meta.likes).length + " Likes"+ " \n ";
                    const idd = post.id;
                    const like = document.createElement("like"+idd);
                     const ll = 0;
                     for (let like in post.meta.likes){
                        ll++;
                     }
                    like.textContent = ll + ' \n ';
                    like.style.display = 'none';
                    likes_button.addEventListener('click', showlikes(idd,like));

                     const co = document.createElement("co");
                     co.textContent = (post.comments).length + " Comments"+ " \n ";

                     const id = post.id;

                     elem.appendChild(img);
                     elem.appendChild(t);
                     elem.appendChild(com);
                     elem.appendChild(likes);
                     elem.appendChild(likes_button);
                     elem.appendChild(like);
                     elem.appendChild(co);
                     output.appendChild(elem);

 
              }
                console.log(json.posts);
             });
          
}
//to show the likes
function showlikes(id,like){
    const idlike = id;
    if(like.style.display =='none'){
        like.style.display = 'inherit';}
    else{
        like.style.display = 'none';
    }
}

/* add ebentlistener to login button
    if username and password matched backend
    get token
    login window disappear
    else get error message
*/
const logbutton = document.getElementById('logIn');
logbutton.addEventListener('click', login);
var token;
function login() {
    const username = document.getElementById('uname').value;
    const password = document.getElementById('password').value;
    console.log(username);
    console.log(password);

    var status;
    var token;
    const result = 	fetch("http://127.0.0.1:5000/auth/login",{
	 		headers: {
	 				'Accept':'application/json',
                     'Content-Type': 'application/json',
                     //'Authorization': 'Token ae3a016a49d5926c891baf2b5c2702d8bcd8548af66d0902d5be6e807dadb168'
	 				},
	 		method:'POST',
	 		body: JSON.stringify({
	 				"username":username,
	 				"password":password
	 			})
             })
             .then(response => {
                 status = response.status;
                return response.json()})
             .then(json => {
                token = json.token;
                console.log(token);
                if(status!=200){
                    alert(json.message);}
                else if(status==200){
                    fff(token);
                    document.getElementById('id01').style.display='none';
                }
             });
             
}
/* add ebentlistener to register button
    if all putin matches 
    sucess
    else get error message
*/
const registerbutton = document.getElementById('register');
registerbutton.addEventListener('click', register);
function register() {
    const username = document.getElementById('uname').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;

    console.log(username);
    console.log(password);
    console.log(email);
    console.log(name);

    var status1;
    const result = 	fetch("http://127.0.0.1:5000/auth/signup",{
	 		headers: {
	 				'Accept':'application/json',
                     'Content-Type': 'application/json',
                     //'Authorization': 'Token ae3a016a49d5926c891baf2b5c2702d8bcd8548af66d0902d5be6e807dadb168'
	 				},
	 		method:'POST',
	 		body: JSON.stringify({
	 				"username":username,
                     "password":password,
                     "email":email,
                     'name':name

	 			})
             })
             .then(response => {
                 status1 = response.status;
                return response.json()})
             .then(json => {
                //token = json;
                //console.log(token);
                console.log(json.posts);
                if(status1!=200){
                    alert(json.message);}
             });
             
    console.log(new Date(1539235242.3142452*1000).toLocaleString());
}

