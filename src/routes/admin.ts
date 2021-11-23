import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

enum ADMINS {
  "manager" = "manager",
  "cto" = "cto",
  "devs" = "devs",
}

enum GENDER {
  "male" = 0,
  "female" = 1,
  "other" = 2,
}

interface Admin {
  name: string;
  email: string;
  age: number | string;
  gender: GENDER;
  address: string;
  role: ADMINS;
}

let admins: Admin[] = [];

// router.get("/", (req, res, next) => {
//   res.json({ h: "hello world!" });
// });

// router.get("test", (req, res, next) => {
//   res.send("HELLO WORLD!!!@");
// });

router.get("/admins", (req: Request, res: Response, next: NextFunction) => {
  res.render("list_admin", { title: "LIST ADMINS", list_admins: admins });
});

router.post(
  "/admins",
  async function createAdmin(req: Request, res: Response, next: NextFunction) {
    const _admin: Admin = req.body;
    _admin.age = Number(_admin.age);

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
  }
);

router.get(
  "/admins/:name",
  async function getAdmin(req: Request, res: Response, next: NextFunction) {
    let _name = req.params.name;
    console.log(_name);
    console.log(admins);
    let admin = admins.find((_admin) => _admin.name === _name);
    console.log(admin);
    if (admin) {
      res.render("admin", { title: "Admin Page", admin: admin } as Object);
    }
    res.render("error", { title: "ERROR", message: "😜 ADMIN NOT FOUND 😜" });
  }
);

export default router;
