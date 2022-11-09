import { datemedium } from "../../tools/date.js";

const NewsletterSnippet = ({ article }) => `
<article class="snippet snippet--newsletter">
    <svg class="snippet--newsletter__icon" width="15" height="11" viewBox="0 0 30 22" xmlns="http://www.w3.org/2000/svg"><path d="M26 0a4.048 4.048 0 01.806.081l.068.015c.05.01.098.023.147.035l.016.005c.057.015.114.031.17.05l.035.011c.056.018.11.037.165.057l.015.007c.056.02.112.043.168.067l.019.01c.05.02.098.043.146.067l.06.03c.031.015.062.032.092.048l.082.046a3.85 3.85 0 01.418.276c.307.231.58.506.81.817l.05.07a2.48 2.48 0 01.108.16c.02.03.038.06.056.09l.037.063a3.292 3.292 0 01.18.35 4.363 4.363 0 01.158.41l.015.05.179.576-.04.04c.026.186.04.376.04.569v14a4 4 0 01-4 4H4a4 4 0 01-4-4V4c0-.193.014-.382.04-.567L0 3.393l.171-.555a3.97 3.97 0 01.277-.68l.015-.028c.049-.092.1-.182.156-.27l.043-.065c.02-.031.04-.061.062-.09l.044-.063a3.8 3.8 0 01.196-.247L1 1.355A3.93 3.93 0 011.36.992c.014-.01.027-.022.04-.034a3.921 3.921 0 01.727-.495c.327-.173.68-.303 1.053-.38l.026-.005A3.99 3.99 0 014 0zm2 5.39l-9.464 9.465a5 5 0 01-7.071 0L2 5.392V18c0 .18.024.353.068.518l4.342-4.342 1.414 1.414-4.342 4.342c.165.044.339.068.518.068h22c.212 0 .416-.033.607-.094l-4.316-4.316 1.414-1.414 4.25 4.25c.03-.138.045-.28.045-.426V5.39zM26 2H4a2.032 2.032 0 00-.154.006l.044-.003a2.014 2.014 0 00-.099.008l.055-.005a2 2 0 00-.161.019l.106-.014a1.998 1.998 0 00-.16.023l.054-.01a1.994 1.994 0 00-.142.029l.087-.019c-.051.01-.101.021-.151.035l.064-.016c-.058.013-.114.03-.17.047l.106-.031a1.984 1.984 0 00-.125.038l.02-.007c-.05.017-.1.035-.148.056l.128-.05a1.986 1.986 0 00-.144.056l.016-.006a2 2 0 00-.14.064l.124-.058a1.991 1.991 0 00-.143.069l.02-.01c-.04.02-.078.041-.116.064l.096-.054a1.998 1.998 0 00-.141.082l.045-.028a2.007 2.007 0 00-.108.07l.063-.042A2.005 2.005 0 002.8 2.4l.063-.046c-.101.07-.196.15-.283.237l-.026.027.026-.027c-.035.035-.069.072-.101.11l.075-.083a2.01 2.01 0 00-.215.267l-.006.011 10.546 10.545a3 3 0 004.098.135l.144-.135L27.668 2.896a2.005 2.005 0 00-.137-.183l.081.103a2.01 2.01 0 00-.095-.12l.014.017a2.006 2.006 0 00-.297-.287l.06.05a2.008 2.008 0 00-.118-.094l.058.044c-.04-.03-.08-.06-.121-.088l.063.044a2.003 2.003 0 00-.523-.273l.038.014c-.05-.018-.1-.035-.151-.05l.113.036a1.984 1.984 0 00-.171-.05l.058.015a1.993 1.993 0 00-.179-.041l.12.025a1.996 1.996 0 00-.327-.052l-.044-.002L26 2z"/></svg>
    <a class="snippet__link" href=${article.url} rel="bookmark">
        ${article.frontmatter.title}
    </a>
    <code class="snippet__date" class="categories__category">
        Sent on ${datemedium(article.frontmatter.date)}
    </code>
</article>`;

export default NewsletterSnippet;
