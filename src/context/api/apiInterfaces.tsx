export interface Product {
    _id:         string;
    name:        string;
    description: string;
    active:      boolean;
    price:       number;
    SKU:         string;
}

export interface ProductsList {
    totalCount: number;
    list:       Product[];
}

export interface ProductCreate {
    name:        string;
    description: string;
    active:      boolean;
    price:       string;
    SKU:         string;
}