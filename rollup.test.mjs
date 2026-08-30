import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/testable.ts",
  output: { file: "test/lib.mjs", format: "es" },
  plugins: [resolve(), typescript({ tsconfig: "./tsconfig.json", noEmit: false, outputToFilesystem: true })]
};
