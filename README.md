# Pet Store Application

A modern React TypeScript application for managing pets using the Swagger Petstore API. Built with React, TypeScript, Vite, Material-UI, and React Query.

## 🚀 Features

### Authentication
- **Secure Login**: User authentication with protected routes
- **Session Management**: Persistent login state with localStorage
- **Route Protection**: Authenticated routes with automatic redirects

### Pet Management
- **Pet Listing**: Browse pets with status filtering (available, pending, sold)
- **Search Functionality**: Real-time search by pet name
- **Pagination**: Client-side pagination with customizable page sizes (6, 12, 24, 48 items)
- **Pet Details**: View detailed information about individual pets
- **Pet Editing**: Update pet information with form validation
- **Image Handling**: Fallback images for missing pet photos

### User Interface
- **Responsive Design**: Mobile-friendly Material-UI components
- **Navigation**: Intuitive navbar with contextual navigation
- **Loading States**: Smooth loading indicators and error handling
- **Error Boundaries**: Graceful error handling with recovery options

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **API**: Swagger Petstore API
- **FORM**: React Hook Form

### Project Structure
```
src/
├── api/                 # API layer
│   ├── axios.ts        # Axios configuration
│   └── pets.ts         # Pet API functions
├── app/                # App configuration
│   ├── ErrorBoundary.tsx
│   ├── providers.tsx   # App providers wrapper
│   ├── queryClient.ts  # React Query configuration
│   └── router.tsx      # Route definitions
├── auth/               # Authentication
│   ├── AuthContext.tsx # Auth context
│   ├── AuthProvider.tsx # Auth provider
│   └── ProtectedRoute.tsx # Route protection
├── components/         # Reusable components
│   ├── ErrorFallback.tsx
│   ├── Loading.tsx
│   ├── Navbar.tsx      # Navigation component
│   └── PetCard.tsx     # Pet display card
├── hooks/              # Custom hooks
│   └── usePets.ts      # Pet data hooks
├── pages/              # Page components
│   ├── Login.tsx       # Login page
│   ├── PetDetails.tsx  # Pet details page
│   ├── PetEdit.tsx     # Pet editing page
│   └── PetsList.tsx    # Main pets listing
├── types/              # TypeScript types
│   └── pets.ts         # Pet type definitions
├── index.css           # Global styles
└── main.tsx           # App entry point
```

## 🛠️ Setup and Installation

### Prerequisites
- Node.js (v20 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file with:
   ```env
   VITE_API_BASE_URL=https://petstore.swagger.io/v2
   VITE_PETSTORE_API_KEY=special-key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔑 Authentication

### Login Credentials
Use any valid username/password combination. The app uses the Petstore API's login endpoint.

Example credentials:
- Username: `demo`
- Password: `demo`

## 📱 Usage

### Navigation
- **Pets List**: Main page showing all pets with filtering and search
- **Pet Details**: Click "Details" on any pet card to view full information
- **Edit Pet**: Click "Edit" to modify pet information
- **Logout**: Use navbar logout button to end session

### Filtering and Search
- **Status Filter**: Toggle between available, pending, and sold pets
- **Name Search**: Type in the search box to filter pets by name
- **Pagination**: Navigate through pages and adjust items per page

### Pet Management
- **View Details**: See complete pet information including photos
- **Edit Information**: Update pet name, status, and other details
- **Image Fallbacks**: Automatic placeholder images for missing photos

## 🏛️ API Integration

The application integrates with the [Swagger Petstore API](https://petstore.swagger.io/):

### Endpoints Used
- `GET /pet/findByStatus` - Fetch pets by status
- `GET /pet/{id}` - Get individual pet details
- `PUT /pet` - Update pet information
- `GET /user/login` - User authentication
- `GET /user/logout` - User authentication

### Error Handling
- Network error recovery
- API error display
- Graceful fallbacks for missing data

## 🎨 UI/UX Features

### Design System
- **Material Design**: Consistent Material-UI components
- **Responsive Layout**: Works on desktop and mobile

### User Experience
- **Loading States**: Visual feedback during API calls
- **Error Messages**: Clear error communication
- **Empty States**: Helpful messages when no data is available
- **Contextual Navigation**: Smart navbar that adapts to current page

## 🧪 Development

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Error Boundaries**: Component-level error handling
- **Custom Hooks**: Reusable data fetching logic

### State Management
- **React Query**: Server state management with caching
- **Local State**: Component state with React hooks
- **Context API**: Authentication state management

## 🚀 Deployment

The application is ready for deployment to various platforms:

### Supported Platforms
- Netlify
- Vercel

### Build Process
```bash
npm run build
```

The build output will be in the `dist/` directory.

## 📋 Component Documentation

### Core Components

#### `PetsList`
Main listing page with pagination, filtering, and search functionality.
- **Props**: None
- **Features**: Status filtering, name search, pagination (6-48 items per page)
- **State**: Manages current page, page size, status filters, and search query

#### `PetCard`
Reusable card component for displaying pet information.
- **Props**: `{ pet: Pet }`
- **Features**: Image fallbacks, navigation buttons, status chips
- **Actions**: View details, edit pet

#### `Navbar`
Navigation component with contextual menu items.
- **Features**: Logo, navigation links, user info, logout
- **Context-aware**: Shows edit/view buttons based on current route

#### `ProtectedRoute`
Route wrapper that ensures authentication.
- **Features**: Automatic redirect to login, navbar integration
- **Protection**: All pet-related routes require authentication

### Custom Hooks

#### `usePetsList(status: string[])`
Fetches pets by status with React Query caching.
- **Returns**: `{ data, isLoading, error, refetch }`
- **Caching**: Automatic background updates and error retry

#### `usePet(id: number)`
Fetches individual pet details by ID.
- **Returns**: `{ data, isLoading, error }`
- **Caching**: Optimized for detail page performance

### API Layer

#### `pets.ts`
- `findByStatus(status: string[])` - Fetch pets by status array
- `getById(id: number)` - Get single pet details
- `updatePet(pet: Pet)` - Update pet information

#### `axios.ts`
Configured Axios instance with:
- Base URL from environment variables
- API key authentication
- Bearer token support
- Request/response interceptors