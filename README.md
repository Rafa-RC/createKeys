## Guía para Descargar e Instalar un Proyecto de GitHub

### Paso 1: Instalar Git

#### Windows
1. Ve a la página de descargas de Git.
2. Descarga el instalador y ejecútalo.
3. Sigue las instrucciones del instalador.

#### macOS
1. Abre la Terminal.
2. Ejecuta el siguiente comando para instalar Git usando Homebrew:
   ```bash
   brew install git
   ```

#### Linux
1. Abre la Terminal.
2. Ejecuta el comando según tu distribución:
   - **Debian/Ubuntu:**
     ```bash
     sudo apt-get install git
     ```
   - **Fedora:**
     ```bash
     sudo dnf install git
     ```
   - **Arch:**
     ```bash
     sudo pacman -S git
     ```

### Paso 2: Configurar Git

Configura tu nombre de usuario y correo electrónico:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tuemail@example.com"
```

### Paso 3: Clonar el Proyecto

1. Ve a la página del proyecto en GitHub.
2. Copia la URL del repositorio.
3. Abre la Terminal y navega al directorio donde quieres clonar el proyecto.
4. Ejecuta el comando de clonación:

```bash
git clone URL_DEL_REPOSITORIO
```

### Paso 4: Instalar Dependencias

#### Backend
1. Navega a la carpeta del backend:
   ```bash
   cd nombre-del-proyecto/backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

#### Frontend
1. Navega a la carpeta del frontend:
   ```bash
   cd ../frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

### Paso 5: Ejecutar el Backend

1. Navega a la carpeta del backend:
   ```bash
   cd ../backend
   ```
2. Inicia el servidor del backend:
   ```bash
   npm start
   ```

### Paso 6: Ejecutar el Frontend

1. Abre una nueva ventana de la Terminal.
2. Navega a la carpeta del frontend:
   ```bash
   cd ruta/al/proyecto/frontend
   ```
3. Inicia la aplicación de React:
   ```bash
   npm start
   ```

### Solución de Problemas

#### Error: `EADDRINUSE: address already in use :::5000`
1. Identificar el proceso que está usando el puerto 5000:
   - **Windows:**
     ```bash
     netstat -ano | findstr :5000
     ```
   - **macOS y Linux:**
     ```bash
     lsof -i :5000
     ```
2. Detener el proceso:
   - **Windows:**
     ```bash
     taskkill /PID <PID> /F
     ```
   - **macOS y Linux:**
     ```bash
     kill -9 <PID>
     ```

#### Error: `react-scripts` no se reconoce como un comando
1. Navega a la carpeta del frontend:
   ```bash
   cd C:\Users\rromancr\cecabank\generate-keys-jwt\createKeys\frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

#### Error: `error:0308010C:digital envelope routines::unsupported`
1. Establecer una variable de entorno:
   - En macOS/Linux:
     ```bash
     export NODE_OPTIONS=--openssl-legacy-provider
     ```
   - En Windows:
     ```bash
     set NODE_OPTIONS=--openssl-legacy-provider
     ```
2. Iniciar la aplicación de nuevo:
   ```bash
   npm start
   ```

---

### Introducción

Cuando desarrollamos una aplicación web, es común tener un frontend y un backend. El frontend es la parte de la aplicación que interactúa con el usuario, mientras que el backend maneja la lógica del servidor, la base de datos y otras operaciones del lado del servidor.

En este caso, he desplegado el frontend de la aplicación en GitHub Pages, lo cual es una excelente opción para alojar sitios estáticos de manera gratuita y accesible desde cualquier lugar. Sin embargo, GitHub Pages solo puede alojar contenido estático (HTML, CSS, JavaScript) y no podemos ejecutar código del lado del servidor. Esto significa que no podemos alojar tu backend en GitHub Pages.

### Problema

El problema surge cuando tu aplicación frontend necesita comunicarse con el backend para realizar operaciones como acceder a una base de datos, autenticar usuarios, o procesar datos. Si tu backend está corriendo localmente en tu máquina (por ejemplo, en `http://localhost:5000`), solo es accesible desde tu máquina local. Esto significa que cuando intentas acceder a tu aplicación desde otra máquina o dispositivo, el frontend no puede comunicarse con el backend, ya que `localhost` se refiere a la máquina local de cada usuario.

### Solución con ngrok

Aquí es donde ngrok entra en juego. Ngrok es una herramienta que te permite exponer tu servidor local a internet a través de una URL pública temporal. Esto significa que puedes hacer que tu backend local sea accesible desde cualquier lugar, permitiendo que tu frontend desplegado en GitHub Pages se comunique con tu backend.

### Beneficios de Usar ngrok

1. **Acceso Remoto**: Permite que tu backend local sea accesible desde cualquier lugar a través de una URL pública.
2. **Pruebas y Desarrollo**: Ideal para pruebas y desarrollo, ya que puedes compartir tu servidor local con otros desarrolladores o testers sin necesidad de desplegarlo en un servidor de producción.
3. **Simplicidad**: Fácil de configurar y usar, sin necesidad de cambios significativos en tu infraestructura.

### Limitaciones de ngrok

1. **Temporalidad**: Las URLs generadas por ngrok son temporales y cambian cada vez que inicias ngrok, a menos que uses una cuenta paga que permite URLs personalizadas y persistentes.
2. **Dependencia de tu Máquina Local**: Tu servidor backend debe estar corriendo en tu máquina local y ngrok debe estar activo para que la URL pública funcione. Si apagas tu máquina o cierras ngrok, la URL dejará de funcionar.

### Conclusión

Usar ngrok es una solución práctica y rápida para exponer tu backend local a internet, permitiendo que tu frontend desplegado en GitHub Pages pueda comunicarse con él. Esto es especialmente útil durante el desarrollo y las pruebas, aunque para una solución permanente en producción, deberías considerar desplegar tu backend en un servicio de hosting adecuado.

---

### Guía para Usar ngrok

#### Paso 1: Instalar ngrok

##### Windows
1. Ve a la [página de descargas de ngrok](https://ngrok.com/download).
2. Descarga el archivo ZIP para Windows.
3. Extrae el archivo ZIP en una ubicación de tu elección.
4. Abre una terminal (cmd o PowerShell) y navega a la carpeta donde extrajiste ngrok.

##### macOS
1. Ve a la [página de descargas de ngrok](https://ngrok.com/download).
2. Descarga el archivo ZIP para macOS.
3. Extrae el archivo ZIP.
4. Abre una terminal y navega a la carpeta donde extrajiste ngrok.

##### Linux
1. Ve a la [página de descargas de ngrok](https://ngrok.com/download).
2. Descarga el archivo ZIP para Linux.
3. Extrae el archivo ZIP.
4. Abre una terminal y navega a la carpeta donde extrajiste ngrok.

#### Paso 2: Iniciar tu Servidor Backend Local
Asegúrate de que tu servidor backend esté corriendo en tu máquina local en el puerto 5000 (o el puerto que estés usando).

#### Paso 3: Iniciar ngrok
1. Abre una terminal y navega a la carpeta donde extrajiste ngrok.
2. Ejecuta el siguiente comando para exponer tu servidor local en el puerto 5000:

   ```sh
   ngrok http 5000
   ```

3. Ngrok te proporcionará una URL pública que redirige a tu servidor local. La salida del comando se verá algo así:

   ```
   ngrok by @inconshreveable                                                                                                                                 (Ctrl+C to quit)

   Session Status                online
   Session Expires               1 hour, 59 minutes
   Version                       2.3.35
   Region                        United States (us)
   Web Interface                 http://127.0.0.1:4040
   Forwarding                    http://abcd1234.ngrok.io -> http://localhost:5000
   Forwarding                    https://abcd1234.ngrok.io -> http://localhost:5000

   Connections                   ttl     opn     rt1     rt5     p50     p90
                                 0       0       0.00    0.00    0.00    0.00
   ```

#### Paso 4: Actualizar el Archivo 

.env


1. Copia la URL pública proporcionada por ngrok (por ejemplo, `https://abcd1234.ngrok.io`).
2. Abre tu archivo 

.env

 y actualiza la variable `REACT_APP_API_URL`:

   ```properties
   REACT_APP_API_URL=https://abcd1234.ngrok.io
   ```

#### Paso 5: Recompilar y Desplegar tu Aplicación
1. Recompila tu aplicación para que los cambios en el archivo 

.env

 se apliquen:

   ```sh
   npm run build
   ```

2. Despliega tu aplicación a GitHub Pages:

   ```sh
   npm run deploy
   ```

#### Paso 6: Verificar el Despliegue
1. Abre tu navegador y navega a la URL de tu aplicación en GitHub Pages.
2. Verifica que tu aplicación esté funcionando correctamente y que pueda comunicarse con tu servidor backend a través de la URL pública proporcionada por ngrok.

### Consideraciones
- **Sesiones temporales**: Las URLs generadas por ngrok son temporales y cambian cada vez que inicias ngrok, a menos que uses una cuenta paga que permite URLs personalizadas y persistentes.
- **Dependencia de tu Máquina Local**: Tu servidor backend debe estar corriendo en tu máquina local y ngrok debe estar activo para que la URL pública funcione. Si apagas tu máquina o cierras ngrok, la URL dejará de funcionar.

### Resumen
- **Frontend**: Desplegado en GitHub Pages.
- **Backend**: Corriendo localmente y expuesto a internet temporalmente usando ngrok.
- **Requisitos**: Tu servidor backend local debe estar corriendo y ngrok debe estar activo para que la URL pública funcione.

Siguiendo estos pasos, podrás probar tu aplicación sin estar en local, utilizando ngrok para exponer tu servidor backend a internet.




