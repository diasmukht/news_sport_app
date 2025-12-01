// backend/server.js
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Обязательно!
app.use(cors());
app.use(express.json());

const JWT_SECRET = "werwerwerasdngffds";

// Твой мокки-сервер
const MOKKY_URL = "https://eaa0f823bdcaf00e.mokky.dev/users";

// Регистрация — POST /api/signup
app.post("/api/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Логин и пароль обязательны" });
    }

    // Проверяем, есть ли уже такой пользователь на мокки
    const checkRes = await fetch(MOKKY_URL);
    const users = await checkRes.json();
    const exists = users.some(u => u.username === username);

    if (exists) {
      return res.status(409).json({ message: "Юзер бар базада" });
    }

    // Создаём нового пользователя на мокки
    const createRes = await fetch(MOKKY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const newUser = await createRes.json();

    res.status(201).json({
      message: "Регист успешно",
      user: { id: newUser.id, username: newUser.username }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Сервер ошибка" });
  }
});

// Логин — POST /api/login
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Логин и пароль обязательны" });
    }

    // Получаем всех пользователей с мокки
    const response = await fetch(MOKKY_URL);
    const users = await response.json();

    // Ищем совпадение
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      return res.status(401).json({ message: "Неправильный логин или пароль" });
    }

    // Генерируем JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Логин успешен",
      token,
      user: { id: user.id, username: user.username }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Сервер ошибка" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`Регистрация: POST http://localhost:${PORT}/api/signup`);
  console.log(`Логин:       POST http://localhost:${PORT}/api/login`);
});



// const express = require('express')
// const jwt = require('jsonwebtoken')

// const app = express()
// const PORT = 3000;

// app.use(express.json())

// const JWT_TOKEN = 'werwerwerasdngffds'

// const users = [{
//     id: 1,
//     username: 'dias',
//     password: 'werwer0314'
// }]

// app.post('/api/signup', async (req, res)=>{
//     try {
//         const {username, password}=req.body;

//         if(users.find(u=>u.username===username)){
//             return res.status(409).json({message: "Юзер бар базада"})
//         }

//         const newUser={
//             id:users.length+1,
//             username:username,
//             password:password
//         };

//         users.push(newUser)
//         res.status(201).json({
//             message: "Регист успешно",
//             user:{id:newUser.id, username:newUser.username}
//         })
//     }
//     catch(error) {
//         console.log("регистрация не прошла")
//     }
// })

// app.post('/api/login', (req, res) =>{

//     const {username, password} = req.body;

//     const user = users.find(u=>u.username===username && u.password===password);

//     if(!user) {
//         return res.status(401).json({message: "Неправильный лог или пароль"})
//     }

//     const token=jwt.sign(
//         {
//             id:user.id, username:user.username 
//         }, JWT_TOKEN,{
//             expiresIn: '1h'
//         }
//     );

//     res.json({
//         message: "Логин успешен",
//         token:token
//     });
// })

// app.listen(PORT, ()=>{
//     console.log(`Сервер запущен на порту ${PORT}`)
//     console.log(`http://localhost:${PORT}/api/login`)
// })