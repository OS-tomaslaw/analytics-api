import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { buildRequestHeaders, getUrl } from '../utils/utils';

const getLogs = async (type: string, req: Request, res: Response) => {
    try {
        const url = getUrl(type, req);
        console.log(url)

        const requestConfig: AxiosRequestConfig = {
            headers: buildRequestHeaders()
        }

        const response: AxiosResponse = await axios.get(url, requestConfig);
        return res.status(200).json({ value: response.data })
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.data?.statusCode ?? 500).json(error.response?.data)
        }
        return res.status(500).json('Error while building request');
    }
}

// #region Log types
const getGeneralLogs = async (req: Request, res: Response) => {
    return getLogs('General', req, res);
}

const getErrorLogs = async (req: Request, res: Response) => {
    return getLogs('Error', req, res);
}

const getIntegrationLogs = async (req: Request, res: Response) => {
    return getLogs('Integration', req, res);
}

const getTimerLogs = async (req: Request, res: Response) => {
    return getLogs('CyclicJob', req, res);
}

const getExtensionLogs = async (req: Request, res: Response) => {
    return getLogs('Extension', req, res);
}

const getMobileLogs = async (req: Request, res: Response) => {
    return getLogs('MobileRequest', req, res);
}

const getScreenLogs = async (req: Request, res: Response) => {
    return getLogs('Screen', req, res);
}

const getServiceLogs = async (req: Request, res: Response) => {
    return getLogs('ServiceAPI', req, res);
}
// #endregion


export default { getGeneralLogs, getErrorLogs, getIntegrationLogs, getTimerLogs, getExtensionLogs, getMobileLogs, getScreenLogs, getServiceLogs }

