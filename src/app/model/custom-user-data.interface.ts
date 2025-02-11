export interface CustomUserData {  // type alias verwenden anstelle interfaces
    realm_access?: {
        roles: string[];
    };
    resource_access?: {
        [key: string]: {
            roles: string[];
        };
    };
    name?: string;
    email?: string;
    [key: string]: any;
}
