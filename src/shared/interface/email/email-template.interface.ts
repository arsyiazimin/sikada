export interface emailTemplate {
    to: string;
    from?: string;
    cc?: string;
    bcc?: string;
    subject: string;
    template: string;
    context: any;
    attachments?: any;
}