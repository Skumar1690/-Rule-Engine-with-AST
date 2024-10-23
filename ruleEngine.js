// ruleEngine.js

require('dotenv').config();  // Load environment variables
const mysql = require('mysql2');

// Define the Node class
class Node {
    constructor(type, value, left = null, right = null) {
        this.type = type;  // 'operator' or 'operand'
        this.value = value;  
        this.left = left; 
        this.right = right;  
    }
}

// Function to create rule AST from rule string
function create_rule(ruleString) {
    const tokens = ruleString.split(/\s+(AND|OR)\s+/); 
    let currentNode = null;
    
    function createConditionNode(conditionStr) {
        const parts = conditionStr.split(/(>=|<=|>|<|!=|=)/).map(part => part.trim());
        if (parts.length !== 3) {
            throw new Error(`Invalid condition format: "${conditionStr}". Expected format: field operator value.`);
        }

        const field = parts[0]; // Field
        const operator = parts[1]; // Operator
        const value = parts[2].trim(); // Value

        return new Node('operand', { field, operator, value });
    }

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (i > 0) {
            
            const operatorNode = new Node('operator', tokens[i - 1].toUpperCase());
            operatorNode.left = currentNode;
            currentNode = operatorNode;
        }

        // Create a condition node
        const conditionNode = createConditionNode(token);
        if (!currentNode) {
            currentNode = conditionNode;  
        } else if (currentNode.type === 'operator' && !currentNode.right) {
            currentNode.right = conditionNode;  
        }
    }

    return currentNode;
}

function evaluate_rule(node, attributes) {
    if (node.type === 'operand') {
        const { field, operator, value } = node.value;

        let fieldValue = attributes[field];
        if (typeof fieldValue === 'undefined') {
            throw new Error(`Field "${field}" is not found in attributes.`);
        }

        let comparisonValue = value; 
        if (typeof fieldValue === 'number') {
            comparisonValue = Number(value); 
        }

        switch (operator) {
            case '>':
                return fieldValue > comparisonValue;
            case '<':
                return fieldValue < comparisonValue;
            case '>=':
                return fieldValue >= comparisonValue;
            case '<=':
                return fieldValue <= comparisonValue;
            case '=':
                return fieldValue == comparisonValue; 
            case '!=':
                return fieldValue != comparisonValue; 
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
