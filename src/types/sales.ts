export type ProcessStatus = 'WAITING_PAYMENT' | 'IN_PROGRESS' | 'ON_HOLD' | 'FILED_USCIS' | 'APPROVED' | 'DENIED' | 'CANCELLED';
export type PaymentStatus = 'WAITING_PAYMENT' | 'PARTIALLY_PAID' | 'PAID';
export type ContractStatus = 'PENDING_GENERATION' | 'WAITING_SIGNATURE' | 'SIGNED';
export type UscisStatus = 'NOT_FILED' | 'RECEIPT_NOTICE' | 'RFE' | 'APPROVED' | 'DENIED';

export interface ProcessType {
    id: string;
    code: string;
    name: string;
    description?: string;
}

export interface ClientProcess {
    id: string;
    clientId: string;
    clientName: string;
    clientEmail: string;
    processType: ProcessType;
    internalProcessNumber: string;
    status: ProcessStatus;
    totalAmount: number;
    installments: number;
    paymentStatus: PaymentStatus;
    contractStatus: ContractStatus;
    contractUrl?: string;
    uscisReceiptNumber?: string;
    uscisStatus?: UscisStatus;
    createdAt: string;
    updatedAt: string;
}

export interface ProcessStep {
    id: string;
    title: string;
    description?: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'DONE';
    date?: string;
    note?: string;
}

export interface ProcessDocument {
    id: string;
    fileName: string;
    fileUrl: string;
    documentType: string;
    status: 'UPLOADED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
    uploadedAt: string;
    adminComment?: string;
}
