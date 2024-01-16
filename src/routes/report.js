import express from 'express';

// create a new router
const router = new express.Router();

import { newReport, getReports, deleteReport } from '../controllers/report.js';

// Route handler to create a new report - NEW REPORT
router.post('/api/reports', newReport);

// Route handler for fetching all reports - GET ALL REPORTS
router.get('/api/reports', getReports);

// Route handler to delete a report by Id - DELETE REPORT
router.delete('/api/reports/:id', deleteReport);

// export the router to be used
export { router as reportRouter };