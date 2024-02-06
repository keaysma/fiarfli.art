export type ContentFit = string | "contain" | "cover";
export type ContentType = string | "link" | "iframe" | "contained";
type Width = string | "1" | "2" | "3" | "4" | "5" | "6";
type Height = string | "1" | "2" | "3";

export interface SiteContent {
    about: string;
    commissions: {
        enabled: boolean;
        enabledMessage: string;
        disabledMessage: string;
    };
    commissionsEnabled: boolean;
    contact: string;
    contactFormEnabled: boolean;
}

export interface Content {
    path: string;
    title: string;
    desc: string;
    tags: string[];
    date: string;
    width: Width;
    height: Height;
    fit: ContentFit;
    type?: ContentType;

    html?: string;
    color?: string;
    thumbnail?: string;
    hidden?: boolean;
}

export interface Block {
    name: string;
    content: Content[];
}

export interface GallerySettings{
    blockIndex: number;
    contentIndex: number;
    open: boolean;
    fullscreen: boolean;
}

export type AdminPage = 'about' | 'commissions' | 'contactme' | 'gallery';
