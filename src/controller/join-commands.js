import { join } from "../commands/join.js";
import { play } from "../commands/play.js";

export const handleJoinCommands = (oldState, newState) => {
  console.log("Old Channel ID:", oldState.channelId);
  console.log("New Channel ID:", newState.channelId);
  if (newState.channelId === null) {
    if (oldState.member.id == "1303130781580918954") return;
    console.log("user left channel", oldState.channelId);
    const connection = join(oldState.channel)
    play('sad-meow.mp3', connection, false)
  } else if (oldState.channelId === null) {
    if (newState.member.id == "1303130781580918954") return;
    console.log("user joined channel", newState.channelId);
    const connection = join(newState.channel)
    play('meow.mp3', connection, false)
  } else {
    console.log("user moved channels", oldState.channelId, newState.channelId);
  }
};

