export type Options = {
    body?: string;
    template?: string;
    data?: Record<string, any>;
    to: string;
    type: 'wysiwyg' | 'markdown' | 'template';
    subject: string;
};
declare const _default: import("@directus/extensions").OperationApiConfig<Options>;
export default _default;
