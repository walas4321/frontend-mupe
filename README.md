# Mesa de Partes Presencial UI

![Angular](https://img.shields.io/badge/Angular-18.2-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple?logo=bootstrap)
![Node.js](https://img.shields.io/badge/Node.js-21+-green?logo=node.js)

Una aplicación Angular para la gestión de mesa de partes presencial del sistema judicial.

## 📋 Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Desarrollo](#desarrollo)
- [Construcción](#construcción)
- [Testing](#testing)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración de Entornos](#configuración-de-entornos)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Scripts Disponibles](#scripts-disponibles)
- [Contribución](#contribución)

## 🚀 Requisitos Previos

Asegúrate de tener instaladas las siguientes herramientas:

| Herramienta     | Versión Mínima | Recomendada |
|:----------------|:---------------|:------------|
| Node.js         | 21.0.0         | 21.x        |
| npm             | 8.0.0          | 10.x        |
| Angular CLI     | 18.0.0         | 18.2.x      |
| Bun (opcional)  | 1.0.0          | Latest      |

### Verificar Instalaciones

```bash
node --version
npm --version
ng version
bun --version  # Si usas Bun
```

## 📦 Instalación

### Usando npm (Recomendado)

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd front-mpp

# Instalar dependencias
npm install
```

### Usando Bun (Alternativo)

```bash
# Instalar Bun (si no está instalado)
curl -fsSL https://bun.sh/install | bash

# Instalar dependencias del proyecto
bun install
```

## 🛠️ Desarrollo

### Iniciar el servidor de desarrollo

```bash
# Con npm
npm start

# Con Bun
bun run start

# Servidor personalizado con configuraciones específicas
npm run start:desa    # Entorno de desarrollo
npm run start:test    # Entorno de testing
npm run start:prod    # Entorno de producción
```

La aplicación estará disponible en `http://localhost:4200/` por defecto.

### 🔧 Desarrollo con Hot Reload

El servidor de desarrollo recarga automáticamente cuando detecta cambios en los archivos fuente.

## 🏗️ Construcción

### Construir para diferentes entornos

```bash
# Desarrollo
npm run build:desa

# Testing
npm run build:test

# Producción
npm run build:prod
```

Los archivos de construcción se almacenarán en el directorio `dist/`.

## 🧪 Testing

### Ejecutar pruebas unitarias

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas con coverage
npm run test:coverage

# Ejecutar pruebas en modo watch
npm run watch
```

### Análisis de Código con SonarQube

```bash
npm run sonar
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── api/              # Servicios de API generados
│   ├── components/       # Componentes reutilizables
│   ├── core/            # Servicios core y guards
│   ├── models/          # Interfaces y modelos TypeScript
│   ├── routes/          # Configuración de rutas
│   ├── services/        # Servicios de la aplicación
│   ├── util/            # Utilidades y helpers
│   ├── assets/          # Recursos estáticos
│   ├── app.component.*  # Componente raíz
│   ├── app.config.ts    # Configuración de la aplicación
│   ├── app.model.ts     # Modelos principales
│   ├── app.routes.ts    # Rutas principales
│   └── constant.ts      # Constantes globales
├── environments/        # Configuraciones de entornos
├── styles.scss          # Estilos globales
└── main.ts             # Punto de entrada de la aplicación
```

## ⚙️ Configuración de Entornos

La aplicación soporta múltiples entornos de despliegue:

| Entorno    | Comando              | URL Base                            |
|:-----------|:---------------------|:------------------------------------|
| Desarrollo | `npm run start:desa` | http://192.168.5.98:8084/panel     |
| Testing    | `npm run start:test` | http://192.168.5.98:8084/panel     |
| Producción | `npm run start:prod` | http://192.168.5.98:8084/panel     |

### URL del Proyecto

- **URL de registro en menú**: `/procesos-judiciales/#`

## 🛠️ Tecnologías Utilizadas

### Framework Principal
- **Angular 18.2** - Framework principal
- **TypeScript 5.5** - Lenguaje de programación
- **RxJS 7.8** - Programación reactiva

### UI y Styling
- **Bootstrap 5.3** - Framework CSS
- **ng-bootstrap 17.0** - Componentes Bootstrap para Angular
- **SCSS** - Preprocesador CSS

### Utilidades
- **ng-select 13.9** - Componente de selección avanzada
- **Chart.js 4.5** - Gráficos y visualizaciones
- **Moment.js 2.30** - Manipulación de fechas
- **Crypto-js 4.2** - Funciones criptográficas
- **jsPDF 3.0** - Generación de PDF
- **html2canvas 1.4** - Captura de pantalla
- **file-saver 2.0** - Descarga de archivos
- **jwt-decode 4.0** - Decodificación de JWT

### Testing y Calidad
- **Jasmine & Karma** - Testing framework
- **SonarQube** - Análisis de calidad de código
- **TypeScript ESLint** - Linting

## 📜 Scripts Disponibles

| Script              | Descripción                                    |
|:-------------------|:-----------------------------------------------|
| `npm start`        | Inicia servidor de desarrollo                  |
| `npm run start:desa` | Inicia con configuración de desarrollo       |
| `npm run start:test` | Inicia con configuración de testing          |
| `npm run start:prod` | Inicia con configuración de producción       |
| `npm run build:desa` | Construye para desarrollo                     |
| `npm run build:test` | Construye para testing                        |
| `npm run build:prod` | Construye para producción                     |
| `npm test`         | Ejecuta pruebas unitarias                     |
| `npm run test:coverage` | Ejecuta pruebas con reporte de cobertura |
| `npm run watch`    | Construye en modo watch                       |
| `npm run sonar`    | Ejecuta análisis de SonarQube                |

## 🤝 Contribución

### Flujo de Desarrollo

1. **Fork** el repositorio
2. Crea una **rama feature** (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un **Pull Request**

### Estándares de Código

- Utiliza **TypeScript** para tipado estático
- Sigue las convenciones de **Angular Style Guide**
- Mantén la **cobertura de pruebas** superior al 80%
- Documenta las funciones públicas con **JSDoc**
- Utiliza **commits semánticos**

### Pre-commit Hooks

Asegúrate de que el código pase todas las verificaciones:

```bash
# Verificar linting
npm run lint

# Verificar pruebas
npm test

# Verificar construcción
npm run build:prod
```

## 📋 Configuración de Docker

```dockerfile
# Dockerfile incluido en el proyecto
FROM node:21-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build:prod
EXPOSE 4200
CMD ["npm", "start"]
```

## 🔒 Consideraciones de Seguridad

- Las **claves de API** se gestionan a través de variables de entorno
- Implementación de **JWT** para autenticación
- **Cifrado** de datos sensibles con crypto-js
- **Validación** de entrada en todos los formularios

## 📞 Soporte

Para reportar problemas o solicitar nuevas características:

1. Revisa los [issues existentes](link-to-issues)
2. Crea un nuevo issue con la plantilla correspondiente
3. Proporciona información detallada del problema o mejora

---

**Desarrollado con ❤️ por el equipo de desarrollo**

> 📝 **Nota**: Este README utiliza codificación UTF-8 para garantizar la compatibilidad con caracteres especiales y emojis.