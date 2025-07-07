import { Router } from 'express';
import {
  getCalendarItems,
  getCalendarItem,
  createCalendarItem,
  updateCalendarItem,
  deleteCalendarItem,
} from '../controllers/calendarItemControllers';

const router = Router();

router.get('/', getCalendarItems);
router.get('/:id', getCalendarItem);
router.post('/', createCalendarItem);
router.put('/:id', updateCalendarItem);
router.delete('/:id', deleteCalendarItem);

export default router;
