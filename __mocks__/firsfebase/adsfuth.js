// __mocks__/firebase/auth.js

export const getAuth = jest.fn(() => {
  return {
    currentUser: { uid: "12345" },
  };
});

export const signInWithEmailAndPassword = jest.fn((auth, email, password) => {
  return Promise.resolve({
    user: { uid: "12345", email },
  });
});
