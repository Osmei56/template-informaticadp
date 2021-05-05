const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(express.json())

app.use(cors())

const puerto = process.env.PORT || 5001

app.listen(puerto, function () {
  console.log(`Servidor OK corriendo en el puerto: ${puerto}`)
})

// Establecemos los parámetros de conexión
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'articulosdb'
})

// Probamos la conexión
conexion.connect(function (error) {
  if (error) {
    throw error
  } else {
    console.log('La conexión a la BASE DE DATOS ha sido exitosa')
  }
})

app.get('/', function (req, res) {
  res.send('Ruta INICIO')
})

// Mostrar todos los artículos
app.get('/api/articulos', (req, res) => {
  conexion.query('SELECT * FROM articulos', (error, filas) => {
    if (error) {
      throw error
    } else {
      res.send(filas)
    }
  })
})

// Mostrar 1 SOLO artículo
app.get('/api/articulos/:id', (req, res) => {
  conexion.query('SELECT * FROM articulos WHERE id = ?', [req.params.id], (error, fila) => {
    if (error) {
      throw error
    } else {
      res.send(fila)
      //res.send(fila[0].descripcion)
    }
  })
})

// CREAR artículo
app.post('/api/articulos', (req, res) => {
  let data = {
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    stock: req.body.stock
  }
  let sql = 'INSERT INTO articulos SET ?'

  conexion.query(sql, data, function (error, results) {
    if (error) {
      throw error
    } else {
      res.send(results)
    }
  })
})

// Editar articulo
app.put('/api/articulos/:id', (req, res) => {
  let id = req.params.id
  let descripcion = req.body.descripcion
  let precio = req.body.precio
  let stock = req.body.stock
  let sql = "UPDATE articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ?"
  conexion.query(sql, [descripcion, precio, stock, id], function (error, results) {
    if (error) {
      throw error
    } else {
      res.send(results)
    }
  })
})

// Eliminar articulo
app.delete('/api/articulos/:id', (req, res) => {
  conexion.query('DELETE FROM articulos WHERE id = ?', [req.params.id], function (error, filas) {
    if (error) {
      throw error
    } else {
      res.send(filas)
    }
  })
})