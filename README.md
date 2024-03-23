This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Database

This project uses latest version of [PostgreSQL](https://www.postgresql.org/) database via Docker container.

Before starting a container, you need to make the following changes:

1. Rename file `.env.example` to `.env`
2. Change the default password for `POSTGRES_PASSWORD` to your own
3. Modify `DATABASE_URL` from: `postgres://postgres:password@localhost:5432/dq` to `postgres://<POSTGRES_USER>:<POSTGRES_PASSWORD>@localhost:5432/<POSTGRES_DB>` if you changed the password, user, or database name.
4. In your terminal, run `docker-compose up`

#### Prisma Studio

This project uses [Prisma](https://www.prisma.io/) to manager interaction with database. If you don't want to install external client to access database, you can use their UI studio by running

```sh
npx prisma studio
```

The application should automatically open the browser window where you can manager your database.

#### Migrations

If you made any changes to `prisma/schema.prisma`, make sure to run migration, so changes are applied

```sh
npx prisma migrate dev --name <NAME_OF_MIGRATION>
```

### Starting application

First, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

