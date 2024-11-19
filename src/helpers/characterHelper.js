import fs from "fs";
import path from "path";

const DAILY_CHAR_LIMIT = 3333;
/**
 * Manages the daily character limit.
 * Ensures tmp directory exists, removes old files, and updates today's character count.
 * @param {number} textLength - The length of the text to add.
 * @returns {boolean} - Returns true if the operation was successful, otherwise false.
 */
export const manageCharacterLimit = (textLength) => {
  try {
    const tmpDir = path.resolve("tmp");
    const today = new Date().toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)
    const charFilePath = path.resolve(tmpDir, `${today}.txt`);

    // Ensure the tmp directory exists
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir);
      console.log("Created tmp directory");
    }

    // Remove any old tracking file
    fs.readdirSync(tmpDir).forEach((file) => {
      if (file.endsWith(".txt") && file !== `${today}.txt`) {
        fs.unlinkSync(path.resolve(tmpDir, file)); // Delete old files
        console.log(`Deleted old tracking file: ${file}`);
      }
    });

    // Check existing character usage
    let usedChars = 0;
    if (fs.existsSync(charFilePath)) {
      usedChars = parseInt(fs.readFileSync(charFilePath, "utf-8"), 10);
    }

    // Check if there's enough room for the new text
    if (usedChars + textLength > DAILY_CHAR_LIMIT) {
      console.error(
        `Daily character limit exceeded! Remaining characters: ${
          DAILY_CHAR_LIMIT - usedChars
        }`
      );
      return { success: false, remainingChars: DAILY_CHAR_LIMIT - usedChars };
    }

    // Update the character count
    usedChars += textLength;
    fs.writeFileSync(charFilePath, usedChars.toString());
    console.log(`Updated character usage: ${usedChars}/${DAILY_CHAR_LIMIT}`);
    return { success: true };
  } catch (error) {
    console.error("Error managing character limit:", error);
    return { success: false, error };
  }
};
