# Dockerfile Builder

This is a simple UI for creating Dockerfiles. It was built at a hackathon so please ignore the quality of the code. On day I might have time to rebuild it nicely with gulp + webpack + modules etc.


### Features

- Autocomplete `FROM` base images from [Docker Hub](https://hub.docker.com/)
- Direct download
- Save as [Gist](https://gist.github.com/)

### TODO

- [ ] Top
  - [ ] `FROM`
    - [x] Add
    - [x] Select2 Autocomplete
  - [ ] `MAINTAINER`
    - [x] Add
    - [ ] Styling
  - [ ] `LABEL`
    - [x] Add
    - [x] Auto-add
    - [ ] Styling

- [ ] Bottom
  - `ENTRYPOINT`
    - [x] Add
    - [x] Auto-add
    - [ ] Styling
  - `CMD`
    - [x] Add
    - [x] Auto-add
    - [ ] Styling
  - `VOLUME`
    - [x] Add
    - [x] Auto-add
    - [ ] Styling
  - `EXPOSE`
    - [x] Add
    - [x] Auto-add
    - [ ] Styling

- [ ] Main
  - [ ]`RUN`
  - [ ]`WORKDIR`
  - [ ]`ENV`
  - [ ]`ADD`
  - [ ]`COPY`

- [x] Preview
- [x] Download
- [ ] Save history locally
- [ ] Import Dockerfile (from gist only?)
- [ ] Tab auto add

- [ ] Design
  - [ ] Input Styling
  - [ ] Select2 Styling
  - [ ] Mobile view for the form


### Limitations

- `USER` and `ONBUILD` are unsupported (could be easily be added)
- `CMD`, `ENTRYPOINT`, `VOLUME` & `EXPOSE` are put at the end of the Dockerfile
- No comments
- No support for multiline label values
- Only exec form for CMD & ENTRYPOINT - no shell form


## Dockerfile Syntax

[https://docs.docker.com/v1.8/reference/builder/](https://docs.docker.com/v1.8/reference/builder/)

### All

- `FROM`
- `MAINTAINER`
- `RUN`
- `CMD`
- `LABEL`
- `EXPOSE`
- `ENV`
- `ADD`
- `COPY`
- `ENTRYPOINT`
- `VOLUME`
- `USER`
- `WORKDIR`
- `ONBUILD`


### UI

top:

- `FROM`
- `MAINTAINER`
- `LABEL`

main:
- `RUN`
- `WORKDIR`
- `ENV`
- `ADD`
- `COPY`

bottom:
- `ENTRYPOINT`
- `CMD`
- `VOLUME`
- `EXPOSE`

unsupported:

- ~~`USER`~~
- ~~`ONBUILD`~~
