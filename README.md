# Eleva Isenções — Site Institucional

Assessoria especializada em isenção fiscal PCD para aquisição de veículos.

## Estrutura do Projeto

```
ElevaIsen-es/
│
├── index.html                  ← página principal (renomear eleva-landing.html)
├── eleva-landing.html          ← landing page atual (single-file HTML+CSS+JS)
├── robots.txt                  ← diretivas para crawlers de busca
├── sitemap.xml                 ← mapa do site para SEO
│
├── pages/                      ← páginas institucionais futuras
│   ├── sobre.html              ← página "Sobre a Eleva" expandida
│   ├── contato.html            ← formulário e dados de contato
│   ├── politica-privacidade.html
│   └── blog/                   ← artigos informativos (SEO)
│       └── index.html
│
├── assets/
│   ├── css/                    ← estilos extraídos do HTML (ao modularizar)
│   │   ├── tokens.css          ← design tokens (:root variables)
│   │   ├── base.css            ← reset + tipografia + utilitários
│   │   ├── components.css      ← botões, tags, cards reutilizáveis
│   │   └── pages/              ← CSS específico por página
│   │
│   ├── js/                     ← scripts extraídos do HTML (ao modularizar)
│   │   ├── main.js             ← nav, reveal, animações globais
│   │   ├── faq.js              ← accordion do FAQ
│   │   └── lenis.js            ← scroll suave
│   │
│   ├── images/
│   │   ├── hero/               ← fotos principais (LCP) — foto1.webp, fotohero.webp
│   │   ├── brands/             ← logos das marcas — marca1–10.webp
│   │   └── og/                 ← imagens Open Graph (1200×630px) para redes sociais
│   │       └── og-image.jpg    ← preview ao compartilhar no WhatsApp/LinkedIn
│   │
│   ├── icons/                  ← ícones SVG avulsos
│   ├── logos/                  ← logos da Eleva em variações
│   └── fonts/                  ← fontes locais (migrar do Google Fonts quando possível)
│
└── assets/images/misc/         ← carro.webp, pattern*.svg
```

## Arquivos Atuais (na raiz)

Durante a fase de single-page todos os assets ficam na raiz.
Ao migrar para estrutura multi-página, mover para `assets/` e atualizar os caminhos no HTML:

| Arquivo atual | Destino futuro |
|---|---|
| `eleva-landing.html` | `index.html` (raiz) |
| `foto1.webp` | `assets/images/hero/` |
| `fotohero.webp` | `assets/images/hero/` |
| `carro.webp` | `assets/images/misc/` |
| `marca1–10.webp` | `assets/images/brands/` |
| `pattern.svg` | `assets/images/misc/` |
| `pattern-terra.svg` | `assets/images/misc/` |
| `ELEVA 01H.svg` | `assets/logos/` |
| `ELEVA 01S.svg` | `assets/logos/` |
| `Segmento Logomarca Horizontal.svg` | `assets/logos/` |

## Domínio e SEO

- **URL canônica:** `https://elevaisencoes.com.br/`
- **Sitemap:** `https://elevaisencoes.com.br/sitemap.xml`
- Atualizar `sitemap.xml` a cada nova página publicada
- Criar `assets/images/og/og-image.jpg` (1200×630px) para preview em redes sociais

## Tecnologias

- HTML5 semântico (sem framework, sem build tool)
- CSS com design tokens via custom properties (`--c-terra`, `--f-heading`, etc.)
- JS vanilla com IntersectionObserver, RAF e event delegation
- [Lenis](https://github.com/darkroomengineering/lenis) — scroll suave
- Google Fonts: Raleway, DM Sans, Cormorant Garamond
