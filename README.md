# A minimal Catena-X NG CI pipeline template

Project template featuring
- simple web page
- GitHub action CI pipeline
- Docker build
- Publish to GitHub container registry
- Helm chart


### CI build & publish

Edit the web page content - replace the "Hello *" message with your username.
Then push your changes to trigger the GitHub action CI pipeline.

    sed -i 's/Hello [^!<]*/Hello '$USER'/g' docs/index.html
    git commit -am "greet myself"
    git push


Wait until the action is finished (~30s). Check the status here
https://github.com/catenax-ng/product-portal-hello-helm/actions


### Pull & run the image

Download the image, start the container and check if your changes are applied.

    export IMAGE=ghcr.io/catenax-ng/product-portal-hello-helm:main
    docker pull $IMAGE
    docker run --rm -d -p 3000:8080 --name hello-helm $IMAGE
    curl -s http://localhost:3000/ | grep Hello


### cleanup

Delete unused resources

    docker stop hello-helm
    docker rmi ghcr.io/catenax-ng/product-portal-hello-helm:main

