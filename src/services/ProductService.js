export const ProductService = {
    getProductsData() {
        return [
            {
                id: '1',
                marca: 'IPHONE',
                modelo: '12',
                imei: '123456789087654',
                numero_telefonico: '(228) 134-6352',
                fecha_hora: '10-01-2024 08:05:29',
            },
            {
                id: '2',
                marca: 'ZTE',
                modelo: 'BLADE A51',
                imei: '684359875426535',
                numero_telefonico: '(228) 169-5642',
                fecha_hora: '11-02-2024 23:01:29',
            },
            {
                id: '3',
                marca: 'ZTE',
                modelo: 'BLADE V2',
                imei: '684579787542154',
                numero_telefonico: '(228) 196-3542',
                fecha_hora: '13-06-2024 21:04:29',
            },
            {
                id: '4',
                marca: 'SAMSUNG',
                modelo: 'GALAXY A05',
                imei: '875963542154004',
                numero_telefonico: '(228) 187-5421',
                fecha_hora: '16-08-2024 11:22:29',
            },
            {
                id: '5',
                marca: 'SAMSUNG',
                modelo: 'GALAXY A15',
                imei: '8799693656475485',
                numero_telefonico: '(228) 122-4441',
                fecha_hora: '02-01-2024 12:21:29',
            },
            {
                id: '6',
                marca: 'SAMSUNG',
                modelo: 'GALAXY S24',
                imei: '658545787896542',
                numero_telefonico: '(228) 145-8796',
                fecha_hora: '10-06-2024 13:56:29',
            },
            {
                id: '7',
                marca: 'IPHONE',
                modelo: '13',
                imei: '659856325412545',
                numero_telefonico: '(228) 188-4121',
                fecha_hora: '08-03-2024 16:24:29',
            },
            {
                id: '8',
                marca: 'IPHONE',
                modelo: '14',
                imei: '879563521454546',
                numero_telefonico: '(228) 145-7745',
                fecha_hora: '03-02-2024 11:30:29',
            },
            {
                id: '9',
                marca: 'IPHONE',
                modelo: '15',
                imei: '5845789656325455',
                numero_telefonico: '(228) 177-5444',
                fecha_hora: '01-01-2024 12:01:29',
            },
            {
                id: '10',
                marca: 'OPPO',
                modelo: 'A54',
                imei: '58787856326569854',
                numero_telefonico: '(228) 134-6352',
                fecha_hora: '13-01-2024 14:15:29',
            },
            {
                id: '11',
                marca: 'OPPO',
                modelo: 'A53S',
                imei: '879653254521543',
                numero_telefonico: '(228) 134-6352',
                fecha_hora: '11-02-2024 14:24:29',
            },
        ];
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 5));
    },

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    },

    getProducts() {
        return Promise.resolve(this.getProductsData());
    },

    getProductsWithOrdersSmall() {
        return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
    },

    getProductsWithOrders() {
        return Promise.resolve(this.getProductsWithOrdersData());
    }
};

