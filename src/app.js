const express = require("express");
const app = express();
app.use(express.json()); //usamos use para traer json y poder crear el post para generar o crear un ususario
let baseId = 3;
const UserDB = [
    {
        id: baseId++,
        firstname: "jonathan",
        lastName: "caceres ",
        password: "nirvana",
        email: "@hotmail.com",
        age: 34,
    },
    {
        id: baseId++,
        firstName: "ginna",
        lastName: "Leguizamon Gonzales",
        password: "metallica",
        email: "ginna@hotmail.com",
        age: 30,
    },
];

// ruta para saber si funciona mi servidor
app.get("/", (req, res) => {
    res.json({
        messsage: "my server is Ok!!!",
    });
});
// //creamos una ruta que muestre todos los usuarios

app.get("/users", (req, res) => {
    res.json(UserDB)
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// //creamos una ruta para traer los nombres por id creando el error

app.get("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const data = UserDB.find((item) => id === item.id);
    if (data) {
        res.json(data);
    } else {
        res.status(404).json({
            message: "invalid id ",
        });
    }
});

// //creamos una ruta para  agreagar un usuario

app.post("/users", (req, res) => {
    const data = req.body;
    res.json(data)
        .then((data) => {
            if (data) {
                res.status(201).json(data);
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        })
        .catch((err) => {
            res.status(400).json(err);
        });

    const newUser = {
        id: baseId++,
        firstname: data.firstname,
        lastName: data.lastName,
        password: data.password,
        email: data.email,
        age: data.age,
    };
    UserDB.push(newUser);
    res.json(newUser);
});

// // Usampos el el metodo listen con el puerto 9000 para ver la aplicacion

app.listen(9000, () => {
    console.log("server started at port 9000");
});

module.exports = app;