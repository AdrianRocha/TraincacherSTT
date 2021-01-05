export interface ArrivalHop {
    time: string;
    platform: number;
    cancelled: boolean;
    direction: Direction;
}

interface Direction {
    name: string;
}