# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## basic folder structure

my-react-app/
├── public/                 # Static assets (favicons, robots.txt)
├── src/                    # Main application source code
│   ├── assets/             # Images, fonts, and global icons
│   ├── components/         # Reusable, global UI components
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.css
│   │   └── Navbar/
│   ├── context/            # Global state management files
│   ├── hooks/              # Custom React hooks (e.g., useAuth.js)
│   ├── pages/              # Main view screens/routes of your app
│   │   ├── Home/
│   │   └── Profile/
│   ├── services/           # API calls and network configurations
│   ├── utils/              # Helper functions and formatters
│   ├── App.jsx             # Root component
│   └── main.jsx            # Application entry point
├── .gitignore              # Files to ignore in Git
├── index.html              # Core HTML file
├── package.json            # Project dependencies and scripts
└── vite.config.js          # Build configuration tool
