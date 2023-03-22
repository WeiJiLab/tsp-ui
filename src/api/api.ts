import { config } from '../common';

export default {
  startScaning: '/image-scan/start',
  stopScaning: '/image-scan/stop',
  getReports:'/image-scan/reports',
  getStageStatus: '/image-scan/stage-status',
  getSteps: '/image-scan/steps',
  upload:`${config.api.API_URL}/image-scan/upload`
};
