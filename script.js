document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");
  let estado = {};

  // Cargar estado desde localStorage si existe
  if (localStorage.getItem("mallaEstado")) {
    estado = JSON.parse(localStorage.getItem("mallaEstado"));
  } else {
    ramos.forEach(ramo => {
      const nombre = ramo.dataset.nombre;
      estado[nombre] = false;
    });
  }

  function guardarEstado() {
    localStorage.setItem("mallaEstado", JSON.stringify(estado));
  }

  function actualizarEstado() {
    ramos.forEach(ramo => {
      const nombre = ramo.dataset.nombre;
      const prerequisitos = ramo.dataset.prerrequisitos
        ? ramo.dataset.prerrequisitos.split(",")
        : [];

      const desbloqueado = prerequisitos.every(pr => estado[pr]);

      ramo.classList.remove("desbloqueado", "completado");

      if (estado[nombre]) {
        ramo.classList.add("completado");
      } else if (prerequisitos.length === 0 || desbloqueado) {
        ramo.classList.add("desbloqueado");
      }
    });
  }

  ramos.forEach(ramo => {
    const nombre = ramo.dataset.nombre;
    if (!(nombre in estado)) {
      estado[nombre] = false;
    }

    ramo.addEventListener("click", () => {
      if (!ramo.classList.contains("desbloqueado")) return;
      estado[nombre] = true;
      guardarEstado();
      actualizarEstado();
    });
  });

  actualizarEstado();
});

// 🔁 Función para reiniciar la malla
function resetearMalla() {
  if (confirm("¿Estás seguro de que quieres reiniciar la malla?")) {
    localStorage.removeItem("mallaEstado");
    location.reload();
  }
}
