# Catena-X Frontend Registration

This repository contains the frontend code for the Catena-X Frontend Registration.

The Catena-X Portal application consists of

* [portal-frontend](https://github.com/eclipse-tractusx/portal-frontend),
* [portal-frontend-registration](https://github.com/eclipse-tractusx/portal-frontend-registration),
* [portal-assets](https://github.com/eclipse-tractusx/portal-assets) and
* [portal-backend](https://github.com/eclipse-tractusx/portal-backend).

![Tag](https://img.shields.io/static/v1?label=&message=LeadingRepository&color=green&style=flat) The helm chart for installing the Catena-X Portal is available in the [portal](https://github.com/eclipse-tractusx/portal) repository.

The Catena-X Portal is designed to work with the [Catena-X IAM](https://github.com/eclipse-tractusx/portal-iam).

## Local build & run

Run the application on your machine on http://localhost:3002/registration/

Note: if you'd like to run the complete frontend application, follow the 'Run frontend on localhost' guide available within the developer documentation of [portal-assets](https://github.com/eclipse-tractusx/portal-assets).

    yarn
    yarn build
    yarn start

## Notice for Docker image

This application provides container images for demonstration purposes.

DockerHub: https://hub.docker.com/r/tractusx/portal-frontend-registration

Base image: nginxinc/nginx-unprivileged:alpine

* Dockerfile: [nginxinc/nginx-unprivileged:alpine](https://github.com/nginxinc/docker-nginx-unprivileged/blob/main/Dockerfile-alpine.template)
* GitHub project: [https://github.com/nginxinc/docker-nginx-unprivileged](https://github.com/nginxinc/docker-nginx-unprivileged)
* DockerHub: [https://hub.docker.com/r/nginxinc/nginx-unprivileged](https://hub.docker.com/r/nginxinc/nginx-unprivileged)

## License

Distributed under the Apache 2.0 License.
See [LICENSE](./LICENSE) for more information.
