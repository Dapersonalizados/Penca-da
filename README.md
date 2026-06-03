# ⚽ Penca Mundial · Da! Personalizados

## Cómo publicar en 10 minutos (sin saber programar)

---

### PASO 1 — Crear cuenta en GitHub
1. Andá a **github.com**
2. Hacé clic en **Sign up** (es gratis)
3. Completá nombre, email y contraseña

---

### PASO 2 — Subir este proyecto a GitHub
1. Una vez dentro de GitHub, hacé clic en el **+** arriba a la derecha → **New repository**
2. Nombre: `penca-mundial-da`
3. Dejalo en **Public**
4. Hacé clic en **Create repository**
5. En la página que aparece, hacé clic en **uploading an existing file**
6. **Arrastrá toda la carpeta `penca-da`** a esa página
7. Hacé clic en **Commit changes** (botón verde abajo)

---

### PASO 3 — Publicar en Vercel
1. Andá a **vercel.com**
2. Hacé clic en **Sign up with GitHub** (usa la misma cuenta)
3. Hacé clic en **Add New → Project**
4. Elegí el repositorio `penca-mundial-da`
5. Vercel detecta automáticamente que es React
6. Hacé clic en **Deploy**
7. En 2 minutos aparece tu URL: algo como `penca-mundial-da.vercel.app` ✅

---

### PASO 4 — Conectar tu dominio de Wix
1. En Vercel, andá a tu proyecto → **Settings → Domains**
2. Escribí `penca.dapersonalizados.com.uy` y hacé clic en **Add**
3. Vercel te va a mostrar un registro **CNAME** para copiar
4. Andá a **Wix** → Panel de control → **Configuración → Dominios**
5. Hacé clic en los **3 puntitos** al lado de tu dominio → **Administrar DNS**
6. Hacé clic en **+ Agregar registro** → elegí **CNAME**
   - **Nombre del host**: `penca`
   - **Valor**: `cname.vercel-dns.com`
   - **TTL**: 3600
7. Guardá y esperá unos minutos

¡Listo! Tu penca ya está en **penca.dapersonalizados.com.uy** 🎉

---

### Contraseña de administrador
La contraseña del panel admin es: **da2026**
(Para cambiarla, abrí `src/App.js` y buscá `ADMIN_PASS`)

