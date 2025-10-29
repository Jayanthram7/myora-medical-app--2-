# Authentication Setup Guide

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
MONGODB_URI=mongodb+srv://jayanthramnithin:jrnk72004nithu@cluster0.lttav.mongodb.net/?appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000
```

## Features Implemented

### Backend
- ✅ MongoDB connection with connection pooling
- ✅ User model with password hashing using bcrypt
- ✅ JWT token generation and verification
- ✅ API routes for signup, login, logout, and user profile
- ✅ Authentication middleware
- ✅ Input validation and error handling

### Frontend
- ✅ Updated login form to connect to API
- ✅ Updated signup form to connect to API
- ✅ Error handling and user feedback
- ✅ Automatic redirect after successful login

## API Endpoints

- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Authenticate user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user profile

## Database Schema

The users collection will be created automatically with the following structure:

```typescript
{
  _id: ObjectId,
  fullName: string,
  email: string,
  password: string (hashed),
  createdAt: Date,
  updatedAt: Date,
  isVerified: boolean,
  role: 'doctor' | 'nurse' | 'admin'
}
```

## Security Features

- Passwords are hashed using bcrypt with salt rounds of 12
- JWT tokens expire after 7 days
- HTTP-only cookies for token storage
- Input validation on both client and server
- Email uniqueness validation

## Testing

1. Start the development server: `npm run dev`
2. Navigate to `/signup` to create a new account
3. Navigate to `/login` to authenticate
4. Check the dashboard at `/dashboard` after login

The authentication system is now fully functional and connected to your MongoDB database!
