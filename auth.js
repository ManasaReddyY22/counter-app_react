// Authentication utilities using localStorage

export const registerUser = (username, email, password) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Check if user already exists
  const existingUser = users.find(user => user.email === email || user.username === username);
  if (existingUser) {
    throw new Error('User already exists!');
  }
  
  // Create new user
  const newUser = {
    id: Date.now().toString(),
    username,
    email,
    password, // In a real app, this should be hashed
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  // Auto-login after registration
  localStorage.setItem('currentUser', JSON.stringify({
    id: newUser.id,
    username: newUser.username,
    email: newUser.email
  }));
  
  return newUser;
};

export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    throw new Error('Invalid email or password!');
  }
  
  // Store current user session
  localStorage.setItem('currentUser', JSON.stringify({
    id: user.id,
    username: user.username,
    email: user.email
  }));
  
  return user;
};

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return getCurrentUser() !== null;
}; 