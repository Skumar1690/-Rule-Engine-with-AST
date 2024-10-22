// index.js

require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Import the path module
const ruleEngine = require('./ruleEngine'); // Assuming ruleEngine.js is in the same directory

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to create and evaluate rules
app.post('/evaluate', (req, res) => {
    const { ruleString, userId } = req.body;

    ruleEngine.getUserAttributes(userId, (err, attributes) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        try {
            const ruleAST = ruleEngine.create_rule(ruleString);
            const result = ruleEngine.evaluate_rule(ruleAST, attributes);
            return res.json({ result });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
