# IDP Portal

Developer portal for the **Internal Developer Platform Demo**.

This repository contains the source code of the developer portal built with **Backstage**. It provides a self-service experience allowing developers to discover platform capabilities and provision application environments through a standardized platform API.

The portal is designed to work together with the GitOps repository:

* **internal-developer-platform-demo** → Platform infrastructure (Kubernetes, Argo CD, Crossplane, Observability)
* **idp-portal** → Developer Portal (Backstage)

---

## Project Goals

The objective of this project is to demonstrate how a modern Platform Engineering team can provide a developer self-service experience built on top of Kubernetes and GitOps.

Ultimately, developers will be able to:

* Browse the Software Catalog
* Create a new application using Backstage Scaffolder
* Provision application environments through the platform API (`XApp`)
* Observe deployed workloads
* Follow the GitOps workflow powered by Argo CD

---

## Technology Stack

* Backstage
* Kubernetes
* Argo CD
* Crossplane
* GitHub
* Helm

---

## Development Prerequisites

* Node.js 22 LTS (managed with nvm)
* npm
* Corepack
* Yarn
* Docker Desktop (optional for local image builds)

---

## Development

```bash
yarn install
yarn dev
```

The portal will be available at:

```
http://localhost:3000
```

---

## Roadmap

* ⏳ Customize Backstage branding
* ⏳ Configure GitHub integration
* ⏳ Configure Kubernetes plugin
* ⏳ Create the first Software Catalog
* ⏳ Build the first Scaffolder template
* ⏳ Generate `XApp` manifests
* ⏳ Integrate with the GitOps repository

---

## License

MIT

