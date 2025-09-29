import { build } from "esbuild"

const isProd = process.env.NODE_ENV === "production"

await build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/my-form.js",
  bundle: true,
  format: "esm",
  jsx: "automatic",
  target: ["esnext"],
  sourcemap: !isProd,
  minify: isProd,
  loader: { ".css": "text" }
})
