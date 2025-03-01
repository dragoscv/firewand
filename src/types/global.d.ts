import { AppUser } from './user';

// Global types declarations
declare global {

    // Make AppUser available globally
    type GlobalAppUser = AppUser;
}

// Re-export AppUser for convenience
export { AppUser };
