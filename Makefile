docker.build:
	docker buildx build --platform linux/amd64 -t leandronsp/voxquad --target release .

docker.push:
	docker push leandronsp/voxquad
