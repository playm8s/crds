FROM docker.io/rancher/kubectl:v1.33.7

WORKDIR /work

COPY crds/*.yaml /work/
COPY entrypoint.sh /work/

ENTRYPOINT ["/bin/bash"]
CMD ["/work/entrypoint.sh"]
