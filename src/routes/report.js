import express from 'express';

// create a new router
const router = new express.Router();

import { newReport, getReports, updateReportById, deleteReportById } from '../controllers/report.js';

// Route handler to create a new report - POST NEW REPORT
router.post('/api/reports', newReport);

// Route handler for fetching all reports - GET ALL REPORTS
router.get('/api/reports', getReports);

// route handler to update an existing report - UPDATE REPORT BY ID
router.patch('/api/reports/:id', updateReportById);

// route handler to delete a report by Id - DELETE REPORT
router.delete('/api/reports/:id', deleteReportById);

// 

// export the router to be used
export { router as reportRouter };