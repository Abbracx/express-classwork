"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
let food = [];
router.get('/food', function processFood(req, res, next) {
    res.status(200).json({ message: 'This is all we have.', data: food });
});
router.post("/food", function postFood(req, res, next) {
    let { id } = req.params;
    const { name } = req.body;
    food.push(name);
    res.status(201).json({ message: `FOOD:${name} created👺`, data: food });
});
router.get("/:name", async (req, res, next) => {
    let { name } = req.params;
    let includes = food.includes(name);
    if (includes) {
        let idx = food.indexOf(name);
        return res.status(200).json({ data: `${food[idx]}` });
    }
    return res.status(404).json({ message: "food not found" });
});
exports.default = router;
