FROM node:22.14-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json turbo.json tsconfig.json ./

COPY apps ./apps
COPY packages ./packages

# Install dependencies
RUN npm install
# Can you add a script to the global package.json that does this?
RUN cd packages/db && npx prisma generate && npx tsc -b && cd ../..

# Can you filter the build down to just one app?
RUN npm run build


CMD ["npm", "run", "start-user-app"]