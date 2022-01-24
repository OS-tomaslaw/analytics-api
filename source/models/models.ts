export type AnalyticsKey = 'serial' | 'offset' | 'limit' | 'from' | 'to' | 'appKey' | 'espacesList' | 'message' | 'source' | 'tenantId' | 'server' | 'accessMode' | 'screen' | 'extensionId' | 'auditOnly' | 'errorOnly' | 'stackTrace' | 'logId' | 'type' | 'action' | 'timerName' | 'logIds' | 'dataType' | 'keys' | 'id';

export const specialAnalyticsKey: AnalyticsKey[] = ['auditOnly'];

export type UOPQueryOperator = 'eq' | 'in' | 'wildcard' | 'gte' | 'lte';

export interface UOPParam {
    key: string;
    operator: UOPQueryOperator;
}
