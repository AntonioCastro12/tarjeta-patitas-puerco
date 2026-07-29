import { cp, readdir } from "node:fs/promises";
import { join } from "node:path";

const clientDirectory = join(process.cwd(), "dist", "client");
const outputDirectory = join(process.cwd(), "dist");
const entries = await readdir(clientDirectory);

await Promise.all(
  entries.map((entry) =>
    cp(join(clientDirectory, entry), join(outputDirectory, entry), {
      recursive: true,
      force: true,
    }),
  ),
);
