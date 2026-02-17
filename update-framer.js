const { connect } = require("framer-api");

async function updateFramerPage() {
  const projectUrl = "https://framer.com/projects/GCG--v9UQvXswg7VBTLQFdr1X-8i9uz";
  const apiKey = process.env.FRAMER_API_KEY || "3a7ef1ce-8e56-440d-b05f-016e295357b0";

  console.log("Connecting to Framer project...");

  try {
    const framer = await connect(projectUrl, apiKey);

    // Get project info
    const projectInfo = await framer.getProjectInfo();
    console.log(`Connected to project: ${projectInfo.name}`);

    // List available methods
    console.log("\nAvailable methods:", Object.keys(framer).filter(k => typeof framer[k] === 'function'));

    // Get pages/nodes if available
    if (framer.getPages) {
      const pages = await framer.getPages();
      console.log("\nPages:", pages);
    }

    // Get changed paths
    const changes = await framer.getChangedPaths();
    console.log("\nChanged paths:", changes);

    await framer.disconnect();
    console.log("\nDisconnected successfully");

  } catch (error) {
    console.error("Error:", error.message);
    console.error("Full error:", error);
  }
}

updateFramerPage();
