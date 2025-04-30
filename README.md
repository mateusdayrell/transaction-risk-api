## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

## Helper

Generate module/service/controller

```bash
$ nest g module users
```

Generate resource

```bash
$ nest g resource users
```

## Prisma

Init prisma

```bash
$ npm i -D prisma
$ npx prisma init
$ npx prisma migrate dev --name users
$ npx prisma generate
```

Generate prisma module and service

```bash
$ nest g module prisma
$ nest g service prisma
```

## Stripe

```bash
$ stripe login
$ stripe listen --forward-to http://localhost:3001/checkout/webhook
```

## Tests

relative_path example: src\products\products.controller.spec.ts

```bash
$ npx jest relative_path
```

