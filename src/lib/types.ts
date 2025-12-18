export interface NavItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface XeoConfig {
    projectName?: string;
    projectDomain?: string;
    logo?: string;
    navigation: NavGroup[];
    openapi?: string;
    asyncapi?: string;
}
