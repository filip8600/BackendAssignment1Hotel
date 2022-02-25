import { Router } from "express"
import { room } from "../Controllers/roomsController";

const router = Router()

router.get("", room.read);
router.post("", room.create);
router.get("/:uid", room.readOne);
router.patch("/:uid", room.update);
router.delete("/:uid", room.remove);


export const roomsRouter = router;
