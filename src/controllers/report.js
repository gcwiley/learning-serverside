import { Report } from '../models/report.js';

// function to create a new report - NEW REPORT
export const newReport = async (req, res) => {
  const report = new Report(req.body);

  try {
    await report.save();
    res.status(201).send(report);
  } catch (error) {
    res.status(400).send(error);
  }
};

// function to fetch all reports from database - ALL REPORTS
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find({}).sort({ title: 'desc' });

    // if no reports are found
    if (!reports) {
      return res.status(404).send('No reports found.');
    }

    res.send(reports);
  } catch (error) {
    res.status(500).send();
  }
};

// function to fetch individual report by ID - REPORT BY ID
export const getReportById = async (req, res) => {
  const _id = req.params.id;

  try {
    // filters by _id
    const report = await Report.findById({ _id });

    // if no report is found
    if (!report) {
      return res.status(404).send('No report found.');
    }

    res.send(report);
  } catch (error) {
    res.status(500).send();
  }
};

// function to update a report by id - UPDATE REPORT
export const updateReportById = async (req, res) => {
  try {
    const _id = req.params.id;
    const report = await Report.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    // is no report is found
    if (!report) {
      return res.status(404).send('No report found.');
    }

    // send updated report back to client
    res.send(report);
  } catch (error) {
    res.status(400).send(error);
  }
};

// function to delete a report by ID - DELETE REPORT
export const deleteReportById = async (req, res) => {
  try {
    // find and delete report that takes id into account
    const report = await Report.findByIdAndDelete({
      _id: req.params.id,
    });

    // if no report is found
    if (!report) {
      res.status(404).send('No report found.');
    }
    res.send(report);
  } catch (error) {
    res.status(500).send();
  }
};

// function to count all reports - REPORT COUNT
export const getReportCount = async (req, res) => {
  try {
    // count all reports within database
    const reportCount = await Report.countDocuments({});

    // if no report count are found
    if (!reportCount) {
      return res.status(404).send();
    }

    res.send(reportCount);
  } catch (error) {
    res.status(500).send();
  }
};

// function to get the 5 most recently create reports
export const getRecentlyCreatedReports = async (req, res) => {
  try {
    const mostRecentReports = await Report.find({}).sort({ createdAt: -1 }).limit(5);

    if (!mostRecentReports) {
      return res.status(404).send();
    }
    res.send(mostRecentReports);
  } catch (error) {
    res.status(500).send(error);
  }
};
