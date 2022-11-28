import fs from "fs";

import { copyFile, readFolder } from "./io.js";
import { handleFileBuild, processFile } from "./process-file.js";
import { parseSiteData } from "./parse-site-data.js";
import { getTemplates } from "./templates.js";
import { buildRssPage } from "./rss.js";
import { buildSitemapPage } from "./sitemap.js";

export const build = async ({ PATHS, config, args }) => {
    if (args.images) {
        if (args.verbose) console.log(`Removing stale build files...`);
        fs.rmSync(PATHS.OUT, { recursive: true, force: true });
    } else {
        if (args.verbose)
            console.log(`Removing stale build files (but keeping images)...`);
        const allBuildFiles = readFolder(PATHS.OUT);
        const nonImageBuildFiles = allBuildFiles.filter(
            filePath => !filePath.includes(config.images)
        );
        nonImageBuildFiles.map(filePath => fs.rmSync(filePath));
        return;
    }

    if (args.verbose) console.log("Getting all content file paths...");
    const allFiles = readFolder(PATHS.IN);
    if (args.verbose) console.log(`found ${allFiles.length} files`);

    if (args.verbose) console.log("Parsing frontmatter...");
    const fileData = await Promise.all(
        allFiles.map(async filePath => await processFile(filePath, PATHS))
    );

    if (args.verbose) console.log("Processing pages...");
    const site = parseSiteData(config, fileData);

    if (args.verbose) console.log("Loading templates...");
    const templates = await getTemplates(PATHS.TEMPLATES);

    fileData.forEach(file =>
        handleFileBuild({
            file,
            PATHS,
            templates,
            site
        })
    );

    if (config.rss) {
        buildRssPage({ templates, site, outPath: PATHS.OUT });
    }

    if (config.sitemap) {
        buildSitemapPage({ templates, site, outPath: PATHS.OUT });
    }

    if (args.verbose) console.log("Getting all public file paths...");
    const publicFiles = readFolder(PATHS.PUBLIC);
    if (args.verbose) console.log(`found ${publicFiles.length} files`);
    publicFiles.forEach(filePath =>
        copyFile(filePath, filePath.replace(PATHS.PUBLIC, PATHS.OUT))
    );

    console.log(`Site generated at "/${config.out}"`);
};
