// ruleEngine.js

require('dotenv').config();  // Load environment variables
const mysql = require('mysql2');

// Define the Node class
class Node {
    constructor(type, value, left = null, right = null) {
        this.type = type;  // 'operator' or 'operand'
        this.value = value;  // 'AND', 'OR', or condition (e.g., 'age > 30')
        this.left = left;  // Left child node (for operators)
        this.right = right;  // Right child node (for operators)
    }
}

// Function to create rule AST from rule string
function create_rule(ruleString) {
    const tokens = ruleString.split(/\s+/);
    let currentNode = null;

    // Helper function to create a condition node (operand)
    function createConditionNode(conditionStr) {
        const [field, operator, value] = conditionStr.split(/(>=|<=|>|<|!=|=)/);  // Split by operator
        return new Node('operand', { field: field.trim(), operator: operator.trim(), value: value.trim() });
    }

    // Process each token and build the tree
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i].toUpperCase();

        if (token === 'AND' || token === 'OR') {
            // Create an operator node
            const operatorNode = new Node('operator', token);

            // Set the current node as the left child and prepare for right child
            operatorNode.left = currentNode;
            currentNode = operatorNode;
        } else {
            // If it's not an operator, it's a condition, so create a condition node
            const conditionNode = createConditionNode(token);

            if (!currentNode) {
                currentNode = conditionNode;  // Initialize root if no current node
            } else if (currentNode.type === 'operator' && !currentNode.right) {
                currentNode.right = conditionNode;  // Add right child to operator
            }
        }
    }

    return currentNode;
}

// Function to evaluate the AST rule against user attributes
function evaluate_rule(node, attributes) {
    if (node.type === 'operand') {
        const { field, operator, value } = node.value;

        let fieldValue = attributes[field];
        if (typeof fieldValue === 'undefined') {
            throw new Error(`Field "${field}" is not found in attributes.`);
        }

        switch (operator) {
            case '>':
                return fieldValue > value;
            case '<':
                return fieldValue < value;
            case '>=':
                return fieldValue >= value;
            case '<=':
                return fieldValue <= value;
            case '=':
                return fieldValue == value;
            case '!=':
                return fieldValue != value;
            default:
                throw new Error(`Unsupported operator "${operator}".`);
        }
    } else if (node.type === 'operator') {
        const leftResult = evaluate_rule(node.left, attributes);
        const rightResult = evaluate_rule(node.right, attributes);

        switch (node.value) {
            case 'AND':
                return leftResult && rightResult;
            case 'OR':
                return leftResult || rightResult;
            default:
                throw new Error(`Unsupported operator "${node.value}".`);
        }
    }
}

// MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Connect to MySQL
connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL.');
});

// Function to get user attributes by user ID from the database
function getUserAttributes(userId, callback) {
    connection.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(new Error('User not found'), null);
        }

        const user = results[0];
        const attributes = {
            age: user.age,
            department: user.department,
            salary: user.salary
        };

        callback(null, attributes);
    });
}

module.exports = { create_rule, evaluate_rule, getUserAttributes };
