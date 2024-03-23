export interface Currency {
    id? : number,
    source? : string;
    target? : string;
    conversionRate : number;
    lastUpdatedDate? : Date;
    sourceValue? : string;
    targetValue? : string;
}