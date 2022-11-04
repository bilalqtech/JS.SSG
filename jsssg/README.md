# JS.SSG

An opinionated static site generator built with JavaScript.

## Install

```
yarn add jsssg
```

JS.SSG expects to find three things:

1. a folder of markdown files to convert into pages
2. a folder of JS templates (to define how the built pages should look)
3. a folder of public assets to be included in the build as-is (i.e. stylesheets, images, fonts, etc.)

Setup basic commands in the "scripts" section of your project's `package.json`:

```json
// package.json
"scripts": {
    "build": "jsssg",
    "dev": "jsssg --serve --port=1337 --watch",
    "debug": "jsssg --verbose"
},
```

-   `jsssg` builds a production-ready static site in the `/build` directory
-   `jsssg` builds a production-ready static site in the `/build` directory, serves it on port 1337 and watches your markdown and template files for changes
-   `jsssg` builds a production-ready static site in the `/build` directory and has a really noisy console output so you can see what's going on (or going wrong)

### Configuration

You can configure JS.SSG by including a `config.json` file in the root of your project.

-   `in`: the path to your markdown files (defaults to `content`)
-   `out`: the place you want your finished build to go (defaults to `build`)
-   `templates`: the path to your markdown files (defaults to `templates`)
-   `data`: an object to store site-wide data that can be accessed by every template

### Example project structure

```
- package.json
- config.json
- content/
    - index.md
    - page.md
    - stuff/
        - another-page.md
- templates/
    - main.js
    - post.js
    - archive.js
    components/
        - cool-block.js
        - snippet.js
- public/
    images/
    app.css
    app.js
```