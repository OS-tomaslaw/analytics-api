import { AnalyticsKey, specialAnalyticsKey, UOPParam } from '../models/models';
import { Request } from 'express';
import * as paramsJson from '../params.json';
import { environment } from '../environment';
import { readFileSync, existsSync } from 'fs';
import * as path from 'path';

// Get full url for UOP request
export function getUrl(type: string, req: Request) {
    const queryParams = getUOPQueryString(req.query as any);
    return `${environment.URL}?log.attributes.outsystems.log.type=eq:${type}${queryParams}`;
}

// Get string for UOP query params
export function getUOPQueryString(params: Record<AnalyticsKey, string>) {
    let queryString = '';
    const paramKeys = Object.keys(params) as AnalyticsKey[];
    if (paramKeys.length === 0) {
        return queryString;
    }
    paramKeys.forEach((key: AnalyticsKey, index: number) => {
        queryString += `&${buildParamQueryString(key, params[key])}`;
    })

    return queryString;
}

// Get mapped UOP param key
export function getUOPParam(key: string): UOPParam {
    const paramsDictionary = paramsJson as Record<string, UOPParam>;
    const param = paramsDictionary[key];
    if (!param) {
        console.error(`Key not found: ${key}`)
    }
    return param;
}

// Build query string for a param
export function buildParamQueryString(key: AnalyticsKey, value: string): string {
    if (specialAnalyticsKey.includes(key)) {
        return buildSpecialParamQueryString(key, value);
    }
    const param = getUOPParam(key);

    // Define parameter key
    const paramKey = `${param.key}=`

    // Define parameter operator
    let paramOperator = '';
    if (param.operator) {
        paramOperator = `${param.operator}:`
    }

    // Define parameter value
    let paramValue = ''
    if (param.operator === 'wildcard') {
        paramValue = `*${value}*`;
    } else {
        paramValue = value;
    }

    // Join them all together
    return paramKey + paramOperator + paramValue;
}

// Build request headers such as Authorization
export function buildRequestHeaders() {
    const tokenPath = path.join(__dirname, '..', '..', 'token.txt');
    if (!existsSync(tokenPath)) {
        throw Error('Token file not found. Please run the script to generate the token')
    }
    const token = readFileSync(tokenPath, { encoding: 'utf-8' });
    const headers = {
        'Authorization': token
    }
    return headers;
}

// Special params
function buildSpecialParamQueryString(key: AnalyticsKey, value: string) {
    const param = getUOPParam(key);
    if (key === 'auditOnly') {
        return JSON.parse(value) ? `${param.key}=eq:USER` : `${param.key}=`
    } else {
        return '';
    }
}