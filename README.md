# Calendario de hojas

Calendario de hojas que se arrancan, con eventos animados y cuentas regresivas.
Se publica gratis en GitHub Pages y guarda los eventos en Firebase (Firestore).

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app completa |
| `firebase-config.js` | Tus claves de Firebase (las pegas tú) |
| `firestore.rules` | Reglas de seguridad: quién puede ver y quién puede editar |
| `manifest.webmanifest` | Nombre e íconos para instalarla en el celular |
| `sw.js` | Permite que abra sin internet |
| `icons/` | Íconos de la app |

Sin configurar Firebase la app ya funciona, pero en **modo local**: los eventos solo se guardan en ese navegador.

## 1. Crear el proyecto en Firebase

1. Entra a https://console.firebase.google.com y crea un proyecto (puedes desactivar Google Analytics).
2. En la página del proyecto, pulsa el ícono **</>** para registrar una **app web**. No hace falta activar Firebase Hosting.
3. Copia el objeto `firebaseConfig` que te muestra y pégalo en `firebase-config.js`, reemplazando los valores de ejemplo.

## 2. Activar el inicio de sesión

1. Menú **Authentication > Comenzar > Método de acceso**, activa **Google**.
2. En **Authentication > Configuración > Dominios autorizados**, agrega `TU_USUARIO.github.io`.

## 3. Crear la base de datos

1. Menú **Firestore Database > Crear base de datos**. Elige una ubicación cercana (por ejemplo, `southamerica-east1` o `us-central1`) y empieza en **modo de producción**.
2. Pestaña **Reglas**: borra lo que haya, pega el contenido de `firestore.rules` y pulsa **Publicar**.
3. Pestaña **Datos**: crea la colección `config` con un documento cuyo ID sea `acceso`.
   Agrégale un campo `editores` de tipo **array** con los correos que pueden editar, en minúsculas:
   - `tucorreo@gmail.com`
   - `otra.persona@gmail.com`

Para dar o quitar permiso de edición más adelante, solo cambia esa lista. No hay que volver a subir nada.

## 4. Publicar en GitHub Pages

1. Sube todos los archivos a la raíz de tu repositorio (o a una carpeta `/docs`).
2. En el repositorio: **Settings > Pages**, elige la rama `main` y la carpeta correspondiente.
3. Abre `https://TU_USUARIO.github.io/NOMBRE_DEL_REPO/`.

## 5. Instalar en el celular

- **Android (Chrome):** menú ⋮ > **Instalar app** o **Agregar a pantalla de inicio**.
- **iPhone (Safari):** botón Compartir > **Agregar a inicio**.

## 6. Google Calendar (opcional)

Permite agregar un evento a tu Google Calendar personal con el botón **Agregar a Google Calendar** del panel de cada evento.

1. En https://console.cloud.google.com, usa el mismo proyecto de Firebase (o crea uno) y activa **Google Calendar API**.
2. **APIs y servicios > Pantalla de consentimiento de OAuth**: tipo **Externo**, modo **Testing**, y agrega tu correo en **Usuarios de prueba**.
3. **Credenciales > Crear credenciales > ID de cliente de OAuth**: tipo **Aplicación web**.
   - Orígenes de JavaScript autorizados: `https://TU_USUARIO.github.io` (y `http://localhost:PUERTO` si pruebas en tu computadora).
4. Copia el Client ID en `firebase-config.js` (`googleClientId`).

Al primer uso, Google pide permiso para ver y editar eventos de tu calendario. En modo Testing, Google puede pedir volver a autorizar después de un tiempo.

## Quién puede hacer qué

- **Ver:** cualquiera con el enlace, sin iniciar sesión. Para hacerlo privado, en `firestore.rules`
  cambia `allow read: if true;` por `allow read: if request.auth != null;` dentro de `match /eventos/{id}`.
- **Agregar, editar y borrar:** solo quienes inicien sesión con Google y estén en `config/acceso.editores`.
  Las reglas también validan cada evento (largo del nombre, formato de fecha, tipo de animación),
  así que nadie puede guardar datos raros aunque modifique el código en su navegador.

## Actualizar la app

Cuando cambies `index.html` u otro archivo, sube el número en la primera línea de código de `sw.js`
(`hojas-v1` → `hojas-v2`). Así los celulares que la tienen instalada descargan la versión nueva.

## Límites del plan gratuito

El plan Spark de Firebase no pide tarjeta y alcanza de sobra para un calendario personal o familiar.
Revisa los límites vigentes en https://firebase.google.com/pricing.
