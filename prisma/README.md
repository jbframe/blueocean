# Database setup

- Connect to your Postgres server
- Create a new database and take note of username and password
- Setup your .env DATABASE_URL variable to connect to your database

## Prisma
### Database schema is included and named *schema.prisma*

- After creating the database, issue the command `npx prisma db push --preview-feature` to create the database tables
- Run `npx prisma generate` after to create the client

**Your database and tables are now created together with the client for next-auth to work**