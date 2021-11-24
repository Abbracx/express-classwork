"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: '../../public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({ storage: storage }).single('image');
var ADMINS;
(function (ADMINS) {
    ADMINS["manager"] = "manager";
    ADMINS["cto"] = "cto";
    ADMINS["devs"] = "devs";
})(ADMINS || (ADMINS = {}));
var GENDER;
(function (GENDER) {
    GENDER[GENDER["male"] = 0] = "male";
    GENDER[GENDER["female"] = 1] = "female";
    GENDER[GENDER["other"] = 2] = "other";
})(GENDER || (GENDER = {}));
let admins = [];
// router.get("/", (req, res, next) => {
//   res.json({ h: "hello world!" });
// });
// router.get("test", (req, res, next) => {
//   res.send("HELLO WORLD!!!@");
// });
router.get("/admins", (req, res, next) => {
    res.render("list_admin", { title: "LIST ADMINS", list_admins: admins });
});
router.post("/admins", upload, async function createAdmin(req, res, next) {
    const _admin = req.body;
    _admin.age = Number(_admin.age);
    if (req.file === undefined) {
        return res.render('error', { message: 'No file (👤) selected.' });
    }
    else {
        _admin.image = req.file.filename;
    }
    console.log(_admin);
    switch (_admin.role) {
        case ADMINS.manager:
            admins.push(_admin);
            break;
        case ADMINS.cto:
            admins.push(_admin);
            break;
        case ADMINS.devs:
            admins.push(_admin);
            break;
        default:
            res.render("error", { title: "ERROR", message: "💀 BAD REQUEST 💀" });
            return;
    }
    console.log(admins);
    res.render("list_admin", {
        title: "LIST ADMINS",
        list_admins: admins,
    });
});
router.get("/admins/:name", async function getAdmin(req, res, next) {
    let _name = req.params.name;
    console.log(_name);
    console.log(admins);
    let admin = admins.find((_admin) => _admin.name === _name);
    console.log(admin);
    if (admin) {
        res.render("admin", { title: "Admin Page", admin: admin, img: 'images/' + admin.image });
    }
    res.render("error", { title: "ERROR", message: "😜 ADMIN NOT FOUND 😜" });
});
exports.default = router;
