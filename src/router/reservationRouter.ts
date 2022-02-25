import { Router } from "express"
import { reservation } from "../Controllers/reservationController";

const router = Router()

router.get("", reservation.read);
router.post("", reservation.create);
router.get("/:uid", reservation.readOne);
router.patch("/:uid", reservation.update);
router.delete("/:uid", reservation.remove);


export const reservationsRouter = router;
