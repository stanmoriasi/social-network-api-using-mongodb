import { Router } from 'express';
const router = Router();
import apiRoutes from './api/index.js';

router.use('/api', apiRoutes);

router.use((_req, res) => {
  return res.status(404).json({ message: 'Route Not Found' });
});

export default router;
