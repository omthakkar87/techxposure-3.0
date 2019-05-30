// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyB3pGNF3fdjyT-X9ZXeSAotvyBv2mrkvlo",
    authDomain: "techxposure-2019.firebaseapp.com",
    databaseURL: "https://techxposure-2019.firebaseio.com",
    projectId: "techxposure-2019",
    storageBucket: "techxposure-2019.appspot.com",
    messagingSenderId: "1082992539334",
    appId: "1:1082992539334:web:de9de8033b4a474c"
};
// Initialize Firebase
let Firebaseapp = firebase.initializeApp(firebaseConfig);

let db = Firebaseapp.database();

let eventsRef = db.ref('events/' + window.location.hash.substring(1));

let cat = window.location.hash.substring(1)

switch(cat){
    case 'fun':{
        document.body.style.background = "url('assets/img/events/fun.jpg') no-repeat center center fixed";
        document.body.style.backgroundSize = "cover";
        break;
    }
    case 'cultural':{
        document.body.style.background = "url('assets/img/events/cultural.jpg') no-repeat center center fixed";
        document.body.style.backgroundSize = "cover";
        break;
    }
}

Vue.use(VueFire)

Vue.config.devtools = true;

const app = new Vue({
    el: '#app',
    name: 'app',
    data: {
        category: cat,
        events:[],
        loading:true
    },

    methods: {
        register(){
            alert('Hello');
        }
    },
    mounted(){
        firebase.database().ref('events/' + window.location.hash.substring(1)).once('value',snapshot => {
            this.events = snapshot.val();
            this.loading = false;
        }).catch(err => {
            console.error(err);
        })
    }
});

window.onhashchange = function(){
    window.location.reload();
}

if(window.location.hash == ""){
    window.location.hash = "#fun";
}