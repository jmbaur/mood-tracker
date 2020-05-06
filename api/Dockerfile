FROM golang:latest

# if left blank app will run with dev settings
# to build production image run:
# $ docker build ./api --build-args app_env=production
# ARG app_env
# ENV APP_ENV $app_env

# ENV GOCACHE /tmp
RUN mkdir $GOPATH/src/app
ADD . $GOPATH/src/app/
WORKDIR $GOPATH/src/app
RUN go mod download
RUN go build -o api .

# RUN adduser -S -D -H -h $GOPATH/src/app appuser
# USER 9000

CMD go get github.com/pilu/fresh && \
	fresh;

# if dev setting will use pilu/fresh for code reloading via docker-compose volume sharing with local machine
# if production setting will build binary
# CMD if [ ${APP_ENV} = production  ]; \
# 	then \
# 	api; \
# 	else \
# 	go get github.com/pilu/fresh && \
# 	fresh; \
# 	fi
	
EXPOSE 8000
