# Next JS has a great guide on how to delpy via docker, see here:
# https://nextjs.org/docs/deployment


###### NOTE IMAGE SIZE OPTIMIZATIONS SUGGESTED IN THE NEXT JS DOCS WERE CREATING ERRORS AND HAVE BEEN REMOVED #######

FROM node:alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . /app
RUN yarn install --frozen-lockfile
RUN yarn build
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app/.next
USER nextjs



# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
RUN npx next telemetry disable

#Build your docker iamge with cmd $ docker build . -t attendeaze

#run client with cmd $ docker run -p 3000:3000 attendeaze yarn start
#run server with cmd $ docker run -p 4000:4000 attendeaze yarn run server


