export class PaginationDto {
    page: number;
    date: string;
    clinicName: string;
    consumedMedications: string[];
    filterMode: 'strictMode' | 'laxMode'
}
