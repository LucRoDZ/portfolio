# Portfolio Lucas ZIVAN

Portfolio personnel moderne avec des animations 3D interactives.

## 🚀 Stack Technique

- **Framework**: Next.js 16 (App Router)
- **Langage**: TypeScript
- **3D**: Three.js, React Three Fiber, @react-three/drei
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Hébergement**: Vercel

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🏗️ Structure du Projet

```
portfolio/
├── app/                    # App Router Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   └── globals.css        # Styles globaux
├── components/
│   ├── 3d/               # Composants 3D
│   │   ├── Scene3D.tsx
│   │   └── FloatingGeometry.tsx
│   ├── sections/         # Sections de la page
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   └── ui/               # Composants UI
│       └── Navbar.tsx
└── public/               # Assets statiques
```

## 🎨 Personnalisation

### Couleurs

Modifiez les couleurs dans `app/globals.css` :

```css
:root {
  --background: #0a0a0a;
  --foreground: #ededed;
  --primary: #3b82f6;
  --accent: #8b5cf6;
}
```

### Contenu

1. **Informations personnelles**: Éditez `components/sections/Hero.tsx`
2. **Compétences**: Modifiez le tableau `skills` dans `components/sections/About.tsx`
3. **Projets**: Mettez à jour le tableau `projects` dans `components/sections/Projects.tsx`
4. **Contact**: Changez les liens dans `components/sections/Contact.tsx`

## 🌐 Déploiement sur Vercel

1. Push votre code sur GitHub
2. Connectez votre repo à Vercel
3. Vercel détectera automatiquement Next.js et déploiera

## 📝 Scripts

```bash
npm run dev      # Développement
npm run build    # Build de production
npm run start    # Lancer la production
npm run lint     # Vérifier le code
```

## 🎯 Features

- ✨ Scène 3D interactive avec Three.js
- 🎨 Design moderne et responsive
- 🌙 Mode sombre par défaut
- ⚡ Performance optimisée
- 🔍 SEO-friendly
- 📱 Mobile-first

## 📄 License

MIT © Lucas ZIVAN
