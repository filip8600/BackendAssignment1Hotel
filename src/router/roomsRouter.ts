//Create new router object

import { Router } from "express"
import { room } from "../Controllers/roomsController";

const router = Router()

router.get("",room.read);
router.post("",room.create);
router.get("/:uid",);
router.patch("/:uid",);
router.delete("/:uid",);


export const roomsRouter = router;
