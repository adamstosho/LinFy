# LinFy - Modern URL Shortener

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-13+-black.svg)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5+-green.svg)](https://mongodb.com/)

A beautiful, modern URL shortening service built with Next.js, Node.js, and MongoDB. It can help transform long URLs into short, trackable links with analytics, QR codes, and free API access.

## 📖 Table of Contents

- [What is LinFy?](#what-is-linfy)
- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Key Features](#key-features)
- [Use Cases](#use-cases)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Usage Guide](#usage-guide)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

## 🌟 What is LinFy?

LinFy is a modern, full-stack URL shortening service that helps you transform long, unwieldy URLs into short, manageable links. Whether you're sharing links on social media, creating marketing campaigns, or building applications that need URL shortening, LinFy provides a complete solution with analytics, QR codes, and API access.

### Why Choose LinFy?

- **🚀 Lightning Fast**: Generate shortened URLs instantly
- **📊 Analytics Included**: Track clicks and analyze performance
- **🎨 Beautiful UI**: Modern, responsive design
- **🔑 Free API Access**: Generate API keys for integrations
- **📱 QR Code Generation**: Every link comes with a QR code
- **🔒 Secure**: Enterprise-grade security and encryption

## ❌ The Problem

Long URLs are everywhere in our digital world, and they create several problems:

- **Social Media Limitations**: Twitter's character limit, Instagram's bio restrictions
- **Professional Appearance**: Long URLs look unprofessional in presentations and documents
- **Sharing Difficulties**: Hard to remember and share verbally
- **Analytics Tracking**: No way to track who clicks your links
- **Mobile Experience**: Long URLs are difficult to type on mobile devices
- **Integration Needs**: Developers need APIs to shorten URLs programmatically

## ✅ The Solution

LinFy solves these problems by providing:

1. **Instant URL Shortening**: Transform any URL into a short, memorable link
2. **Click Analytics**: Track how many people click your links
3. **QR Code Generation**: Every shortened URL gets a QR code for easy sharing
4. **Free API Access**: Generate API keys to integrate URL shortening into your applications
5. **Professional Dashboard**: Manage all your links in one beautiful interface
6. **Mobile-First Design**: Works perfectly on all devices

## 🚀 Key Features

### 🔗 URL Shortening
- Transform any URL into a short, memorable link
- Automatic validation of URL format
- Unique 8-character codes for each link
- Instant generation with no waiting time

### 📊 Analytics & Tracking
- Real-time click tracking
- Detailed analytics for each shortened URL
- Last accessed timestamps
- IP address and user agent logging
- Site-wide metrics dashboard

### 🎨 QR Code Generation
- Automatic QR code generation for every shortened URL
- High-quality PNG format
- Downloadable QR codes
- Perfect for print materials and presentations

### 🔑 Free API Access
- Generate up to 5 API keys per user
- RESTful API for third-party integrations
- Support for both JWT tokens and API keys
- Comprehensive API documentation
- No cost for API usage

### 👤 User Management
- Secure user registration and login
- JWT-based authentication
- Profile management
- Password change functionality
- User-specific URL history

### 📱 Modern Interface
- Responsive design for all devices
- Beautiful animations and transitions
- Dark/light theme support
- Intuitive user experience
- Loading states and error handling

## 🎯 Use Cases

### For Individuals
- **Social Media Sharing**: Shorten links for Twitter, Instagram, LinkedIn
- **Personal Branding**: Create professional-looking links for your bio
- **Documentation**: Shorten URLs in presentations and documents
- **Email Marketing**: Track click-through rates in email campaigns

### For Businesses
- **Marketing Campaigns**: Track performance of marketing links
- **Customer Support**: Share short links in support tickets
- **Internal Communication**: Share resources with short, memorable links
- **Analytics**: Understand which links perform best

### For Developers
- **API Integration**: Add URL shortening to your applications
- **Webhook Support**: Integrate with existing systems
- **Custom Analytics**: Build custom dashboards using the API
- **Automation**: Automate link shortening for content management

### For Content Creators
- **YouTube Descriptions**: Shorten affiliate links and resources
- **Blog Posts**: Track which links in your content get clicked
- **Newsletter Links**: Monitor engagement in email newsletters
- **Social Media Management**: Manage multiple campaign links

## 🛠 Technology Stack

### Frontend
- **Next.js 13**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Beautiful, accessible UI components
- **Framer Motion**: Smooth animations and transitions
- **React Hook Form**: Form handling with validation
- **Zod**: Schema validation
- **Axios**: HTTP client for API calls

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Token authentication
- **bcrypt**: Password hashing
- **nanoid**: Unique ID generation
- **qrcode**: QR code generation
- **Swagger**: API documentation

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Nodemon**: Development server with auto-restart
- **Git**: Version control

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local installation or cloud service)
- **Git** (for cloning the repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/linfy.git
   cd linfy
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Create environment variables for backend**
   ```bash
   # Create .env file in backend directory
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   DATABASE_URI=mongodb://localhost:27017/urlshortener
   JWT_SECRET=your_super_secret_jwt_key_here
   BASE_URL=http://localhost:5000
   PORT=5000
   NODE_ENV=development
   ```

4. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Create environment variables for frontend**
   ```bash
   # Create .env.local file in frontend directory
   cp .env.example .env.local
   ```
   
   Update the `.env.local` file:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will be available at `http://localhost:5000`

2. **Start the frontend (in a new terminal)**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`

3. **Access the application**
   - Open your browser and go to `http://localhost:3000`
   - Register a new account or sign in
   - Start shortening URLs!

### Database Setup

If you're using a local MongoDB installation:

1. **Install MongoDB** (if not already installed)
   - [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)

2. **Start MongoDB service**
   ```bash
   # On macOS/Linux
   sudo systemctl start mongod
   
   # On Windows
   net start MongoDB
   ```

3. **Verify connection**
   The application will automatically create the database and collections when you first run it.

## 📚 API Documentation

### Interactive Documentation

Access the interactive API documentation:
- **Local Development**: `http://localhost:5000/api-docs`
- **Production**: `https://your-deployed-domain.com/api-docs`

### Authentication

LinFy supports two authentication methods:

#### 1. JWT Token Authentication
```bash
# Login to get a JWT token
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "yourpassword"
}

# Use the token in subsequent requests
Authorization: Bearer <your_jwt_token>
```

#### 2. API Key Authentication
```bash
# Generate an API key from the web interface
# Then use it in requests
x-api-key: <your_api_key>
```

### Core Endpoints

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/auth/register` | POST | Register new user | No |
| `/auth/login` | POST | Login user | No |
| `/auth/me` | GET | Get user profile | JWT |
| `/auth/api-keys` | GET | List API keys | JWT |
| `/auth/api-keys` | POST | Generate API key | JWT |
| `/auth/api-keys/{id}` | DELETE | Revoke API key | JWT |
| `/shorten` | POST | Shorten URL | JWT or API Key |
| `/history` | GET | Get user's URLs | JWT or API Key |
| `/stats/{code}` | GET | Get URL statistics | JWT or API Key |
| `/{code}` | GET | Redirect to original URL | No |
| `/metrics` | GET | Get site metrics | No |

### Example API Usage

#### Shorten a URL
```bash
curl -X POST http://localhost:5000/api/shorten \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"originalUrl": "https://example.com/very-long-url"}'
```

#### Using API Key
```bash
curl -X POST http://localhost:5000/api/shorten \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"originalUrl": "https://example.com/very-long-url"}'
```

#### Get URL History
```bash
curl -X GET http://localhost:5000/api/history \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📖 Usage Guide

### For End Users

#### 1. Getting Started
1. Visit the application at `http://localhost:3000`
2. Click "Get Started Free" to create an account
3. Fill in your name, email, and password
4. Verify your email (if required)
5. You're ready to start shortening URLs!

#### 2. Shortening Your First URL
1. After logging in, you'll see the dashboard
2. Enter any long URL in the input field
3. Click "Shorten URL"
4. Your shortened URL will be generated instantly
5. Copy the short link and share it!

#### 3. Managing Your Links
- **Dashboard**: View recent URLs and create new ones
- **History**: See all your shortened URLs with analytics
- **Profile**: Update your account information
- **API Keys**: Generate API keys for integrations

#### 4. Understanding Analytics
- **Click Count**: See how many times each link was clicked
- **Creation Date**: When the link was created
- **Last Accessed**: When the link was last clicked
- **QR Code**: Download QR codes for offline sharing

### For Developers

#### 1. API Key Generation
1. Login to your account
2. Navigate to "API Keys" in the menu
3. Click "Create API Key"
4. Copy the generated key (it's only shown once!)
5. Use the key in your applications

#### 2. Integration Examples

**JavaScript/Node.js:**
```javascript
const axios = require('axios');

const shortenUrl = async (longUrl) => {
  try {
    const response = await axios.post('http://localhost:5000/api/shorten', {
      originalUrl: longUrl
    }, {
      headers: {
        'x-api-key': 'YOUR_API_KEY',
        'Content-Type': 'application/json'
      }
    });
    return response.data.data.shortUrl;
  } catch (error) {
    console.error('Error shortening URL:', error);
  }
};
```

**Python:**
```python
import requests

def shorten_url(long_url, api_key):
    response = requests.post(
        'http://localhost:5000/api/shorten',
        headers={
            'x-api-key': api_key,
            'Content-Type': 'application/json'
        },
        json={'originalUrl': long_url}
    )
    return response.json()['data']['shortUrl']
```

**PHP:**
```php
function shortenUrl($longUrl, $apiKey) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'http://localhost:5000/api/shorten');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['originalUrl' => $longUrl]));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'x-api-key: ' . $apiKey,
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true)['data']['shortUrl'];
}
```

## 🚀 Deployment

### Backend Deployment

#### Deploy to Render (Recommended)
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set the following environment variables:
   ```
   DATABASE_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   BASE_URL=https://your-app-name.onrender.com
   NODE_ENV=production
   ```
4. Deploy!

#### Deploy to Heroku
1. Install Heroku CLI
2. Create a new Heroku app
3. Set environment variables:
   ```bash
   heroku config:set DATABASE_URI=your_mongodb_connection_string
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set BASE_URL=https://your-app-name.herokuapp.com
   heroku config:set NODE_ENV=production
   ```
4. Deploy:
   ```bash
   git push heroku main
   ```

### Frontend Deployment

#### Deploy to Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-domain.com/api
   ```
3. Deploy automatically!

#### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `out`
4. Set environment variables
5. Deploy!

### Environment Variables

#### Backend (.env)
```env
DATABASE_URI=mongodb://localhost:27017/urlshortener
JWT_SECRET=your_super_secret_jwt_key_here
BASE_URL=http://localhost:5000
PORT=5000
NODE_ENV=development
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

```
## **Preview [Screenshots]**

**Below are the interfaces of the app**

![screenshot](/frontend/public/screenshots/Screenshot%20(65).png)
Landing page Hero Section (updating based on the number of url shorted so far,  number of clicks and subscribers)
![screenshot](/frontend/public/screenshots/Screenshot%20(66).png)
Landing page Feature Section
![screenshot](/frontend/public/screenshots/Screenshot%20(67).png)
Landing page Section....
![screenshot](/frontend/public/screenshots/Screenshot%20(68).png)
Registration Page
![screenshot](/frontend/public/screenshots/Screenshot%20(69).png)
Login Page
![screenshot](/frontend/public/screenshots/Screenshot%20(70).png)
This is the dashboard (it is the first page to show immediately the user register/login)
![screenshot](/frontend/public/screenshots/Screenshot%20(71).png)
Here is the history page (where the user can get the logs of shortened URL)
![screenshot](/frontend/public/screenshots/Screenshot%20(72).png)
Profile page (where the details of the registered users can be changed/updated)
![screenshot](/frontend/public/screenshots/Screenshot%20(73).png)
API-Keys generation page (where one can generate API-Keys for free use), along with the documentation for usage
![screenshot](/frontend/public/screenshots/Screenshot%20(74).png)
Generated API-keys modal (popped up after the generation button is clicked)
![screenshot](/frontend/public/screenshots/Screenshot%20(75).png)
The popped up modal supports the actions outlined there.
```
## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started with Development

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/linfy.git
   cd linfy
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```

5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**

### Development Guidelines

- **Code Style**: Follow the existing ESLint and Prettier configuration
- **Testing**: Add tests for new features and bug fixes
- **Documentation**: Update README and API docs for new features
- **Commits**: Use conventional commit messages
- **Issues**: Report bugs and request features through GitHub Issues

### Project Structure

```
linfy/
├── backend/                 # Node.js/Express API
│   ├── config/             # Configuration files
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── frontend/               # Next.js application
│   ├── app/                # Pages and layouts
│   ├── components/         # Reusable UI components
│   ├── contexts/           # React contexts
│   ├── lib/                # Utility functions
│   └── public/             # Static assets
├── README.md               # This file
└── LICENSE                 # MIT License
```

## 🆘 Support

### Getting Help

If you need help with LinFy:

1. **Check the Documentation**: This README and API docs
2. **Search Issues**: Look for similar problems in GitHub Issues
3. **Create an Issue**: Report bugs or request features
4. **Contact Us**: Reach out through GitHub Discussions

### Common Issues

#### Backend Issues
- **MongoDB Connection**: Ensure MongoDB is running and accessible
- **Port Conflicts**: Change the PORT in .env if 5000 is in use
- **JWT Errors**: Verify JWT_SECRET is set correctly

#### Frontend Issues
- **API Connection**: Check NEXT_PUBLIC_API_BASE_URL in .env.local
- **Build Errors**: Ensure all dependencies are installed
- **Authentication**: Clear browser cookies if login issues persist

#### API Issues
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Authentication**: Ensure valid JWT token or API key
- **URL Validation**: URLs must be properly formatted

### Reporting Bugs

When reporting bugs, please include:

1. **Environment**: OS, Node.js version, browser
2. **Steps to Reproduce**: Detailed steps to trigger the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Screenshots**: If applicable
6. **Console Logs**: Any error messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **shadcn/ui**: For the beautiful UI components
- **Tailwind CSS**: For the utility-first CSS framework
- **MongoDB**: For the flexible database solution
- **Express.js**: For the robust web framework
- **Open Source Community**: For all the amazing tools and libraries

---

**Made with ❤️ by ART_Redox from DLT Africa**

If you find this project helpful, please give it a ⭐ on GitHub! 