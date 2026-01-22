export interface User {
    id: number;
    nama_user: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> =
    T & {
        auth: {
            user: {
                id: number;
                nama_user: string;
                email: string;
                role: string;
            };
        };
        flash?: {
            message?: string;
        };
    };
