const express = require("express");
const app = express();
const zod = require("zod");

app.use(express.json());

function userMiddlewares(req, res, next) {
    const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8)
    });

    const users = {
        email: req.headers.email,
        password: req.headers.password        
    };

    const response = schema.safeParse(users);
    if (!response.success) {
        return res.status(400).json({ error: response.error.errors });
    }
    next();
}

function kidneyMiddlewares(req, res, next) {
    const schema = zod.array(zod.number());
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys);
    
    if (!response.success) {
        return res.status(400).json({ error: response.error.errors });
    }
    next();
}

app.post('/health-checkup', userMiddlewares, kidneyMiddlewares, (req, res) => {
    res.json({
        msg: "Successful"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
