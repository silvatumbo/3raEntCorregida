const divProductos = document.getElementById('divProductos')

class Producto {
  constructor(id, nombre, precio) {
    this.id = id
    this.nombre = nombre
    this.precio = precio
  }
}

const productos = [
  new Producto(1, 'Remera', 700),
  new Producto(2, 'Short', 400),
  new Producto(3, 'Gorro', 300),
  new Producto(4, 'Medias', 200),
  new Producto(5, 'Equipo', 1000),
  new Producto(6, 'Equipo deportivo', 1400),
]

const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
const carrito = carritoGuardado || [];

productos.forEach((prod) => {
  divProductos.innerHTML += `<div class="card cardProducto">
  <div class="card-body">
    <h5 class="card-title">${prod.nombre}</h5>
    <p class="card-text">${prod.precio}</p>
    <button id=${prod.id} class="btn btn-primary">AGREGAR</button>
  </div>
  </div>`
})

function guardarCarritoEnLocalStorage(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

//const botonesAgregar = document.getElementsByClassName('btn btn-primary')
const botonesAgregar = document.querySelectorAll('.btn-primary')
botonesAgregar.forEach((boton) => {
  boton.onclick = () => {

    Swal.fire({
      position: 'top-end',
      title: 'Tu producto a sido agregado',
      showConfirmButton: false,
      timer: 800,
      customClass: {
        popup: 'green-alert'
      }
    })

    const producto = productos.find((prod) => prod.id === parseInt(boton.id))

    const prodCarrito = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
    }

    const indexProd = carrito.findIndex((prod) => prod.id === prodCarrito.id)
    if (indexProd === -1) {
      carrito.push(prodCarrito)
    } else {
      carrito[indexProd].cantidad++
    }

    guardarCarritoEnLocalStorage(carrito);
  }
})

// boton finalizar compra
const botonFinalizar = document.querySelector('#finalizar')
const thead = document.querySelector('#thead')
const tbody = document.querySelector('#tbody')
const parrafoTotal = document.querySelector('#total')
botonFinalizar.onclick = () => {
  divProductos.remove()
  botonFinalizar.remove()
  thead.innerHTML = `<tr>
  <th scope="col">Producto</th>
  <th scope="col">Cantidad</th>
  <th scope="col">Total</th>
  </tr>`

  let totalCompra = 0
  carrito.forEach(prod => {
    totalCompra += prod.cantidad * prod.precio
    tbody.innerHTML += `
      <tr>
        <td>${prod.nombre}</td>
        <td>${prod.cantidad}</td>
        <td>${prod.cantidad * prod.precio}</td>
      </tr>
      `
  })
  parrafoTotal.innerText = `El total de tu compra es ${totalCompra}`
}