FROM node:alpine

RUN mkdir /client
ADD . /client/
WORKDIR /client
RUN npm install

CMD npm run start;

# if dev settings will use create-react start script for hot code reloading via docker-compose shared volume
# if production setting will build optimized static files and serve using http-server
# CMD if [ ${NODE_ENV} = production  ]; \
# 	then \
# 	npm install -g http-server && \
# 	npm run build && \
# 	cd build && \
# 	hs -p 3000; \
# 	else \
# 	npm run start; \
# 	fi

EXPOSE 3000
