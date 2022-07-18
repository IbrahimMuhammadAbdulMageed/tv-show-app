export interface IShow {
    id: number;
    name: string;
    language: string;
    genres: string[];
    premiered: string;
    rating: {
        average: number;
    };
    network: {
        country: {
            code: string;
        };
    };
    image: {
        medium: string;
        original: string;
    };
    summary: string;
}
