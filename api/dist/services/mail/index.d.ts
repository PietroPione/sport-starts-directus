import type { Accountability, SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import type { SendMailOptions, Transporter } from 'nodemailer';
import type { AbstractServiceOptions } from '../../types/index.js';
export type EmailOptions = Omit<SendMailOptions, 'from'> & {
    from?: string;
    template?: {
        name: string;
        data: Record<string, any>;
    };
};
export declare class MailService {
    schema: SchemaOverview;
    accountability: Accountability | null;
    knex: Knex;
    mailer: Transporter;
    constructor(opts: AbstractServiceOptions);
    send<T>(options: EmailOptions): Promise<T | null>;
    private renderTemplate;
    private getDefaultTemplateData;
}
