import  express  from "express";
import { getAllCoffes, createCoffe , updateCoffe, removeCoffe} from "../../src/api/v1/controllers/coffesControllers.js";

const router = express.Router()

router.get("/coffes", getAllCoffes)
router.post("/coffes", createCoffe)
router.put("/coffes/:id", updateCoffe)
router.delete("/coffes/:id", removeCoffe)


export default router