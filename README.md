# Rule Engine with AST

A simple rule engine that evaluates rules based on user attributes stored in a MySQL database. This project demonstrates how to create an Abstract Syntax Tree (AST) for rule evaluation using JavaScript and Node.js.

## Features

- Evaluate rules against user attributes retrieved from a MySQL database.
- Supports logical operators like `AND` and `OR`.
- User-friendly web interface for rule input.

## Technologies Used

- Node.js
- Express.js
- MySQL
- CORS
- Body-Parser
- dotenv

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Skumar1690/-Rule-Engine-with-AST.git
   cd Rule-Engine-with-AST
   ```

The AST is represented as a binary tree with nodes structured as follows:

### Node Structure:

```
CREATE DATABASE rule_engine_db;
USE rule_engine_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    age INT NOT NULL,
    department VARCHAR(50),
    salary DECIMAL(10, 2)
);
```

INSERT INTO users (age, department, salary) VALUES (35, 'Sales', 60000.00);
INSERT INTO users (age, department, salary) VALUES (28, 'Marketing', 50000.00);
INSERT INTO users (age, department, salary) VALUES (45, 'Engineering', 70000.00);
INSERT INTO users (age, department, salary) VALUES (30, 'Sales', 55000.00);
INSERT INTO users (age, department, salary) VALUES (25, 'Engineering', 65000.00);
INSERT INTO users (age, department, salary) VALUES (29, 'Sales', 54000.00);
INSERT INTO users (age, department, salary) VALUES (32, 'Marketing', 58000.00);
INSERT INTO users (age, department, salary) VALUES (40, 'Engineering', 75000.00);
INSERT INTO users (age, department, salary) VALUES (22, 'HR', 45000.00);
INSERT INTO users (age, department, salary) VALUES (35, 'Finance', 68000.00);
INSERT INTO users (age, department, salary) VALUES (38, 'Engineering', 80000.00);
INSERT INTO users (age, department, salary) VALUES (27, 'Sales', 52000.00);
INSERT INTO users (age, department, salary) VALUES (31, 'Marketing', 62000.00);
INSERT INTO users (age, department, salary) VALUES (44, 'IT', 72000.00);
INSERT INTO users (age, department, salary) VALUES (26, 'HR', 49000.00);
INSERT INTO users (age, department, salary) VALUES (33, 'Finance', 66000.00);
INSERT INTO users (age, department, salary) VALUES (41, 'Engineering', 77000.00);
INSERT INTO users (age, department, salary) VALUES (23, 'Sales', 51000.00);
INSERT INTO users (age, department, salary) VALUES (36, 'Marketing', 60000.00);
INSERT INTO users (age, department, salary) VALUES (48, 'HR', 75000.00);
INSERT INTO users (age, department, salary) VALUES (30, 'Finance', 59000.00);
INSERT INTO users (age, department, salary) VALUES (34, 'IT', 73000.00);
INSERT INTO users (age, department, salary) VALUES (47, 'Sales', 85000.00);
INSERT INTO users (age, department, salary) VALUES (39, 'Engineering', 82000.00);

```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DATABASE=rule_engine_db
PORT=3000

node index.js
```

```js
class Node {
  constructor(type, left = null, right = null, value = null) {
    this.type = type; // 'operator' (AND/OR) or 'operand' (condition)
    this.left = left; // left child (node)
    this.right = right; // right child (node)
    this.value = value; // operand value
  }
}
```
