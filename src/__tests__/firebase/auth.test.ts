import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { Auth, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { firebaseApp } from '../../firebase/app';
import * as authModule from '../../firebase/auth';
import { mockUser } from '../jest.setup';

jest.mock('firebase/auth');

describe('Firebase Auth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signInWithEmailAndPassword', () => {
    it('should sign in user with email and password', async () => {
      const mockSignIn = signInWithEmailAndPassword as jest.MockedFunction<typeof signInWithEmailAndPassword>;
      const mockValue = { user: mockUser } as UserCredential;

      mockSignIn.mockResolvedValueOnce(mockValue);

      await authModule.signInWithEmailAndPassword('test@example.com', 'password');
      expect(mockSignIn).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password'
      );
    });

    it('should throw error if sign in fails', async () => {
      const mockSignIn = signInWithEmailAndPassword as jest.MockedFunction<typeof signInWithEmailAndPassword>;
      const error = new Error('Invalid credentials');
      mockSignIn.mockRejectedValueOnce(error);

      await expect(
        authModule.signInWithEmailAndPassword('test@example.com', 'password')
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('createUserWithEmailAndPassword', () => {
    it('should create new user with email and password', async () => {
      const mockCreateUser = createUserWithEmailAndPassword as jest.MockedFunction<typeof createUserWithEmailAndPassword>;
      const mockValue = { user: mockUser } as UserCredential;

      mockCreateUser.mockResolvedValueOnce(mockValue);

      await authModule.createUserWithEmailAndPassword('test@example.com', 'password');
      expect(mockCreateUser).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password'
      );
    });
  });

  describe('signOut', () => {
    it('should sign out current user', async () => {
      const mockSignOut = signOut as jest.MockedFunction<typeof signOut>;
      mockSignOut.mockResolvedValueOnce(undefined);

      // Mock auth object with signOut method
      (getAuth as jest.MockedFunction<typeof getAuth>).mockReturnValueOnce({
        currentUser: mockUser,
        signOut: mockSignOut
      } as unknown as Auth);

      await authModule.signOut();
      expect(mockSignOut).toHaveBeenCalled();
    });
  });

  describe('currentUser', () => {
    it('should return current user if logged in', () => {
      const mockAuth = getAuth as jest.MockedFunction<typeof getAuth>;
      mockAuth.mockReturnValueOnce({
        currentUser: mockUser
      } as unknown as Auth);

      const user = authModule.currentUser();
      expect(user).toBe(mockUser);
    });

    it('should return null if no user is logged in', () => {
      const mockAuth = getAuth as jest.MockedFunction<typeof getAuth>;
      mockAuth.mockReturnValueOnce({
        currentUser: null
      } as unknown as Auth);

      const user = authModule.currentUser();
      expect(user).toBeNull();
    });
  });
});