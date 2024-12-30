# Project Structure

## Root Directory

- **app/**

  - **(auth)/**: Authentication Flow
    - `_layout.tsx`: Shared layout for Login/Signup
    - `sign-in.tsx`: Login screen
    - `sign-up.tsx`: Signup screen
    - `welcome.tsx`: Welcome screen
  - **(client)/**: Client-Specific Flow
    - `layout.tsx`: Shared layout for client screens
    - **tabs/**: Tabs for client navigation
      - `index.tsx`: Client home page
      - `search.tsx`: Search services/providers
      - `consultation.tsx`: Beauty consultation
      - `community.tsx`: Community/social page
      - `profile.tsx`: Client profile
    - `notifications.tsx`: Notifications page (standalone, not in tabs)
    - `[serviceId].tsx`: Dynamic route for service details
  - **(business)/**: Business-Specific Flow
    - `layout.tsx`: Shared layout for business screens
    - **tabs/**: Tabs for business navigation
      - `home.tsx`: Business home page
      - `appointments.tsx`: Manage appointments
      - `clients.tsx`: View all clients
      - `leads.tsx`: Leads management
      - `analytics.tsx`: Analytics dashboard
    - `settings.tsx`: Settings page (standalone, not in tabs)
    - `notifications.tsx`: Notifications page (optional for business)
    - `[clientId].tsx`: Dynamic route for client details
  - **(shared)/**: Shared Components/Layout
    - `error.tsx`: Fallback error page
    - `loading.tsx`: Fallback loading spinner
    - `modal.tsx`: Modal for app-wide use
  - `layout.tsx`: Root layout for the entire app
  - `index.tsx`: Entry point, redirects based on user type

- **api/**: API Utilities

  - `auth.ts`: Authentication API (e.g., login, signup)
  - `client.ts`: Client-related API (e.g., fetch services)
  - `business.ts`: Business-related API (e.g., manage appointments)
  - `notifications.ts`: Notifications API
  - `graphql.ts`: GraphQL client configuration

- **store/**: State Management

  - `authStore.ts`: Authentication state
  - `clientStore.ts`: Client-specific state
  - `businessStore.ts`: Business-specific state
  - `notificationsStore.ts`: Notifications state

- **utils/**: Utility Functions

  - `navigation.ts`: Navigation helpers
  - `validation.ts`: Input validation utilities
  - `format.ts`: Formatting utilities

- **assets/**: Static assets

  - **fonts/**: Font assets
  - **images/**: Image assets

- **constants/**: App-wide Constants
  - `Colors.ts`: Colors that are used in the app. The colors are defined in the light and dark mode.
