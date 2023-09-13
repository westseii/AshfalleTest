import TypeDoc from "typedoc";

async function main() {
  const app = new TypeDoc.Application();

  // If you want TypeDoc to load tsconfig.json
  app.options.addReader(new TypeDoc.TSConfigReader());

  app.bootstrap({
    // TypeDoc options here
    entryPoints: ["src/**/*.ts"],
  });

  const project = app.convert();

  if (project) {
    // Project may not have converted correctly
    const outputDir = "documentation";

    // Rendered docs
    await app.generateDocs(project, outputDir);
  }
}

main().catch(console.error);
