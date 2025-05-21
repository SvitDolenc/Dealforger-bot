// Import necessary modules
import fetch from "node-fetch";
import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import cron from "node-cron";
// Convert import.meta.url to a file path
const responseFilePath = path.join("previousResponse.json");

// Main function to check item availability
async function checkItemAvailability() {
  // Fetch the website content
  const url = process.env.ITEM_URL;
  const response = await fetch(url);
  const body = await response.json();

  let found = false;

  // Load the previous response
  let previousResponse = [];
  try {
    const data = await fs.readFile(responseFilePath, "utf-8");
    previousResponse = JSON.parse(data);
  } catch (error) {
    console.log("No previous response found, assuming first run.");
  }

  // Find new items
  const newItems = body.filter(
    (item) => !previousResponse.some((prevItem) => prevItem.asin === item.asin)
  );

  // Prepare the message
  let message = "";
  if (newItems.length > 0) {
    found = true;
    newItems.forEach((item) => {
      message += `New item found: ${item.title} at price €${(
        item.usedprice / 100
      ).toFixed(2)}. Link: https://www.amazon.de/dp/${item.asin}\n`;
    });
  } else {
    console.log("No new items found.");
  }
  // Save the current response for future comparison
  await fs.writeFile(responseFilePath, JSON.stringify(body, null, 2));

  // Log for debugging in a single line
  console.log(
    `Time: ${new Date().toISOString()}, Found: ${found}, Message: ${message}`
  );

  // Decouple shouldSend logic
  let shouldSend = false;
  if (found) {
    shouldSend = true;
  }

  if (shouldSend) {
    console.log("Sending message to Discord:", message);
    // Send to Discord
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL; // Add your Discord webhook URL to your .env file
    const payload = {
      content: message,
    };
    await fetch(discordWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }
}

console.log("Starting...");
// Execute the function

cron.schedule("*/30 * * * *", () => {
  console.log("Running scheduled task...");
  checkItemAvailability().catch(console.error);
});
