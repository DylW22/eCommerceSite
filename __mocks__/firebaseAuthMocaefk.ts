export const getAuth = jest.fn(() => ({
  currentUser: {
    uid: "12345",
  },
}));

export const signInWithEmailAndPassword = jest.fn((auth, email, password) => {
  return Promise.resolve({
    user: {
      uid: "12345",
    },
  });
});
