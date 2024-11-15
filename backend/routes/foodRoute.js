import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js"
import multer from "multer"
import { Upload } from "lucide";

const foodRouter = express.Router();

//image storege engine

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post('/add', upload.single('image'), addFood);

foodRouter.get("/list",listFood)
 
foodRouter.post("/remove",removeFood)



export default foodRouter;