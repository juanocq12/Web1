let productosRegistrados = 0;
const btnCrear = document.getElementById('btnCrear');
const contenedor = document.getElementById('contenedorProductos');
const contador = document.getElementById('contador');

btnCrear.addEventListener('click', () => {
    const nombreInput = document.getElementById('nombre');
    const precioInput = document.getElementById('precio');
    const imagenInput = document.getElementById('imagen');

    const nombre = nombreInput.value.trim();
    const precio = precioInput.value.trim();
    const imagen = imagenInput.value.trim();

    // Validación
    if (!nombre || !precio || !imagen) {
        alert('⚠️ Error: Complete todos los campos del formulario');
        return;
    }

    if (isNaN(precio) || precio <= 0) {
        alert('⚠️ Error: El precio debe ser un número positivo');
        return;
    }

    // Limpiar mensaje vacío
    if (productosRegistrados === 0) {
        contenedor.innerHTML = '';
    }

    // Crear tarjeta
    productosRegistrados++;
    const nuevaTarjeta = `
        <div class="col" data-producto="${productosRegistrados}">
            <div class="card producto-card">
                <div class="card-image-container">
                    <img src="${imagen}" class="card-img-top" alt="${nombre}" 
                         onerror="this.src='https://via.placeholder.com/300x200?text=Error+de+imagen'">
                    <div class="card-badge">#${productosRegistrados}</div>
                </div>
                <div class="card-body d-flex flex-column">
                    <h6 class="card-title-custom text-uppercase">${nombre}</h6>
                    <p class="card-price">$${parseFloat(precio).toFixed(2)}</p>
                    <small class="text-muted">Producto registrado</small>
                    <button class="btn btn-eliminar btn-sm mt-auto" onclick="eliminarProducto(${productosRegistrados})">🗑️ Eliminar</button>
                </div>
            </div>
        </div>
    `;

    contenedor.innerHTML += nuevaTarjeta;

    // Actualizar contador
    contador.textContent = `${productosRegistrados} producto${productosRegistrados !== 1 ? 's' : ''}`;

    // Limpiar formulario
    nombreInput.value = '';
    precioInput.value = '';
    imagenInput.value = '';
    nombreInput.focus();
});

function eliminarProducto(id) {
    const elemento = document.querySelector(`[data-producto="${id}"]`);
    if (elemento) {
        elemento.remove();
        productosRegistrados--;
        contador.textContent = `${productosRegistrados} producto${productosRegistrados !== 1 ? 's' : ''}`;
        
        if (productosRegistrados === 0) {
            contenedor.innerHTML = `
                <div class="col">
                    <div class="card placeholder-card">
                        <div class="placeholder-icon">📭</div>
                        <p class="text-center text-muted">Sin productos registrados</p>
                    </div>
                </div>
            `;
        }
    }
}

// Permitir agregar con Enter
document.getElementById('imagen').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btnCrear.click();
    }
});