# LinkShort - Modern URL Shortener

A beautiful, modern URL shortener built with Next.js, TypeScript, and Tailwind CSS. Features user authentication, URL management, analytics, API key management, and stunning animations.

## Features

- 🔗 **URL Shortening**: Transform long URLs into short, manageable links
- 🔐 **User Authentication**: Secure JWT-based authentication with registration and login
- 📊 **Analytics**: Track clicks and analyze URL performance
- 🎨 **QR Codes**: Automatic QR code generation for every shortened URL
- 🔑 **API Keys**: Manage up to 5 API keys for third-party integrations
- 👤 **Profile Management**: Update profile information and change passwords
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ✨ **Modern Animations**: Smooth transitions and micro-interactions
- 🎯 **Production Ready**: Optimized for performance and scalability

## Tech Stack

- **Framework**: Next.js 13 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form with Zod validation
- **Notifications**: Sonner
- **State Management**: React Context API
- **Authentication**: JWT with secure cookie storage

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API server running (see API documentation)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd linkshort-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your API configuration:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | `http://localhost:5000/api` |

## API Integration

The frontend integrates with the URL shortener backend API. Key endpoints include:

- **Authentication**: Registration, login, profile management
- **URL Management**: Shorten URLs, view history, get statistics
- **API Keys**: Create, list, and revoke API keys

### Example API Usage

```javascript
// Shorten a URL
const response = await urlApi.shortenUrl('https://example.com');

// Get user's URL history
const history = await urlApi.getHistory();

// Create API key
const apiKey = await authApi.createApiKey();
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── dashboard/         # Dashboard page
│   ├── history/           # URL history page
│   ├── profile/           # Profile management
│   └── api-keys/          # API key management
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── Navbar.tsx        # Navigation component
│   └── ProtectedRoute.tsx # Route protection
├── contexts/             # React contexts
│   └── AuthContext.tsx   # Authentication context
├── lib/                  # Utility libraries
│   ├── api.ts           # Axios configuration
│   ├── auth.ts          # Authentication utilities
│   ├── url.ts           # URL management utilities
│   └── utils.ts         # General utilities
└── public/              # Static assets
```

## Features in Detail

### Authentication System
- JWT-based authentication with secure cookie storage
- Registration with email verification
- Login with email and password
- Protected routes with automatic redirection
- Profile management with password changes

### URL Management
- Instant URL shortening with validation
- Automatic QR code generation
- Click tracking and analytics
- URL history with search functionality
- Copy and share functionality

### API Key Management
- Create up to 5 API keys per user
- View creation and last usage dates
- Revoke keys when needed
- Code examples for integration

### User Experience
- Responsive design for all devices
- Loading states and error handling
- Success/error notifications
- Smooth animations and transitions
- Modern, clean interface

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Setup

For production deployment, update your environment variables:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api
```

### Deployment Platforms

This app can be deployed on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Digital Ocean App Platform**

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository or contact the development team.

---

**LinkShort** - Transform your links with style! 🚀