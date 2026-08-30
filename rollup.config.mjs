import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/energy-breakdown-card.js",
    format: "es",
    sourcemap: false,
inlineDynamicImports: true
  },
  plugins: [
    resolve(),
    typescript({ tsconfig: "./tsconfig.json", noEmit: false, declaration: false, outputToFilesystem: true }),
    terser({ format: { comments: false } })
  ]
};
