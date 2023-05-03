// // function getPokemon(name) {
// //     fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
// //         .then(data => {
// //             data.json()
// //                 .then(res => {
// //                     console.log(res.name);
// //                 })
// //         })
// // }

// // appel API méthode .then

// async function getPokemon(name) {
//     let pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
//     pokemons = await pokemons.json()
//     console.log(pokemons)

// }
// // appel API méthode async await





// getPokemon('charizard'); 


// async function postUser() {
//     // creation de l'objet, on peut recuperer la valeur des elements input pour le creer
//     let obj = { 
//         name: "Lucchinacci Oliver",
//         firstname: "Axel",
//         mail: "Lucchinacci@live.fr",
//         password: "test"
//     }
//        let user = await fetch('http://146.59.242.125:3001/user',{
//         method: "POST",
//         headers: {
//             'Accept': 'application/json, text/plain, /',
//             'Content-Type': 'application/json'
//           },
//           body:JSON.stringify(obj) //creation d'un json a partir d'un objet javascript
//        })
//        let test = await user.text()
//        console.log(test);
//     }
let friendsList = document.querySelector(".friends-list");
let addFriendBtn = document.querySelector(".add-friend-btn");
let upFriendBtn = document.querySelector(".up-friend-btn");

// ===============================add friend =============================


addFriendBtn.addEventListener("click", () => {
    addFriend();
});

function getUsers() {
    fetch(`http://146.59.242.125:3001/users`)
        .then(users => {
            users.json()
                .then(response => {
                    let parent = document.querySelector(".friends-list");
                    response.forEach(response => {
                        let userCard = document.createElement('div');
                        userCard.classList.add('user-card');
                        parent.appendChild(userCard);
                        console.log(response);

                        let userName = document.createElement('p');
                        userName.innerHTML = "Nom: " + response.name;
                        userCard.appendChild(userName);

                        let userFirstname = document.createElement('p');
                        userFirstname.innerHTML = "Prénom: " + response.firstname;
                        userCard.appendChild(userFirstname);

                        let userMail = document.createElement('p');
                        userMail.innerHTML = "Mail: " + response.mail;
                        userCard.appendChild(userMail);

                        let userPassword = document.createElement('p');
                        userPassword.innerHTML = "Mot de passe: " + response.password;
                        userCard.appendChild(userPassword);

                        let buttonBar = document.createElement('div');
                        buttonBar.classList.add('button-bar');
                        userCard.appendChild(buttonBar);

                        let updateBtn = document.createElement('button');
                        updateBtn.innerHTML = "Modifier";
                        updateBtn.addEventListener("click", () => {
                            dialUpdate.classList.replace('modal-hidden', 'visible');
                            overlay.classList.remove('hidden')
                            html.style.overflow = 'hidden';
                            body.style.overflow = 'hidden';
                            getFriend(response);
                        });
                        buttonBar.appendChild(updateBtn);

                        let deleteBtn = document.createElement('button');
                        deleteBtn.innerHTML = "Perdre un pote";
                        deleteBtn.addEventListener("click", () => {
                            delFriend(response);
                        });
                        buttonBar.appendChild(deleteBtn);

                    })
                })
        })
}


async function addFriend() {
    // creation de l'objet, on peut recuperer la valeur des elements input pour le creer
    let formName = document.querySelector('#name').value;
    let formFirstname = document.querySelector('#firstName').value;
    let formMail = document.querySelector('#mail').value;
    let formPassword = document.querySelector('#password').value;



    let obj = {
        name: formName,
        firstname: formFirstname,
        mail: formMail,
        password: formPassword
    }


    let user = await fetch('http://146.59.242.125:3001/user', {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj) //creation d'un json a partir d'un objet javascript
    })
    friendsList.innerHTML = "";
    dialAdd.classList.replace('visible', 'modal-hidden');
    overlay.classList.add('hidden');
    html.style.overflow = 'visible';
    body.style.overflow = 'visible';
    getUsers();
    // window.location.href = "./index.html";
}

// ==========================================================add friend=================================

async function getFriend(elem) {

    document.querySelector('#upName').value = elem.name;
    document.querySelector('#upFirstName').value = elem.firstname;
    document.querySelector('#upMail').value = elem.mail;
    document.querySelector('#upPassword').value = elem.password;

    upFriendBtn.addEventListener("click", () => {
        updateFriend(elem);
    });
}



// ====================================================delete friend=================================

async function delFriend(elem) {

    console.log(elem);
    let user = await fetch(`http://146.59.242.125:3001/user/${elem._id}`, {
        method: "DELETE",
    })
    friendsList.innerHTML = "";
    getUsers();
    // window.location.href = "./index.html";
}

// ====================================================delete friend=================================

// =================================================update friend=================================

// upFriendBtn.addEventListener("click", () => {
//     updateFriend();
// });

async function updateFriend(elem) {

    let upName = document.querySelector('#upName').value;
    let upFirstname = document.querySelector('#upFirstName').value;
    let upMail = document.querySelector('#upMail').value;
    let upPassword = document.querySelector('#upPassword').value;


    let obj = {
        name: upName,
        firstname: upFirstname,
        mail: upMail,
        password: upPassword
    }

    let user = await fetch(`http://146.59.242.125:3001/user/${elem._id}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    friendsList.innerHTML = "";
    dialUpdate.classList.replace('visible', 'modal-hidden');
    overlay.classList.add('hidden');
    html.style.overflow = 'visible';
    body.style.overflow = 'visible';
    getUsers();
    // window.location.href = "./index.html";
}

// ====================================================update friend=================================





//menu================================

let burger = document.querySelector('#menuBurger');
let burgerOne = document.querySelector('#burgerOne');
let burgerTwo = document.querySelector('#burgerTwo');
let burgerThree = document.querySelector('#burgerThree');
let sideMenu = document.querySelector('.side-menu');
let add = document.querySelector('.add');
let dialUpdate = document.querySelector('.dial-update');
let dialAdd = document.querySelector('.dial-add');
let overlay = document.querySelector('.overlay');
let html = document.querySelector('html');
let body = document.querySelector('body');
let closeBtn = document.querySelector('.close-btn');
let closeUpBtn = document.querySelector('.close-up');



function burgerMenuClosed() {
    burger.style.backgroundColor = "rgb(158, 194, 198)";
    burgerOne.style.backgroundColor = "rgb(82, 154, 171)";
    burgerThree.style.backgroundColor = "rgb(82, 154, 171)";
    burgerTwo.style.backgroundColor = "rgb(82, 154, 171)";
    burgerOne.style.transition = "600ms";
    burgerOne.style.transform = "rotate(45deg)";
    burgerThree.style.position = "absolute";
    burgerThree.style.transition = "600ms";
    burgerOne.style.transform = "rotate(45deg)";
    burgerThree.style.width = "0px";
    burgerTwo.style.position = "absolute";
    burgerTwo.style.transition = "600ms";
    burgerTwo.style.transform = "rotate(135deg)"
    sideMenu.style.transition = "600ms";
    sideMenu.style.left = "0px";
    burger.style.transition = "600ms";
    burger.style.left = "0px";
    burger.style.borderRadius = "0 10px 10px 0";
    sideMenu.style.backgroundColor = "rgb(158, 194, 198)";
}

function burgerMenuOpen() {
    burger.style.backgroundColor = "rgb(82, 154, 171)";
    burgerOne.style.backgroundColor = "rgb(158, 194, 198)";
    burgerThree.style.backgroundColor = "rgb(158, 194, 198)";
    burgerTwo.style.backgroundColor = "rgb(158, 194, 198)";
    burgerOne.style.transition = "600ms";
    burgerOne.style.transform = "initial";
    burgerTwo.style.position = "initial";
    burgerTwo.style.transition = "600ms";
    burgerTwo.style.transform = "initial"
    burgerThree.style.width = "35px";
    burgerThree.style.transition = "600ms";
    burgerThree.style.position = "initial";
    sideMenu.style.transition = "600ms";
    sideMenu.style.left = "-100px";
    burger.style.transition = "600ms";
    burger.style.left = "-100px";
    sideMenu.style.backgroundColor = "rgb(82, 154, 171)";
    burger.style.borderRadius = "10px 10px 10px 10px";
};


burger.addEventListener('click', () => {
    console.log('click');
    if (burger.classList.contains("closed")) {
        console.log('closed');
        burger.classList.replace("closed", "opened");
        burgerMenuClosed();
    } else if (burger.classList.contains("opened")) {
        burger.classList.replace("opened", "closed");
        console.log('open');
        burgerMenuOpen()
    }

});
//================================================================

//============================================================================ modal add friend

add.addEventListener('click', () => {
    dialAdd.classList.replace('modal-hidden', 'visible');
    overlay.classList.remove('hidden')
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
    dialAdd.classList.replace('visible', 'modal-hidden');
    dialUpdate.classList.replace('visible', 'modal-hidden');
    overlay.classList.add('hidden');
    html.style.overflow = 'visible';
    body.style.overflow = 'visible';
});

//======================================================================================== 

//============================================================================ modal add product function

closeUpBtn.addEventListener('click', () => {
    dialUpdate.classList.replace('visible', 'modal-hidden');
    overlay.classList.add('hidden');
    html.style.overflow = 'visible';
    body.style.overflow = 'visible';
});

//======================================================================================== 
getUsers();