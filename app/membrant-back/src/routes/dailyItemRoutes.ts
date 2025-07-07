import { Router } from 'express';
import {
  getDailyItems,
  getDailyItem,
  createDailyItem,
  updateDailyItem,
  deleteDailyItem,
} from '../controllers/dailyItemControllers';

const router = Router();

router.get('/', getDailyItems);
router.get('/:id', getDailyItem);
router.post('/', createDailyItem);
router.put('/:id', updateDailyItem);
router.delete('/:id', deleteDailyItem);

export default router;