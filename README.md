# crds

playm8s crds

***download latest crd yaml***

```bash
curl -SsL https://github.com/playm8s/crds/releases/latest/download/crds.tar | tar xvf -
```

***types***

first,

```bash
echo "@playm8s:registry=https://npm.pkg.github.com/" | tee -a .npmrc
npm add --save @playm8s/crds@latest
```

then,

```javascript
import { api as pm8s } from '@playm8s/crds';
```
