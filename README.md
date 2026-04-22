# Fiestopia · Web

Sitio web estático desplegado en Netlify.

## Estructura

```
fiestopia/
├── index.html              ← Home (fiestopia.es)
├── netlify.toml            ← Configuración Netlify + redirects
├── pages/
│   ├── contacto.html       → fiestopia.es/contacto
│   ├── eventos.html        → fiestopia.es/eventos
│   ├── nosotros.html       → fiestopia.es/nosotros
│   ├── ochentera.html      → fiestopia.es/ochentera
│   ├── bocachica.html      → fiestopia.es/bocachica
│   ├── sansaru.html        → sansaru.es (dominio propio)
│   ├── para-salas.html     → fiestopia.es/para-salas (pendiente)
│   ├── weddings.html       → sansaruweddings.es (pendiente)
│   └── rainbow.html        → fiestopia.es/rainbow (pendiente)
├── assets/
│   ├── css/                ← CSS compartido (futuro)
│   ├── js/                 ← JS compartido (futuro)
│   └── images/             ← Imágenes locales (futuro)
```

## Dominios en Netlify

| Dominio | Apunta a |
|---------|----------|
| fiestopia.es | Site principal |
| sansaru.es | /pages/sansaru.html |
| sansaruweddings.es | /pages/weddings.html |
| ochentera.es | /pages/ochentera.html |
| bocachica.es | /pages/bocachica.html |

## Páginas pendientes

- [ ] para-salas.html
- [ ] weddings.html (standalone para sansaruweddings.es)
- [ ] rainbow.html

## Despliegue

1. Subir cambios al repositorio (GitHub/GitLab)
2. Netlify despliega automáticamente
