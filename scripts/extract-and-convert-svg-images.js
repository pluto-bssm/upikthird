/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const svgDir = path.join(__dirname, "..", "public", "svg");
const outImageDir = path.join(svgDir, "images");
if (!fs.existsSync(outImageDir)) fs.mkdirSync(outImageDir, { recursive: true });

// List of SVG filenames to handle (the large ones identified)
const svgs = [
  "Domitory.svg",
  "MakeSchool.svg",
  "Humor.svg",
  "Humors.svg",
  "School.svg",
];

function toComponentName(name) {
  return path.basename(name, path.extname(name));
}

function jsxify(svgText) {
  // Basic replacements to make the SVG JSX-friendly
  let out = svgText
    .replace(/xmlns:xlink="[^"]+"/g, "")
    .replace(/xlink:href=/g, "href=")
    .replace(/clip-path=/g, "clipPath=")
    .replace(/stroke-width=/g, "strokeWidth=")
    .replace(/stroke-linecap=/g, "strokeLinecap=")
    .replace(/stroke-linejoin=/g, "strokeLinejoin=")
    .replace(/fill-rule=/g, "fillRule=")
    .replace(/vector-effect=/g, "vectorEffect=")
    .replace(/class=/g, "className=");
  return out;
}

svgs.forEach((file) => {
  const svgPath = path.join(svgDir, file);
  if (!fs.existsSync(svgPath)) {
    console.log("SKIP (not found):", file);
    return;
  }
  let svg = fs.readFileSync(svgPath, "utf8");

  // Find data:image/png;base64,...
  const dataUriMatch = svg.match(
    /data:image\/png;base64,([A-Za-z0-9+/=\n\r]+)/,
  );
  if (dataUriMatch) {
    const b64 = dataUriMatch[1].replace(/\s+/g, "");
    const imgName = toComponentName(file) + ".png";
    const imgPath = path.join(outImageDir, imgName);
    fs.writeFileSync(imgPath, Buffer.from(b64, "base64"));
    console.log("WROTE IMAGE:", imgPath);

    // Replace the data URI in the SVG with a reference to the image file
    svg = svg.replace(
      /xlink:href="data:image\/png;base64,[^"]+"/,
      `href="/svg/images/${imgName}"`,
    );
  } else {
    console.log("No data-uri found in", file);
  }

  // Convert to JSX-friendly SVG
  let jsxSvg = jsxify(svg);

  // Remove xml prolog if present
  jsxSvg = jsxSvg.replace(/<\?xml[^>]*>\s*/, "");

  // Build TSX component text using Back.tsx style
  const compName = toComponentName(file);
  const tsx = `type BackProps = { width: string; height: string; onClick?: () => void }\n\nconst ${compName} = ({ width, height, onClick }: BackProps) => (\n  ${jsxSvg.trim()}\n)\n\nexport default ${compName}\n`;

  const outTsxPath = path.join(svgDir, compName + ".tsx");
  fs.writeFileSync(outTsxPath, tsx, "utf8");
  console.log("WROTE TSX:", outTsxPath);
});

console.log("Done.");
