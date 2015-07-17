#
# Docker File for Development using Docker-Compose
#
FROM node

#
# Create the application directory.
# * Copy package.json for `npm install` step
# * Copy dotfiles since we can't mount them in docker-compose.yml
# * Copy script folder, since it's required for `npm install`
#
RUN mkdir /app
ADD ./package.json /app/package.json
ADD ./.nodemonignore /app/.nodemonignore
ADD ./.npmrc /app/.npmrc
ADD ./.eslintrc /app/.eslintrc
ADD ./scripts /app/scripts
ADD ./gulp /app/gulp
ADD ./gulpfile.js /app/gulpfile.js
ADD ./index.js /app/index.js

#
# Install Application Dependencies
#
WORKDIR /app
RUN npm install
RUN npm install -g gulp
EXPOSE 9000
ENV DEBUG=app*
CMD ["npm", "run", "develop"]
