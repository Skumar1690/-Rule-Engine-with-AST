# Rule Engine with Abstract Syntax Tree (AST)

## Objective

The goal of this project is to build a 3-tier rule engine application using Node.js and PostgreSQL. This engine determines user eligibility based on attributes such as age, department, income, spend, etc., using an **Abstract Syntax Tree (AST)** to represent conditional rules. The system allows dynamic creation, combination, and modification of these rules.

## Features

1. **Dynamic Rule Creation:** Create rules dynamically based on conditional logic.
2. **Rule Combination:** Combine multiple rules into one efficient AST to minimize redundant checks.
3. **Rule Evaluation:** Evaluate user eligibility based on provided data attributes.
4. **AST Representation:** Rules are stored and processed as AST, providing flexibility in rule manipulation.

## Tech Stack

- **Backend:** Node.js (with Express.js)
- **Database:** PostgreSQL
- **API:** RESTful API built using Express.js
- **Language:** JavaScript (ES6+)

## Data Structure

The AST is represented as a binary tree with nodes structured as follows:

### Node Structure:

```js
class Node {
  constructor(type, left = null, right = null, value = null) {
    this.type = type; // 'operator' (AND/OR) or 'operand' (condition)
    this.left = left; // left child (node)
    this.right = right; // right child (node)
    this.value = value; // operand value (for conditions)
  }
}
```
