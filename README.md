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


