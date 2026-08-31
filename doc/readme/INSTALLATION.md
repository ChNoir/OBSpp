# Installation détaillée d'OBSpp

## 📋 Prérequis

### Système
- **Node.js** 20+ (recommandé 20.10 ou plus récent)
- **npm** 10+ ou **yarn**

### Optionnel : Intégrations externes
Pour utiliser les intégrations Twitch/YouTube, vous aurez besoin de :
- Compte Google Cloud pour les tokens OAuth
- Compte Twitch avec application enregistrée
- Compte Discord (optionnel)
- Clés d'API correspondantes

## 🚀 Étapes d'installation

### 1. Cloner le projet

```bash
git clone https://github.com/ChNoir/OBSpp.git
cd OBSpp
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Générer le fichier `.env`

```bash
node ./dist/index.js --env
```

Cela crée un fichier `.env` avec les cles des variable possible.

### 4. Configuration OAuth (optionnel)

Les fichiers de configuration OAuth doivent être placés dans le dossier `OAuth/Credentials/` :

- `google.json` — Credentials Google OAuth 2.0
- `twitch.json` — Credentials Twitch OAuth 2.0

Exemple de structure `google.json` :
```json
{
  "client_id": "YOUR_CLIENT_ID.apps.googleusercontent.com",
  "client_secret": "YOUR_CLIENT_SECRET",
  "redirect_uri": "http://localhost:3000/auth/google/callback"
}
```

### 5. Compiler le projet

Compilation complète (backend + frontend) :

```bash
npm run build
```

Frontend uniquement :

```bash
npm run build:front
```

## 🏃 Lancer l'application

### Mode développement

Build + lancer le serveur :

```bash
npm run dev
```

Mode debug (avec logs détaillés) :

```bash
npm run dev:debug
```

Mode debug très détaillé :

```bash
node ./dist/index.js --debug hard
```

### Production

```bash
npm run build 
npm run start 
```

## 🖥️ Options CLI avancées

| Option | Alias | Description | Paramètres | Bloquant |
|--|-|-|--|-|
| `--help` | `-h` | Affiche ce message d'aide | - | Oui |
| `--man` | - | Affiche ce message d'aide (alias de --help) | - | Oui |
| `--token` | `-t` | Lance le processus de récupération des tokens d'authentification | - | Oui* |
| `--i18n` | `-i` | Crée un fichier de traductions i18n avec les fichier source | `[language]` (ex: fr, en) | Oui* |
| `--env` | `-e` | Crée un fichier .env avec les fichier source | - | Oui* |
| `--debug` | `-d` | Active le mode debug | `hard` (optionnel pour debug détaillé) | Non |
| `--clear` | - | Nettoie les caches/fichiers temporaires | - | Non |
| `--build` | - | Build le frontend uniquement | - | Oui |

## 📊 Vérifier l'installation

Après compilation, vérifier que les dossiers suivants existent :

- `dist/` — Backend compilé
- `cache/BuilderFront/` — Frontend compilé
- `.env` — Variables d'environnement

Pour vérifier que tout fonctionne :

```bash
npm run start
```

Le serveur devrait démarrer sans erreurs. Par défaut, il tourne sur `http://localhost:3000`.

## 🔧 Dépannage

### "Command not found: npm"
Assurez-vous que Node.js et npm sont correctement installés :
```bash
node --version
npm --version
```

### Erreur de build
Supprimer `node_modules` et réinstaller :
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port 3000 déjà utilisé
Changer le port dans `.env` ou via variable d'environnement :
```bash
SERVEUR_PORT=3001
```

### Problèmes OAuth
- Vérifier que `OAuth/Credentials/google.json` et `twitch.json` sont correctement placés
- Vérifier que les credentials sont valides
- Les tokens seront stockés automatiquement dans `OAuth/Tokens/`

## 📁 Arborescence après installation

```
OBSpp/
├── node_modules/         # Dépendances npm
├── dist/                 # Backend compilé (créé après npm run build)
├── cache/
│   └── BuilderFront/     # Frontend compilé (créé après npm run build)
├── public/               # Assets statiques
├── OAuth/
│   ├── Credentials/      # À remplir avec vos clés
│   └── Tokens/           # Tokens générés automatiquement
├── src/                  # Code source
├── .env                  # Variables d'environnement (créé après --env)
├── package.json
└── tsconfig.json
```
