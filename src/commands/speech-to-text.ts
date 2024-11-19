// npm install assemblyai

import { AssemblyAI } from 'assemblyai'

const client = new AssemblyAI({
  apiKey: "e2def5803b144879b486b443d3bb8a3b"
})

const audioUrl =
  'https://assembly.ai/sports_injuries.mp3'

const config = {
  audio_url: audioUrl
}

export const run = async () => {
  const transcript = await client.transcripts.transcribe(config)
  console.log(transcript.text)
  return transcript
}

run()