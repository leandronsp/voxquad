app.build:
	docker compose build

app.bundle:
	docker compose run --rm app bundle install

app.run:
	docker compose up

docker.build:
	docker buildx build --platform linux/amd64 -t leandronsp/voxquad --target release .

docker.push:
	docker push leandronsp/voxquad

prod.docker.pull:
	ssh voxquad "docker pull leandronsp/voxquad"

prod.docker.run:
	ssh voxquad "docker rm -f voxquad-app"
	ssh voxquad "docker run -d --rm -p 3000:3000 --name voxquad-app leandronsp/voxquad"

prod.deploy:
	make docker.build
	make docker.push
	make prod.docker.pull
	make prod.docker.run
