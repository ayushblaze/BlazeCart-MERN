import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@blaze.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Ben Oslo',
    email: 'ben@blaze.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Peter Parker',
    email: 'peter@blaze.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;