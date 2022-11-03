import path from "path";
import { fileURLToPath } from "url";

import { config } from "../config.js";
import { mergeDeep } from "./utils.js";
import { copyFile, readFile, readFolder, saveFile } from "./io.js";
import { markdown } from "./markdown.js";

const defaults = {
    in: "TEST_IN",
    out: "TEST_OUT"
};

const options = mergeDeep(defaults, config);
console.log({ options });

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const IN_DIRECTORY = path.resolve(__dirname, `../${options.in}/`);
const OUT_DIRECTORY = path.resolve(__dirname, `../${options.out}/`);

const processFile = async filePath => {
    const extension = path.extname(filePath);

    // Ignore weird files (i.e. `.DS_Store` etc.)
    if (extension === "") return;

    const copyPath = filePath.replace(IN_DIRECTORY, OUT_DIRECTORY);

    if (extension === ".md") {
        const updatePath = path.join(
            path.dirname(copyPath),
            path.basename(copyPath, path.extname(copyPath)) + ".html"
        );

        const fileContents = await readFile(filePath);
        const markdownContents = markdown.render(fileContents);
        console.log(`Writing ${updatePath}`);
        saveFile(updatePath, markdownContents);
    } else {
        console.log(`Copying ${copyPath}`);
        copyFile(filePath, copyPath);
    }
};

console.log("Getting all file paths...");
const allFiles = readFolder(IN_DIRECTORY);
console.log(`found ${allFiles.length} files`);

allFiles.forEach(filePath => processFile(filePath));
