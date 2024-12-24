import textToSpeech from "@google-cloud/text-to-speech";
import { google } from "@google-cloud/text-to-speech/build/protos/protos";
import fs from "fs";
import path from "path";

export const createTTS = async (
  request: google.cloud.texttospeech.v1.ISynthesizeSpeechRequest | object,
) => {
  // Initialize Google Cloud Text-to-Speech client
  const client = new textToSpeech.TextToSpeechClient();
  // Perform the TTS request
  const [response] = await client.synthesizeSpeech(request);

  const ttsFilePath = path.resolve("assets", "tts-output.mp3");
  // Check if the file already exists and delete it if it does
  if (fs.existsSync(ttsFilePath)) {
    fs.unlinkSync(ttsFilePath); // Delete the existing file
    console.log("Existing file deleted: assets/tts-output.mp3");
  }

  fs.writeFileSync(ttsFilePath, response.audioContent, "binary");
  console.log("Audio content written to file: tts-output.mp3");
};
