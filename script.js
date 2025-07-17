document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");
  const estado = {};

  // Inicializar el estado de cada ramo
  ramos.forEach(ramo => {
    const nombre = ramo.dataset.nombre;
    estado[nombre] = false;
  });

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
    ramo.addEventListener("click", () => {
      const nombre = ramo.dataset.nombre;
      if (!ramo.classList.contains("desbloqueado")) return;
      estado[nombre] = true;
      actualizarEstado();
    });
  });

  actualizarEstado();
});
