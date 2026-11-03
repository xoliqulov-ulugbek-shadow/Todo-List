const API_URL = 'https://6ae874ba1a7b15aaa50f19be.mockapi.io/name';
const contactList = document.getElementById('contactList');
const addContactBtn = document.getElementById('addContact');
const darkAnDlight = document.getElementById('darkLight')
const nameInput = document.getElementById('name');
const numberInput = document.getElementById('number');

async function fetchContacts() {
    try {
        const response = await fetch(API_URL);
        const contacts = await response.json();
        renderContacts(contacts);
    } catch (error) {
        console.error(error);
    }
}

function renderContacts(contacts) {
    contactList.innerHTML = '';
    contacts.forEach(contact => {
        const li = document.createElement('li');
        li.innerHTML = `
        <div class="div-js">
            <div class="dd">
                <img src="${contact.avatar || 'rasm.png'}" alt="" class='img-js'>
                <span> ${contact.name} - ${contact.number}</span>
                <p>${contact.createdAt || ''}</p>
            </div>
            <div class="gg">
                <button class="edit-btn">✏️</button>
                <button class="delete-btn">🗑️</button>
            </div>
        </div>
        `;

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteContact(contact.id));

        const editBtn = li.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => editContact(contact.id));

        contactList.appendChild(li);
    });
}

addContactBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    const number = numberInput.value.trim();

    if (!name || !number) {
        alert("Iltimos, ism va raqamni kiriting!");
        return;
    }

    const newContact = {
        name: name,
        number: number,
        avatar: "rasm.png"
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newContact)
        });

        if (response.ok) {
            nameInput.value = '';
            numberInput.value = '';
            fetchContacts();
        }
    } catch (error) {
        console.error(error);
    }
});

async function deleteContact(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchContacts();
        }
    } catch (error) {
        console.error(error);
    }
}



fetchContacts();

let m = 0;


darkAnDlight.addEventListener("click", function () {
    m++
    if (m % 2 == 0) {
        darkAnDlight.textContent = 'Dark';
        document.head.innerHTML = `<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    list-style: none;
    font-family: "Google Sans Code", monospace;
}

.img-js {
    width: 150px;
    border-radius: 100%;
}

input {
    width: 300px;
    padding: 10px;
    outline: none;
    border-radius: 10px;
    border: 1px solid #ddd;
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.1);
}

.conteiner {
    max-width: 1200px;
    margin: 0 auto;
}

h1 {
font-family: Arial, Helvetica, sans-serif;
text-align: center;
font-size: 90px;
margin-top: 30px;
margin-bottom: 30px;
border-bottom: 1px solid #ddd;
}
h1 span{

}
#contactList {
    margin-top: 30px;
    gap: 50px;
}

.div-js {
    width: 100%;
    height: 190px;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-radius: 20px;
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
}

span {
    margin-left: 20px;
}

.dd {
    display: flex;
    justify-content: center;
    align-items: center;
}

button {
    background-color: white;
    border-radius: 200px;
    border: 1px solid #ddd;
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.1);
    padding: 10px;
    width: 120px;
}

.gg button {
    width: 50px;
    font-size: 20px;
    border-radius: 100%;
}

@media (max-width: 1200px) {
    .conteiner {
        width: 95%;
    }

    .div-js {
        width: 100%;
    }
}

@media (max-width: 900px) {
    h1 {
        font-size: 70px;
    }

    h1 span {
        font-size: 70px;
    }

    .div-js {
        height: auto;
        min-height: 160px;
    }

    .img-js {
        width: 120px;
    }

    span {
        font-size: 15px;
    }
}

@media (max-width: 768px) {
    h1 {
        font-size: 55px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    h1 span {
        font-size: 55px;
    }

    .conteiner {
        width: 92%;
    }

    input {
        width: 100%;
        margin-bottom: 10px;
    }

    .conteiner>button {
        width: 48%;
        margin-bottom: 10px;
    }

    .div-js {
        flex-direction: column;
        gap: 20px;
        padding: 20px;
        height: auto;
    }

    .dd {
        flex-direction: column;
        gap: 12px;
        text-align: center;
    }

    .img-js {
        width: 110px;
    }

    span {
        margin-left: 0;
        font-size: 14px;
    }

    .gg {
        display: flex;
        gap: 15px;
    }

    .gg button {
        width: 45px;
    }
}

@media (max-width: 480px) {
    h1 {
        font-size: 42px;
    }

    h1 span {
        font-size: 40px;
        font-weight: lighter;
    }

    .conteiner {
        width: 94%;
    }

    input {
        padding: 12px;
        font-size: 14px;
    }

    .conteiner>button {
        width: 100%;
        padding: 12px;
    }

    .div-js {
        border-radius: 15px;
        padding: 15px 10px;
        margin-bottom: 20px;
    }

    .img-js {
        width: 90px;
    }

    .dd {
        width: 100%;
    }

    .dd p {
        font-size: 12px;
        word-break: break-word;
    }

    .gg button {
        width: 42px;
        height: 42px;
        font-size: 17px;
    }
}

@media (max-width: 360px) {
    h1 {
        font-size: 35px;
    }

    h1 span {
        font-size: 29px;
        color: #da1616;
        font-weight: bolder;
    }

    .img-js {
        width: 75px;
    }

    span {
        font-size: 12px;
    }

    .div-js {
        padding: 12px 8px;
    }
}

    </style> `
    }


    else {
        darkAnDlight.textContent = 'Light';
        document.head.innerHTML = `<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    list-style: none;
    font-family: "Google Sans Code", monospace;
}

body {
    background-color: #121212;
    color: #fff;
}

.img-js {
    width: 150px;
    border-radius: 100%;
}

input {
    width: 300px;
    padding: 10px;
    outline: none;
    border-radius: 10px;
    border: 1px solid #333;
    background-color: #1e1e1e;
    color: #fff;
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.3);
}

input::placeholder {
    color: #999;
}

.conteiner {
    max-width: 1200px;
    margin: 0 auto;
}

h1 {
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    font-size: 90px;
    margin-top: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid #333;
    color: #fff;
}

h1 span {
    color: #aaa;
}

#contactList {
    margin-top: 30px;
    gap: 50px;
}

.div-js {
    width: 100%;
    height: 190px;
    border: 1px solid #333;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-radius: 20px;
    background-color: #1e1e1e;
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.3);
    margin-bottom: 30px;
}

span {
    margin-left: 20px;
    color: #fff;
}

.dd {
    display: flex;
    justify-content: center;
    align-items: center;
}

button {
    background-color: #252525;
    color: #fff;
    border-radius: 200px;
    border: 1px solid #444;
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.3);
    padding: 10px;
    width: 120px;
    cursor: pointer;
    transition: 0.3s;
}

button:hover {
    background-color: #444;
}

.gg button {
    width: 50px;
    font-size: 20px;
    border-radius: 100%;
}

@media (max-width: 1200px) {
    .conteiner {
        width: 95%;
    }

    .div-js {
        width: 100%;
    }
}

@media (max-width: 900px) {
    h1 {
        font-size: 70px;
    }

    h1 span {
        font-size: 70px;
    }

    .div-js {
        height: auto;
        min-height: 160px;
    }

    .img-js {
        width: 120px;
    }

    span {
        font-size: 15px;
    }
}

@media (max-width: 768px) {
    h1 {
        font-size: 55px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    h1 span {
        font-size: 55px;
    }

    .conteiner {
        width: 92%;
    }

    input {
        width: 100%;
        margin-bottom: 10px;
    }

    .conteiner>button {
        width: 48%;
        margin-bottom: 10px;
    }

    .div-js {
        flex-direction: column;
        gap: 20px;
        padding: 20px;
        height: auto;
    }

    .dd {
        flex-direction: column;
        gap: 12px;
        text-align: center;
    }

    .img-js {
        width: 110px;
    }

    span {
        margin-left: 0;
        font-size: 14px;
    }

    .gg {
        display: flex;
        gap: 15px;
    }

    .gg button {
        width: 45px;
    }
}

@media (max-width: 480px) {
    h1 {
        font-size: 42px;
    }

    h1 span {
        font-size: 40px;
        font-weight: lighter;
    }

    .conteiner {
        width: 94%;
    }

    input {
        padding: 12px;
        font-size: 14px;
    }

    .conteiner>button {
        width: 100%;
        padding: 12px;
    }

    .div-js {
        border-radius: 15px;
        padding: 15px 10px;
        margin-bottom: 20px;
    }

    .img-js {
        width: 90px;
    }

    .dd {
        width: 100%;
    }

    .dd p {
        font-size: 12px;
        word-break: break-word;
    }

    .gg button {
        width: 42px;
        height: 42px;
        font-size: 17px;
    }
}

@media (max-width: 360px) {
    h1 {
        font-size: 35px;
    }

    h1 span {
        font-size: 29px;
        color: #da1616;
        font-weight: bolder;
    }

    .img-js {
        width: 75px;
    }

    span {
        font-size: 12px;
    }

    .div-js {
        padding: 12px 8px;
    }
}
    </style> `
    }
});