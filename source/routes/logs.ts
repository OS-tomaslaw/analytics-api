import express from 'express';
import controller from '../controllers/logs';

const router = express.Router();

router.get('/general-logs', controller.getGeneralLogs);
router.get('/error-logs', controller.getErrorLogs);
router.get('/integration-logs', controller.getIntegrationLogs);
router.get('/timer-logs', controller.getTimerLogs);
router.get('/extension-logs', controller.getExtensionLogs);
router.get('/mobile-logs', controller.getMobileLogs);
router.get('/screen-logs', controller.getScreenLogs);
router.get('/service-logs', controller.getServiceLogs);

export = router;