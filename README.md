# SmartSeason Field Monitoring System

SmartSeason is a field operations and monitoring platform for agricultural teams. It allows administrators to manage agents, register fields, assign supervisors and assistants, track field progress, and review operational analytics from one dashboard.

Live deployment: https://smart-field.vercel.app/

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- NextAuth with credentials-based authentication
- Prisma ORM
- PostgreSQL
- Nodemailer for invitation emails
- Cloudinary for profile image uploads

## Features

- Admin and agent role separation
- Agent invitation and activation flow
- Field registration and assignment
- Field update timeline with stage tracking
- Profile management with image upload
- Dashboard and analytics views
- Responsive layout for desktop and mobile devices

## Setup Instructions

### 1. Clone and install dependencies

```bash
git clone <your-repo-url>
cd smartseason-field-monitoring-system
npm install
```

### 2. Configure environment variables

Create a `.env` or `.env.local` file in the project root and add the variables your environment needs:

```env
DATABASE_URL="your_postgres_connection_string"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"

SMTP_HOST="your_smtp_host"
SMTP_PORT="your_smtp_port"
SMTP_USER="your_smtp_user"
SMTP_PASS="your_smtp_password"
SMTP_FROM="your_sender_name_and_email"

CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

Notes:

- `DATABASE_URL` should point to a PostgreSQL database.
- Email settings are required for agent invitation and activation links.
- Cloudinary settings are required for profile image uploads.

### 3. Run Prisma migrations

```bash
npx prisma migrate deploy
```

For local development, you can also use:

```bash
npx prisma migrate dev
```

### 4. Seed demo data

```bash
npx prisma db seed
```

### 5. Start the development server

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Demo Credentials

These demo accounts are created by the seed script:

- Admin
  Email: `smartseason@gmail.com`
  Password: `AdminSmart123!`

- Agent
  Email: `berrinbendy@gmail.com`
  Password: `123456789`

## Design Decisions

- App Router with server-first pages:
  Most route pages are implemented as server components so data can be fetched close to the database while interactive pieces like the sidebar, header, and assignment controls stay client-side.

- Role-based access control:
  The app separates admin and agent experiences. Admins manage users and assignments, while agents are limited to their assigned fields.

- Credentials authentication with NextAuth:
  This keeps login simple for the assignment requirements while still allowing session handling and route protection.

- Prisma as the data layer:
  Prisma makes the field, user, and update relationships explicit and easy to maintain.

- Invitation-based onboarding:
  Agents can be pre-registered by an admin, then activate their own account through an emailed token.

- Two-role field assignment model:
  Each field supports a supervisor and an assistant to reflect real operational workflows instead of a single-owner model.

- Practical UI over heavy abstraction:
  The UI leans on reusable layout patterns and global styles, but many screens keep their presentation logic close to the page for faster iteration.

## Assumptions Made

- An administrator is responsible for creating agents and fields before field activity begins.
- Agents only need credentials-based sign-in for this version of the app.
- Each field can have at most one supervisor and one assistant at a time.
- The system does not yet model geospatial mapping data beyond basic field naming and display metadata.
- SMTP and Cloudinary services are available in the target environment when invitation emails and image uploads are needed.
- Seeded credentials are acceptable for demo and evaluation purposes, but should be replaced in production.

## Project Structure

```text
src/
  app/                App Router pages and API routes
  components/         Reusable UI components
  lib/                Auth, Prisma, server actions, utilities
prisma/
  schema.prisma       Database schema
  seed.js             Demo seed data
```

## Useful Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
npx prisma migrate dev
npx prisma db seed
```

## Notes

- The seed script clears existing users, fields, and updates before inserting demo data.
- The current implementation uses seeded/demo credentials for evaluation convenience.
- For production use, secrets should be rotated and stored securely, and demo credentials should be removed.
