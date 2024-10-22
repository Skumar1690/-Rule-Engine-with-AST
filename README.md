# Rule Engine with AST

A powerful rule engine implementation that evaluates complex business rules against user attributes stored in a MySQL database. The engine uses Abstract Syntax Trees (AST) for efficient rule parsing and evaluation, making it ideal for applications requiring dynamic rule processing.

## 🚀 Features

- **AST-Based Rule Processing**: Efficient rule evaluation using Abstract Syntax Trees
- **Flexible Rule Definition**: Support for complex nested rules with logical operators (AND, OR)
- **Database Integration**: Seamless MySQL integration for user attribute storage
- **RESTful API**: Easy-to-use endpoints for rule evaluation
- **Web Interface**: User-friendly interface for rule management
- **Extensible Design**: Easy to add new operators and conditions

## 🛠️ Technologies Used

- Node.js (v14 or higher)
- Express.js
- MySQL
- CORS
- Body-Parser
- dotenv

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14+)
- MySQL Server
- npm (Node Package Manager)

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/Skumar1690/Rule-Engine-with-AST.git
cd Rule-Engine-with-AST
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up the database**
```sql
CREATE DATABASE rule_engine_db;
USE rule_engine_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    age INT NOT NULL,
    department VARCHAR(50),
    salary DECIMAL(10, 2)
);
```

4. **Add sample data**
```sql
INSERT INTO users (age, department, salary) VALUES 
    (35, 'Sales', 60000.00),
    (28, 'Marketing', 50000.00),
    (45, 'Engineering', 70000.00),
    /* ... other insertions ... */
    (39, 'Engineering', 82000.00);
```

5. **Configure environment variables**
Create a `.env` file in the root directory:
```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DATABASE=rule_engine_db
PORT=3000
```

## 🚦 Usage

1. **Start the server**
```bash
npm start
```

2. **Example Rule Structure**
```javascript
{
  "operator": "AND",
  "conditions": [
    "age > 30",
    {
      "operator": "OR",
      "conditions": [
        "department = Sales",
        "salary > 60000"
      ]
    }
  ]
}
```

3. **API Endpoints**

- **Evaluate Rule**
  ```
  POST /evaluate-rule
  ```
  Request body:
  ```json
  {
    "rule": {
      // Rule structure as shown above
    },
    "userId": 1
  }
  ```

## 🌳 AST Node Structure

The rule engine uses a binary tree structure where each node represents either an operator or an operand:

```javascript
class Node {
  constructor(type, left = null, right = null, value = null) {
    this.type = type;    // 'operator' or 'operand'
    this.left = left;    // left child node
    this.right = right;  // right child node
    this.value = value;  // operator value (AND/OR) or condition
  }
}
```

## 📝 Supported Operations

- Comparison Operators: `=`, `>`, `<`, `>=`, `<=`
- Logical Operators: `AND`, `OR`
- Fields: `age`, `department`, `salary`

## 🎯 Future Enhancements

- Add support for NOT operator
- Implement rule caching
- Add more comparison operators
- Support for date-based rules
- Rule validation and testing interface
- Performance optimization for large rule sets

## ⚠️ Known Issues

- Large nested rules may impact performance
- Limited error handling for malformed rules

## 📞 Support

For support, email skeduc12@gmail.com.com or create an issue in the repository.

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by various rule engine implementations
- Special thanks to the Node.js and MySQL communities
