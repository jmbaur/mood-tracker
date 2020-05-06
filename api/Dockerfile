FROM golang:alpine

RUN mkdir $GOPATH/src/api
ADD . $GOPATH/src/api/
WORKDIR $GOPATH/src/api
RUN go mod download
RUN go build -o api .

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
