# Computer Plus

Computer Plus is a modern, full-stack e-commerce web application built to be your one-stop shop for computer parts and peripherals. It features a robust frontend built with Next.js 16 and React 19, backed by a powerful PostgreSQL database managed through Prisma ORM.

## Key Features

- **Storefront & Catalog**: Browse products, view detailed specifications, and filter by categories.
- **Shopping Cart**: Dynamic, client-side cart management with local storage persistence.
- **User Authentication**: Secure user login and registration with hashed passwords.
- **Admin Dashboard**: Comprehensive management interface to create and manage products, categories, and users.
- **Order Management**: Seamless checkout process, order tracking, and history.
- **Image Uploads**: Integrated with UploadThing and Cloudinary for optimized media handling.
- **Responsive Design**: Beautiful, responsive, and accessible UI crafted with Tailwind CSS and Shadcn UI.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Caching**: [Upstash Redis](https://upstash.com/)
- **Media**: [UploadThing](https://uploadthing.com/) & [Cloudinary](https://cloudinary.com/)
- **Forms**: React Hook Form with Zod validation

## Prerequisites

Before running the project locally, ensure you have the following installed:
- Node.js (v20 or higher)
- pnpm (recommended package manager)
- A running PostgreSQL database instance
- Upstash Redis account
- UploadThing / Cloudinary accounts for media storage

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the necessary environment variables. You will need variables for your database connection string and API keys for UploadThing/Cloudinary.

3. **Initialize the Database**:
   ```bash
   pnpm dlx prisma generate
   pnpm dlx prisma db push
   ```

4. **Start the Development Server**:
   ```bash
   pnpm dev
   ```

5. **Open the Application**:
   Navigate to `http://localhost:3000` in your browser.

## Project Structure

- `app/`: Next.js App Router pages and API routes. Includes storefront and admin pages.
- `components/`: Reusable React components including layout, UI elements, and specific features.
- `context/`: React context providers, such as the `CartProvider` for global state management.
- `lib/`: Utility functions and third-party library configurations.
- `prisma/`: Prisma schema definition for the PostgreSQL database.
- `types/`: TypeScript type definitions and interfaces.
- `validation/`: Zod schemas for form validation and data integrity.

## License

This project is open-source and available under the MIT License.
