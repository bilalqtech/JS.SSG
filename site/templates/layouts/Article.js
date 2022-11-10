import { markdown } from "jsssg";

import Main from "./Main.js";
import Icon from "../components/Icon/index.js";
import TweetForm from "../components/TweetForm.js";
import NewsletterSignup from "../components/NewsletterSignup.js";
import PostNav from "../components/PostNav.js";
import { date, datefull } from "../../tools/date.js";
import { readTime } from "../../tools/readtime.js";

const Article = ({ content, page = {}, site = {} }) => {
    const iconSlug = page.custom_icon
        ? page.custom_icon
        : page.podcasts_for_nerds_logo
        ? page.podcasts_for_nerds_logo
        : page.categories && page.categories.length
        ? page.categories[0]
        : "pages";

    const standaloneTitle = page.standalone ? "entry-title--standalone" : "";
    const hiddenTitle = page.hide_title ? "hidden--visually" : "";

    const subtitle = page.subtitle
        ? `<h2 class="entry-subtitle entry-subtitle--standalone">${page.subtitle}</h2>`
        : page.excerpt
        ? `<h2 class="entry-subtitle">${page.excerpt}</h2>`
        : "";

    const body = `
<article class="wrapper--main" itemprop="mainEntity" itemtype="http://schema.org/BlogPosting">
    <div class="entry-content stack--large" itemprop="articleBody mainEntityOfPage">
        <header class="entry-header stack--large">
            <div itemprop="image" itemscope itemtype="https://schema.org/ImageObject">${Icon(
                { slug: iconSlug }
            )}</div>

            <div class="stack--small">

                <h1 class="entry-title ${standaloneTitle} ${hiddenTitle}" itemprop="name headline">${
        page.title
    }</h1>
                ${subtitle}

                <div class="entry-meta ${
                    page.hide_meta || page.standalone ? "hidden--visually" : ""
                }">
                    <span class="hidden--visually">Published on </span>
                    <time datetime="${datefull(
                        page.date
                    )}" itemprop="datePublished">${date(page.date)}</time>
                    <span style="display:none;" class="hidden--visually">Modified on <time datetime="${datefull(
                        page.date
                    )}" itemprop="dateModified">${date(page.date)}</time>
                    </span>
                    <span> – </span>
                    <span class="readingTime">Read time: ${
                        page.read_time_override
                            ? page.read_time_override
                            : readTime(content)
                    }</span>
                    <span class="hidden--visually" itemprop="author" itemscope="" itemtype="http://schema.org/Person">
                        <span itemprop="name">${site.author}</span>
                    </span>
                    <span class="hidden--visually" itemprop="publisher" itemscope="" itemtype="http://schema.org/Organization">
                        <meta itemprop="name" content="${site.author}"/>
                        <meta itemprop="url" content="${site.url}"/>
                        <div itemprop="logo" itemScope itemtype="https://schema.org/ImageObject">
                            <img style="display:none;" src="/images/pages.png" alt=""/>
                            <meta itemprop="url" content="/images/pages.png"/>
                            <meta itemprop="width" content="32"/>
                            <meta itemprop="height" content="32"/>
                        </div>
                    </span>
                </div>
            </div>
        </header>

        ${
            page.intro_note
                ? `<div class="intro-note"><span class="intro-note-text">${markdown(
                      page.intro_note
                  )}</span></div>`
                : ""
        }

        <div id="content" class="content-area selectable-area first-selectable-area stack" >${content}</div>

        ${
            !page.hide_twitter
                ? `<hr/>${TweetForm({ url: site.url + page.url })}`
                : ""
        }
        
        ${!page.hide_footer_signup && !page.hide_twitter ? `<hr/>` : ""}

        ${
            !page.hide_footer_signup
                ? NewsletterSignup({ site, message: page.signup_message })
                : ""
        }

        ${!page.standalone ? PostNav(page.pagination.tags.articles) : ""}
    </div>
</article>
    `;
    return Main({ content: body, page, site });
};

export default Article;
