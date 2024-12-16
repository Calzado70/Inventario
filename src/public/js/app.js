const API_URL = "http://localhost:4000/api"; // Cambia si es necesario

const form = document.getElementById("productoForm");
const tablaProductos = document.getElementById("tablaProductos");
const contadorProductos = document.getElementById("contadorProductos");
const exportarBtn = document.getElementById("exportar");

// Función para agregar producto
const agregarProducto = async (event) => {
    event.preventDefault();

    const pareja = document.getElementById("pareja").value;
    const zona = document.getElementById("zona").value;
    const codigo = document.getElementById("codigo").value;
    const conteo = document.getElementById("conteo").value;

    if (!pareja || !zona || !codigo || !conteo) {
        alert("Todos los campos son obligatorios");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/agregar-producto`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pareja, zona, codigo, conteo }),
        });
        const data = await response.json();

        if (data.success) {
            cargarProductos();
            form.reset();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error al agregar producto:", error);
    }
};

// Función para cargar productos
const cargarProductos = async () => {
    try {
        const response = await fetch(`${API_URL}/productos`);
        const data = await response.json();

        if (data.success) {
            tablaProductos.innerHTML = ""; // Limpia la tabla

            data.productos.forEach((producto) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${producto.pareja}</td>
                    <td>${producto.zona}</td>
                    <td>${producto.codigo}</td>
                    <td>${producto.fecha}</td>
                    <td>${producto.talla}</td>
                    <td>${producto.conteo}</td>
                `;
                tablaProductos.appendChild(row);
            });

            contadorProductos.textContent = data.productos.length;
        }
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
};

// Función para exportar productos
exportarBtn.addEventListener("click", async () => {
    try {
        const response = await fetch(`${API_URL}/exportar`);
        if (response.ok) {
            const blob = await response.blob(); // Convertir la respuesta en un archivo Blob
            const url = window.URL.createObjectURL(blob); // Crear una URL temporal para el archivo

            // Crear un enlace temporal para descargar el archivo
            const a = document.createElement("a");
            a.href = url;
            a.download = "inventario.xlsx"; // Nombre del archivo que se descargará
            document.body.appendChild(a);
            a.click(); // Simular un clic en el enlace
            a.remove(); // Eliminar el enlace temporal

            window.URL.revokeObjectURL(url); // Liberar la URL temporal
            alert("Datos exportados con éxito");
            cargarProductos(); // Opcional: Recargar los productos
        } else {
            alert("Error al exportar los datos");
        }
    } catch (error) {
        console.error("Error al exportar productos:", error);
        alert("Error al exportar los datos");
    }
});


// Eventos
form.addEventListener("submit", agregarProducto);
document.addEventListener("DOMContentLoaded", cargarProductos);
