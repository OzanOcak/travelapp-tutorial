## initializing prisma

First we need add prisma as a dependency. Prisma is an ORM helps to scale database connection

```console
yarn add -D prisma
npx prisma init
```

then we need initialize prisma CLI, it will create a folder named as prisma and schema.prisma file inside, we will define connection to PostgreSQL database and data models within the file.

- @default(cuid()) : attribute that sets a default CUID value to it, so we don't need to set the id value ourselves when we create records, and it makes sure each record has a unique id value.

## install prisma client

prisma client is like query builder generating javascript code tailored to data models.

```console
yarn add @prisma/client
npx prisma generate
```

when we generate prisma, we can name initial migration as init then it will create sql file under prisma/migration folder

```console
npx prisma studio
```

this will run the web app on browser at http://localhost/5555 and we can add row on the browser into database
