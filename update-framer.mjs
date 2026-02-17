import { connect } from "framer-api";
import { readFileSync } from "fs";

// Configuration
const CONFIG = {
  projectUrl: "https://framer.com/projects/GCG--v9UQvXswg7VBTLQFdr1X-8i9uz",
  apiKey: "3a7ef1ce-8e56-440d-b05f-016e295357b0",
  pageNodeId: "Xe878dnHC",        // /page
  desktopNodeId: "MlCI5JDag",     // Desktop breakpoint
  embedNodeId: "qe2Z5r3kb",       // HTML Embed
};

async function updateHomepage(htmlPath, options = {}) {
  const { publish = false, dryRun = false } = options;

  console.log("🔌 Connecting to Framer project...");

  try {
    const framer = await connect(CONFIG.projectUrl, CONFIG.apiKey);
    const projectInfo = await framer.getProjectInfo();
    console.log(`✅ Connected to: ${projectInfo.name}`);

    // Read HTML file
    console.log(`\n📄 Reading HTML from: ${htmlPath}`);
    const htmlContent = readFileSync(htmlPath, "utf-8");
    console.log(`   Size: ${(htmlContent.length / 1024).toFixed(1)}KB`);

    // Get current embed node
    const embedNode = await framer.getNode(CONFIG.embedNodeId);
    console.log(`\n📦 Current embed width: ${embedNode.width}`);

    if (dryRun) {
      console.log("\n🔍 DRY RUN - No changes will be made");
      console.log("HTML preview (first 500 chars):");
      console.log(htmlContent.substring(0, 500) + "...");
      await framer.disconnect();
      return;
    }

    // Update embed with new HTML
    console.log("\n🔄 Updating embed content...");

    // The embed uses setControlAttributes to update its controls
    if (embedNode.setControlAttributes) {
      await embedNode.setControlAttributes({
        type: "html",
        html: htmlContent,
        url: htmlPath
      });
      console.log("✅ Embed HTML updated via setControlAttributes");
    } else {
      // Fallback: try setAttributes with controls
      console.log("Trying setAttributes...");
      await embedNode.setAttributes({
        controls: {
          type: "html",
          html: htmlContent,
          url: htmlPath
        }
      });
      console.log("✅ Embed HTML updated via setAttributes");
    }

    // Check changes
    const changes = await framer.getChangedPaths();
    console.log(`\n📝 Modified paths: ${changes.modified.join(", ") || "none"}`);

    // Publish if requested
    if (publish && changes.modified.length > 0) {
      console.log("\n🚀 Publishing changes...");
      const result = await framer.publish();
      console.log("✅ Published!", result);
    }

    await framer.disconnect();
    console.log("\n✅ Done!");

  } catch (error) {
    console.error("\n❌ Error:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// CLI usage
const args = process.argv.slice(2);
const nonFlagArgs = args.filter(a => !a.startsWith("--"));
const htmlPath = nonFlagArgs[0] || "/Users/ericcoffie/govcon-funnels/homepage-for-framer-final.html";
const shouldPublish = args.includes("--publish");
const dryRun = args.includes("--dry-run");

console.log("=== Framer Homepage Updater ===\n");
console.log(`HTML file: ${htmlPath}`);
console.log(`Publish: ${shouldPublish}`);
console.log(`Dry run: ${dryRun}`);
console.log("");

updateHomepage(htmlPath, { publish: shouldPublish, dryRun });
