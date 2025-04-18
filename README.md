# Craftle

<img width="431" alt="Screenshot 2025-04-18 at 18 11 01" src="https://github.com/user-attachments/assets/0dd299e4-3792-4896-965d-82db7ce3a292" />

**Craftle** is a minimalist Minecraft-themed Wordle-like clone, inspired by the popular New York Times game.

## Features

- **Minimalist Theme**: A modern approach to a classic game.
- **Wordle Gameplay**: Guess a daily random crafting recipe in 6 attempts.
- **Smooth Animations**: Uses `framer-motion`.

## Technologies Used

- **Next.js**
- **TypeScript**
- **Prisma**
- **NextUI**
- **Framer Motion**
- **Custom Minecraft API**: [GitHub Repository](https://github.com/ejkorol/recipe-book) for Minecraft related data.

## Installation

1. **Clone the Repository**

```bash
git clone https://github.com/ejkorol/craftle.git
```

2. **Navigate to the Project Directory**

```bash
cd craftle
```

3. **Install Dependencies**

```bash
npm install
```

4. **Update ENV**

```env
# DATABASE
DATABASE_URL="mysql://johndoe:randompassword@localhost:3306/mydb"

# URLS
API_URL=""

# NEXT AUTH
AUTH_SECRET=""

# OAUTH GITHUB
AUTH_GITHUB_ID={CLIENT_ID}
AUTH_GITHUB_SECRET={CLIENT_SECRET}

# OAUTH GOOGLE
AUTH_GOOGLE_ID={CLIENT_ID}
AUTH_GOOGLE_SECRET={CLIENT_SECRET}
```

5. **Setup Prisma**

```bash
npx prisma migrate dev
```

```bash
npx prisma generate
```

6. **Run the Development Server**

```bash
npm run dev
```

7. **Open Your Browser**

Navigate to `http://localhost:3000` to start playing Craftle.
