# Opum Dating App

## 📱 Project Overview

Opum is a modern, responsive dating application built with Next.js, designed to provide a seamless and engaging user experience across mobile and desktop platforms.

## 🌟 Key Features

### User Discovery
- **Match List**: Browse potential matches with elegant, photo-centric cards
- **Advanced Filtering**: Coming soon...

### Communication
- **Real-time Messaging**: Instant chat interface
- **Smart Notifications**: Keep track of new matches and messages

## 🛠 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Geist (Sans & Mono)
- **Icons**: Lucide React

## 📦 Project Structure

```
opum/
│
├── app/
│   │   
│   ├── chats/
│   │   └── [id]/
│   |       └── page.tsx  # Individual chat page
|   ├── home/
|   |     └── page.tsx      # Discover page and main page
|   ├── login/
|   |     └── page.tsx      # Signup page
|   ├── profile/
|   |     └── page.tsx      # user starter page
|   |
|   ├── page.tsx            # signin page as the hero page
|   |     
|   |
│   └── layout.tsx        # Root layout
│
├── components/           # Reusable UI components
├── public/               # Static assets
└── styles/
    └── globals.css       # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Create a .env file same as given below 👎
```
NEXT_PUBLIC_API_KEY_FIREBASE=
NEXT_PUBLIC_AUTH_DOMAIN=
NEXT_PUBLIC_DATABASE_URL=
NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_STORAGE_BUCKET=
NEXT_PUBLIC_MESSAGING_SENDERID=
NEXT_PUBLIC_APPID=
NEXT_PUBLIC_measurementId=
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/ashiq-firoz/oppam-app.git
```

2. Install dependencies
```bash
cd oppam-app
npm install
```

3. Run the development server
```bash
npm run dev
```

## 🎨 Design Philosophy

- **Mobile-First**: Responsive design that looks great on all devices
- **Warm Color Palette**: White, Pink, and Yellow themes
- **Modern Minimalism**: Clean, intuitive interfaces

<!-- ## 🔜 Upcoming Features

- [ ] User Authentication
- [ ] Profile Creation
- [ ] Advanced Match Algorithms
- [ ] Video Calling
- [ ] Location-based Matching -->

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

