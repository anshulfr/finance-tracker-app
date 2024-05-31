# Personal Finance Tracker App

This is a full-stack application for tracking personal financial records. It's built with React, Express, and MongoDB, and uses Vite for building the frontend.

## Project Structure

The project is divided into two main directories:

- `client/`: Contains the React frontend application.
- `server/`: Contains the Express backend server.

### Client

The client application is built with React and uses the Clerk library for user authentication. The main entry point of the application is `main.jsx`.

Key directories and files:

- `src/`: Contains the source code of the application.
    - `main.jsx`: The main entry point of the application.
    - `App.jsx`: The main React component.
    - `components/`: Contains reusable components like `dark-mode-toggle.jsx`.
    - `contexts/`: Contains the React context providers like `financial-record-context.jsx`.
    - `pages/`: Contains the pages of the application like the Dashboard and Auth pages.

### Server

The server is built with Express and connects to a MongoDB database.

Key directories and files:

- `src/`: Contains the source code of the server.
    - `index.js`: The main entry point of the server.
    - `routes/`: Contains the route handlers for the application.
    - `schema/`: Contains the Mongoose schema definitions.

## Setup

1. Clone the repository.
2. Install dependencies in both the `client/` and `server/` directories with `npm install`.
3. Create a `.env.local` file in the `client/` directory and a `.env` file in the `server/` directory with the necessary environment variables.
4. Start the server with `npm run dev` in the `server/` directory.
5. Start the client with `npm run dev` in the `client/` directory.

## Usage

Once the application is running, you can navigate to `localhost:5173` in your browser to use the application.

## License

This project is licensed under the [MIT License](LICENSE).