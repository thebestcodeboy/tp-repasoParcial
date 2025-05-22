const formulario = document.getElementById('formularioLibro');
const contenedorLibros = document.getElementById('contenedorLibros');
const listaCarrito = document.getElementById('listaCarrito');
const totalCompraSpan = document.getElementById('totalCompra');

let carrito = [];

formulario.addEventListener('submit', function (e) {
  e.preventDefault(); // evita que se recargue la página

  const titulo = document.getElementById('inputTitulo').value;
  const precio = parseFloat(document.getElementById('inputPrecio').value);

  const nuevoLibro = document.createElement('div');
  nuevoLibro.className = 'libro';
  nuevoLibro.innerHTML = `
    <h3>${titulo}</h3>
    <p>Precio: $${precio.toFixed(2)}</p>
    <button class="btnAgregar">Agregar al carrito</button>
  `;

  contenedorLibros.appendChild(nuevoLibro);

  nuevoLibro.querySelector('.btnAgregar').addEventListener('click', function () {
    agregarAlCarrito(titulo, precio);
  });

  formulario.reset();
});

function agregarAlCarrito(titulo, precio) {
  carrito.push({ titulo, precio });

  const item = document.createElement('li');
  item.innerHTML = `${titulo} - $${precio.toFixed(2)} <button class="btnEliminar">Eliminar</button>`;
  
  listaCarrito.appendChild(item);

  item.querySelector('.btnEliminar').addEventListener('click', function () {
    listaCarrito.removeChild(item);
    carrito = carrito.filter(libro => libro !== item);
    actualizarTotal();
  });

  actualizarTotal();
}

function actualizarTotal() {
  const total = carrito.reduce((suma, libro) => suma + libro.precio, 0);
  totalCompraSpan.textContent = total.toFixed(2);
}
