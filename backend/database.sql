CREATE TABLE customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  phone TEXT,
  address TEXT,
  packageName TEXT,
  price INTEGER,
  status TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);