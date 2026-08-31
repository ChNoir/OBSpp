---
home: true
containerClass: Home
title: Home
heroFullScreen: true
bgImage: /img/doc/flat-mountains.svg 
bgImageStyle:
  background-attachment: fixed

actions:
  - text: Démarrer
    link: /guide/
  - text: Voir l'architecture
    link: /architecture/
features:
  - title: Développement modulaire
    details: Une structure orientée service avec des modules séparés pour le backend, les overlays et les intégrations.
  - title: Intégrations stream
    details: Support Twitch, YouTube, Discord et OBS pour piloter l'expérience de diffusion.
  - title: Documentation évolutive
    details: Les pages Markdown sont prêtes à accueillir les chapitres techniques et l’aide utilisateur.
footer: MIT Licensed | Copyright © 2018-present VuePress Community
---

<style>

  [data-theme="dark"] .Home .vp-hero-mask {
    background-image: url(/img/doc/flat-mountains.svg) , url(/img/doc/bg.svg)  !important;
    background-attachment: fixed,fixed  !important;
  }

  .vp-hero-infos {
    background: var(--navbar-c-bg);
    padding: 20px;
    border-radius: 30px;
    padding-bottom: unset;
  }

 </style>