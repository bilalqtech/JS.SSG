import { markdown } from "jsssg";

import Main from "./Main.js";
import TweetForm from "../components/TweetForm.js";
import Icon from "../components/Icon.js";
import NewsletterSignup from "../components/NewsletterSignup.js";
import PostNav from "../components/PostNav.js";
import { date, datemedium, datefull } from "../../tools/date.js";
import { readTime } from "../../tools/readtime.js";

const layoutData = {
    signup_message:
        "### You've been reading the Podcasts for Nerds newsletter.\nIf you enjoyed it, sign up now to get the my podcast recommendations sent to you every week:"
};

const Newsletter = ({ content, page = {}, site = {} }) => {
    const standaloneTitle = page.standalone ? "entry-title--standalone" : "";
    const hiddenTitle = page.hide_title ? "hidden--visually" : "";

    return (
        <Main {...{ page, site }}>
            <article
                className="wrapper--main"
                itemprop="mainEntity"
                itemtype="http://schema.org/BlogPosting"
            >
                <div
                    className="entry-content stack--large"
                    itemprop="articleBody mainEntityOfPage"
                >
                    <header className="entry-header">
                        <div
                            itemprop="image"
                            itemscope
                            itemtype="https://schema.org/ImageObject"
                        >
                            <Icon slug={"pfn"} />
                        </div>

                        <h1
                            className="entry-title ${standaloneTitle} ${hiddenTitle}"
                            itemprop="name headline"
                        >
                            {page.title}
                        </h1>
                        <h2 className="entry-subtitle entry-subtitle--standalone">
                            {page.subtitle}
                            <span className="hidden--visually">
                                Published on{" "}
                            </span>
                            (
                            <time
                                datetime={datefull(page.date)}
                                itemprop="datePublished"
                            >
                                {datemedium(page.date)}
                            </time>
                            )
                        </h2>

                        <div
                            className={`entry-meta ${
                                page.hide_meta || page.standalone
                                    ? "hidden--visually"
                                    : ""
                            }`}
                        >
                            <span className="hidden--visually">
                                Published on{" "}
                            </span>
                            <time
                                datetime={datefull(page.date)}
                                itemprop="datePublished"
                            >
                                {date(page.date)}
                            </time>
                            <span
                                style="display: none;"
                                className="hidden--visually"
                            >
                                Modified on{" "}
                                <time
                                    datetime={datefull(page.date)}
                                    itemprop="dateModified"
                                >
                                    {date(page.date)}
                                </time>
                            </span>
                            <span> – </span>
                            <span className="readingTime">
                                Read time:
                                {page.read_time_override
                                    ? page.read_time_override
                                    : readTime(content)}
                            </span>
                            <span
                                className="hidden--visually"
                                itemprop="author"
                                itemscope=""
                                itemtype="http://schema.org/Person"
                            >
                                <span itemprop="name">{site.author}</span>
                            </span>
                            <span
                                className="hidden--visually"
                                itemprop="publisher"
                                itemscope=""
                                itemtype="http://schema.org/Organization"
                            >
                                <meta itemprop="name" content={site.author} />
                                <meta itemprop="url" content={site.url} />
                                <div
                                    itemprop="logo"
                                    itemScope
                                    itemtype="https://schema.org/ImageObject"
                                >
                                    <img
                                        style="display:none;"
                                        src="/images/pages.png"
                                        alt=""
                                    />
                                    <meta
                                        itemprop="url"
                                        content="/images/pages.png"
                                    />
                                    <meta itemprop="width" content="32" />
                                    <meta itemprop="height" content="32" />
                                </div>
                            </span>
                        </div>
                    </header>
                    {page.intro_note && (
                        <div className="intro-note">
                            <span
                                className="intro-note-text"
                                dangerouslySetInnerHTML={{
                                    __html: markdown(page.intro_note)
                                }}
                            />
                        </div>
                    )}
                    <div
                        id="content"
                        className="selectable-area first-selectable-area stack--large"
                    >
                        <div className="block block--newsletter stack">
                            {content}
                        </div>
                        <blockquote>
                            You've been reading an issue of the Podcasts for
                            Nerds newsletter. Find out more{" "}
                            <a href="/podcasts-for-nerds">here</a>, or signup
                            below. 👇
                        </blockquote>
                    </div>
                    {!page.hide_twitter && (
                        <>
                            <hr />
                            <TweetForm url={site.url + page.url} />
                        </>
                    )}
                    {!page.hide_footer_signup && !page.hide_twitter && <hr />}
                    {!page.hide_footer_signup && (
                        <NewsletterSignup
                            newsletterTitle={site.newsletterTitle}
                            newsletterIntro={site.newsletterIntro}
                            message={layoutData.signup_message}
                        />
                    )}
                    {!page.standalone && (
                        <PostNav pagination={page.pagination.tags.articles} />
                    )}
                </div>
            </article>
        </Main>
    );
};

export default Newsletter;
