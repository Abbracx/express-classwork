"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.set("views", path_1.default.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_ejs_layouts_1.default);
app.use((0, morgan_1.default)("dev"));
const admin_1 = __importDefault(require("./routes/admin"));
// app.use('/', foodRoutes);
app.use('/', admin_1.default);
app.use(async (error, req, res, next) => {
    res.status(500).send(error.message);
});
app.listen(PORT, () => {
    console.log("listening");
});
