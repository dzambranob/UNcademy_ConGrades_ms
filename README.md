# UNcademy_ConGrades_ms

## Start a mongo server instance
```bash
$ docker run -d -p 27017:27017 --name some-mongo
```
... where some-mongo is the name you want to assign to your container.

## Start node with the code
Run the following comands after clone the repository on your local device
```bash
$ docker build -t uncademy_congrades_ms .
$ docker run -it --rm --name my-running-app my-nodejs-app
```
