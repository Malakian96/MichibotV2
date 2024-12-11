## Deploy on Raspberry pi

docker buildx build --platform linux/arm/v7 -t michibot .

docker save michibot > michibot.tar

scp michibot.tar ${hostname}@${ip}:/home/${hostname}/

ssh ${hostname}@${ip}

docker load < /home/${hostname}/michibot.tar

docker stop michibot

docker rm michibot

docker run -d --name michibot -p 8080:8080 \
  -e DISCORD_CLIENT_ID=${DISCORD_CLIENT_ID} \
  -e DISCORD_CLIENT_SECRET=${DISCORD_CLIENT_SECRET} \
  -e NEXTAUTH_SECRET=${NEXTAUTH_SECRET} \
  -e NEXTAUTH_URL=${NEXTAUTH_URL} \
  michibot
