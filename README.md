## Development Environment Setup

1. Install Node.js (v16 or later): https://nodejs.org/

2. Install pnpm:

   ```
   npm install -g pnpm
   ```

3. Install Docker: https://docs.docker.com/get-docker/

4. Install dependencies:

   ```
   pnpm install
   ```

5. Start Docker containers:

   ```
   docker-compose up --build
   ```

6. Set up environment variables:
   Create a `.env` file in the project root (adjust as needed):

   ```
   DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/aliexpress-db?schema=public"
   SUPABASE_URL=https://jqmchpvijyohpdincoom.supabase.co
   SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxbWNocHZpanlvaHBkaW5jb29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzNzIxOTUsImV4cCI6MjAzODk0ODE5NX0.eU6pi3Cydw8hAi*-oJp8WHCYnYtfZuHjFSLfpNfFtDA
   STRIPE_PK_KEY=pk_test_omlXjzDjv5JiiZriL2q7XT3d00PisYvFQu
   STRIPE_SK_KEY=sk_test_OdhcxJOodiL864hUbQXsmXWO002jY45IkF
   ```

7. Initialize the database:

```
npx prisma run generate
npx prisma migrate dev
```

8. Start the development server:

```
pnpm run start
```

9. Access the app at `http://localhost:3000`
