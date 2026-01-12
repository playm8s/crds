# crds

playm8s crds

Programmatically downloading latest CRDs:

```bash
curl -SsL https://github.com/playm8s/crds/releases/latest/download/crds.tar | tar xvf -
```

***types***

```bash
echo "@playm8s:registry=https://npm.pkg.github.com/" | tee -a .npmrc
npm add --save @playm8s/crds@latest
```
