import { build } from "esbuild"

const isProd = process.env.NODE_ENV === "production"

await build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/wc-form-bundle.js",
  bundle: true,
  format: "esm",
  target: ["es2022"],
  sourcemap: !isProd,
  minify: isProd,
  loader: { ".css": "text" }
})
