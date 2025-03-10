# Adding Content

There are two options for solving the initial 401 unauthorized error when calling POST APIs on the gallery backend.

There are two options for this:

1. work with the token from the auth context
2. use the session token directly from Supabase

### Option 1: Work with the token from the auth context

The AddArtwork component work with the token from the auth context. The TypeScript error should be resolved.

### Option 2: Use the session token directly from Supabase

If you prefer not to modify your AuthContext and types, you can alternatively update your AddArtwork component to use the session token directly from Supabase.

### Best Practice Recommendation

Option 1 (Auth Context) is generally the better practice because:

1. It follows the principle of separation of concerns
2. It creates a cleaner abstraction layer between your UI and authentication provider
3. It makes future changes to authentication easier to implement
4. It provides a single source of truth for authentication state

If you're building a production application that might evolve over time, investing in a proper auth context with token management is worth the effort. This approach is more maintainable in the long run and follows React's component composition model better.

The only case where Option 2 might be preferable is for quick prototypes or when you're certain you'll never change your authentication provider.

## User management

Currently in the navbar we have this:

```js
const { user, logout } = useAuth();
```

After implementing option 1 auth context token, the "You must be logged in to add a gallery" error is shown even though a user is logged in.

What is the best approach for determining if a user is logged in?

The most reliable way to determine if a user is logged in is to use the isAuthenticated flag from your auth context. This is specifically designed for this purpose and is already being set properly in your AuthContext.

After implementing a isAuthenticated flag, the POST for /gallery/galleries returns a 401 Unauthorized error.

The NestJS backend has an auth guard that looks like this:

```js
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
} 
```

## Authentication Flow: React Frontend, NestJS Backend, and Supabase

### Overview

This document describes how authentication works across our three-tier architecture:

1. **React Frontend**: User interface where users log in and interact with the application
2. **NestJS Backend**: API server that handles business logic and data operations
3. **Supabase**: Authentication and database service

### Authentication Flow

#### 1. User Authentication (React Frontend ↔ Supabase)

The authentication flow begins when a user logs in:

1. User enters credentials in the React application
2. React app calls Supabase Auth with `signInWithPassword()`
3. Supabase validates credentials and returns a session with JWT token
4. React app stores token and user data in AuthContext
5. UI updates to show authenticated state

**Implementation Details:**
- The React app uses Supabase client library to authenticate users
- Upon successful login, Supabase returns a session object containing:
  - `access_token`: JWT token for API access
  - `user`: User information
- The AuthContext stores this information and sets `isAuthenticated = true`

#### 2. API Authorization (React Frontend → NestJS Backend)

When making API calls to the backend:

1. React component gets token from AuthContext
2. API request includes token in Authorization header
3. NestJS API receives request and passes to JwtAuthGuard
4. JwtAuthGuard validates token and allows/denies request
5. If authorized, NestJS processes the request and returns response

**Implementation Details:**
- React components get the token from AuthContext
- API requests include the token in the Authorization header:
  ```js
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
  ```
- NestJS uses JwtAuthGuard to validate the token before processing requests

#### 3. Backend Data Access (NestJS Backend ↔ Supabase)

For database operations:

1. NestJS API calls SupabaseService methods
2. SupabaseService executes queries against Supabase DB
3. Supabase returns data based on permissions
4. NestJS processes data and returns to frontend

**Implementation Details:**
- NestJS uses Supabase client to interact with the database
- Row-level security in Supabase ensures data access control
- The backend can use service roles for admin operations

### Key Components

#### 1. React Frontend

**AuthContext**
```typescript
// src/context/AuthContext.tsx
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  
  // Authentication logic...
  
  return (
    <AuthContext.Provider value={{ 
      user, isAuthenticated, token, login, logout, /* other methods */ 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
```

**API Request Example**
```typescript
// In a component that needs to make authenticated requests
const { isAuthenticated, token } = useAuth();

const handleSubmit = async () => {
  if (!isAuthenticated || !token) {
    throw new Error('Authentication required');
  }
  
  const response = await fetch('http://localhost:3000/gallery/galleries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  
  // Handle response...
};
```

#### 2. NestJS Backend

**JWT Strategy**
```typescript
// src/auth/jwt.strategy.ts
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'), // Must match Supabase JWT secret
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
```

**Protected Route Example**
```typescript
// src/gallery/gallery.controller.ts
@Controller('gallery')
export class GalleryController {
  constructor(private galleryService: GalleryService) {}

  @UseGuards(JwtAuthGuard)
  @Post('galleries')
  async createGallery(@Body() gallery: Gallery, @Request() req) {
    // req.user contains the authenticated user from JWT
    return this.galleryService.createGallery(gallery);
  }
}
```

#### 3. Supabase Configuration

**JWT Configuration**
Ensure your NestJS application has the correct JWT secret from Supabase:

```
JWT_SECRET=your-supabase-jwt-secret
```

### Troubleshooting

#### 401 Unauthorized Errors

If you encounter 401 errors when making requests to the NestJS backend:

1. **Check token presence**: Ensure the token is being correctly extracted from AuthContext
   ```js
   console.log('Token:', token); // Should not be null or undefined
   ```

2. **Verify token format**: The token should be sent as a Bearer token
   ```js
   // Correct format
   headers: { 'Authorization': `Bearer ${token}` }
   ```

3. **Inspect token validity**: Use jwt.io to decode and verify the token structure

4. **Check JWT strategy configuration**: Ensure your NestJS JWT strategy is configured to validate Supabase tokens

5. **Enable debugging in NestJS**: Add logging to your JwtAuthGuard to see detailed error information

#### Token Expiration

Supabase tokens expire after a certain period. Implement token refresh logic:

```typescript
// In AuthContext
const refreshToken = async () => {
  const { data, error } = await supabase.auth.refreshSession();
  if (data.session) {
    setToken(data.session.access_token);
  }
};
```

### Best Practices

1. **Use isAuthenticated flag** for UI rendering decisions
2. **Store token in AuthContext** for centralized management
3. **Implement token refresh** to handle expiration
4. **Add error handling** for authentication failures
5. **Use protected routes** in both frontend and backend
6. **Log authentication events** for debugging and auditing

By following this architecture, your application maintains a clean separation of concerns while providing secure authentication across all tiers.