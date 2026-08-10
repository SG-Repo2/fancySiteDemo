import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const toolsDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(toolsDirectory, "..");
const pluginDirectory = path.join(projectDirectory, "wordpress", "hydrou-preview");
const assetsDirectory = path.join(pluginDirectory, "assets");
const imageDirectory = path.join(assetsDirectory, "img");
const templatesDirectory = path.join(pluginDirectory, "templates");

fs.mkdirSync(imageDirectory, { recursive: true });
fs.mkdirSync(templatesDirectory, { recursive: true });

function splitSelectorList(input) {
  const selectors = [];
  let current = "";
  let parentheses = 0;
  let brackets = 0;
  let quote = "";

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    const previous = input[index - 1];

    if (quote) {
      current += character;
      if (character === quote && previous !== "\\") quote = "";
      continue;
    }

    if (character === '"' || character === "'") {
      quote = character;
      current += character;
    } else if (character === "(") {
      parentheses += 1;
      current += character;
    } else if (character === ")") {
      parentheses -= 1;
      current += character;
    } else if (character === "[") {
      brackets += 1;
      current += character;
    } else if (character === "]") {
      brackets -= 1;
      current += character;
    } else if (character === "," && parentheses === 0 && brackets === 0) {
      selectors.push(current);
      current = "";
    } else {
      current += character;
    }
  }

  selectors.push(current);
  return selectors;
}

function scopeSelector(selector) {
  const trimmed = selector.trim();
  if (!trimmed) return trimmed;

  if (trimmed === ":root" || trimmed === "html" || trimmed === "body" || trimmed === "#top") {
    return ".hydrou-page";
  }

  if (trimmed.startsWith("#top ")) {
    return `.hydrou-page ${trimmed.slice(5)}`;
  }

  if (trimmed.startsWith("body ")) {
    return `.hydrou-page ${trimmed.slice(5)}`;
  }

  if (trimmed.startsWith("html.hydrou-is-loading ")) {
    return `html.hydrou-is-loading .hydrou-page ${trimmed.slice("html.hydrou-is-loading ".length)}`;
  }

  if (trimmed.startsWith("html.lenis") || trimmed.startsWith(".lenis")) {
    return trimmed;
  }

  if (trimmed.startsWith(".hydrou-page")) {
    return trimmed;
  }

  return `.hydrou-page ${trimmed}`;
}

function scopeCss(css) {
  let output = "";
  let segmentStart = 0;
  let quote = "";
  let inComment = false;
  const context = [];

  for (let index = 0; index < css.length; index += 1) {
    const character = css[index];
    const next = css[index + 1];
    const previous = css[index - 1];

    if (inComment) {
      if (character === "*" && next === "/") {
        inComment = false;
        index += 1;
      }
      continue;
    }

    if (!quote && character === "/" && next === "*") {
      inComment = true;
      index += 1;
      continue;
    }

    if (quote) {
      if (character === quote && previous !== "\\") quote = "";
      continue;
    }

    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }

    if (character === "{") {
      const rawPrelude = css.slice(segmentStart, index);
      const lastComment = rawPrelude.lastIndexOf("*/");
      const leading = lastComment >= 0 ? rawPrelude.slice(0, lastComment + 2) : "";
      const prelude = (lastComment >= 0 ? rawPrelude.slice(lastComment + 2) : rawPrelude).trim();
      const parentContext = context[context.length - 1];
      let transformedPrelude = prelude;
      let nextContext = "style";

      if (/^@(?:-\w+-)?keyframes\b/i.test(prelude)) {
        nextContext = "keyframes";
      } else if (prelude.startsWith("@")) {
        nextContext = "at-rule";
      } else if (parentContext === "keyframes") {
        nextContext = "keyframe-step";
      } else {
        transformedPrelude = splitSelectorList(prelude).map(scopeSelector).join(",\n");
      }

      output += `${leading}${leading && transformedPrelude ? "\n" : ""}${transformedPrelude} {`;
      context.push(nextContext);
      segmentStart = index + 1;
    } else if (character === "}") {
      output += `${css.slice(segmentStart, index)}}`;
      context.pop();
      segmentStart = index + 1;
    }
  }

  output += css.slice(segmentStart);
  return output;
}

function stabilizeRemUnits(css) {
  return css.replace(/(-?(?:\d+|\d*\.\d+))rem\b/g, (match, value) => {
    const pixels = Number(value) * 16;
    return `${Number(pixels.toFixed(4))}px`;
  });
}

const sourceCss = fs.readFileSync(path.join(projectDirectory, "style.css"), "utf8");
const sourceHtml = fs.readFileSync(path.join(projectDirectory, "index.html"), "utf8");
const mainMatch = sourceHtml.match(/<main\b[^>]*class="hydrou-page"[^>]*>.*?<\/main>/s);

if (!mainMatch) {
  throw new Error("Could not find the HydroU main element in index.html");
}

const wordpressMain = mainMatch[0].replace(
  /src="img\/([^"]+)"/g,
  'src="<?php echo esc_url( HYDROU_PREVIEW_URL . \'assets/img/$1\' ); ?>"'
);

const wordpressTemplate = `<?php
/**
 * HydroU page template.
 *
 * The active theme supplies the site header and footer. Only the HydroU page
 * body is owned by this plugin.
 */

if ( ! defined( 'ABSPATH' ) ) {
\texit;
}

get_header();
?>
${wordpressMain}
<?php
get_footer();
`;

fs.writeFileSync(
  path.join(assetsDirectory, "hydrou.css"),
  stabilizeRemUnits(scopeCss(sourceCss))
);
fs.copyFileSync(path.join(projectDirectory, "script.js"), path.join(assetsDirectory, "hydrou.js"));
fs.writeFileSync(path.join(templatesDirectory, "hydrou-new.php"), wordpressTemplate);

for (const staleFile of [
  path.join(assetsDirectory, "preview.html"),
  path.join(assetsDirectory, "iStock-1272281703.jpg"),
  path.join(imageDirectory, "iStock-1272281703.jpg"),
  path.join(pluginDirectory, "readme.txt"),
]) {
  fs.rmSync(staleFile, { force: true });
}

const imageFiles = [
  "hero-1280.webp",
  "impel-logo.png",
  "pdf-collage-1.png",
  "pdf-collage-2.png",
  "pdf-collage-3.png",
  "pdf-collage-4.png",
  "pdf-collage-5.png",
  "pdf-collage-6.png",
  "pdf-course-2140-clean.png",
  "pdf-course-3110-clean.png",
  "pdf-course-3170-clean.png",
  "pdf-course-3345-clean.png",
  "pdf-expert-bob.png",
  "pdf-expert-mike.png",
  "pdf-hydrou-lockup.png",
  "training-background.webp",
];

for (const imageFile of imageFiles) {
  fs.copyFileSync(path.join(projectDirectory, "img", imageFile), path.join(imageDirectory, imageFile));
}

console.log(`Built WordPress plugin assets in ${pluginDirectory}`);
