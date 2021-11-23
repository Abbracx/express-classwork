import express, { Request, Response, NextFunction } from 'express'

const router = express.Router();
let food : string[] = []

router.get('/food', function processFood(req:Request, res:Response, next:NextFunction){
    res.status(200).json({message: 'This is all we have.', data:food})
});

router.post(
  "/food",
  function postFood(req: Request, res: Response, next: NextFunction) {
    let {id} = req.params; 
    const {name} = req.body;
      food.push(name);
    res.status(201).json({ message: `FOOD:${name} created👺`, data: food });
  }
);

router.get("/:name", async (req: Request, res: Response, next: NextFunction) => {
  let {name} = req.params;
  let includes = food.includes(name);
  if(includes){
      let idx = food.indexOf(name);
      return res.status(200).json({data:`${food[idx]}`});
  }
  return res.status(404).json({ message: "food not found" });

});
export default router;