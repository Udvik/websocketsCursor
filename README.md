# 🖱️ Live Cursor App

A real-time React app where users can see each other's mouse movements using WebSockets.

## How to Run

1. **Clone the repo**

```bash
git clone https://github.com/your-username/live-cursor-app.git
cd live-cursor-app
```

2. **Install dependencies**

**Server:**

```bash
cd server
npm install
```

**Client:**

```bash
cd ../client
npm install
```

3. **Start the app**

**Start WebSocket Server:**

```bash
cd server
node index.js
```

**Start React Client:**

```bash
cd ../client
npm run dev
```

4. **Open in browser**

Go to: [http://localhost:5173](http://localhost:5173)

## Tech Stack

- React
- WebSockets
- Node.js
- Vite
- Lodash (for throttling)

## Features

- Real-time mouse tracking across users
- Username-based session identification
- Throttled updates to prevent flooding



