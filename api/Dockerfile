FROM golang:alpine

RUN mkdir $GOPATH/src/api
ADD . $GOPATH/src/api/
WORKDIR $GOPATH/src/api
RUN go mod download
RUN go build -o api .

CMD go get github.com/pilu/fresh && \
	fresh;

EXPOSE 8000
