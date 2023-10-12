import QuickUnion from "./QuickUnion";

export default class Percolation {

    private opened: boolean[];
    private counter_opened: number;
    private qu: QuickUnion;
    private size: number;
    private virtual_top: number;
    private virtual_bottom: number;

    constructor(n: number){
        this.counter_opened = 0;
        this.size = n;
        this.opened = new Array(n*n).fill(false);
        this.qu = new QuickUnion(n*n+2);
        this.virtual_bottom = n*n;
        this.virtual_top = n*n+1;
    }


    public open(row: number, col: number): void {
        if (this.is_open(row, col)) return;

        this.opened[this.xy_to_1d(row, col)] = true;
        this.counter_opened++;

        if (row == 0) {
            this.qu.union(this.xy_to_1d(row, col), this.virtual_top);
        }
        if (row == this.size-1) {
            this.qu.union(this.xy_to_1d(row, col), this.virtual_bottom);
        }
        
        if (row > 0 && this.is_open(row-1, col)) {
            this.qu.union(this.xy_to_1d(row, col), this.xy_to_1d(row-1, col));
        }
        if (row < this.size-1 && this.is_open(row+1, col)) {
            this.qu.union(this.xy_to_1d(row, col), this.xy_to_1d(row+1, col));
        }
        if (col > 0 && this.is_open(row, col-1)) {
            this.qu.union(this.xy_to_1d(row, col), this.xy_to_1d(row, col-1));
        }
        if (col < this.size-1 && this.is_open(row, col+1)) {
            this.qu.union(this.xy_to_1d(row, col), this.xy_to_1d(row, col+1));
        }
    }

    public is_full(row: number, col: number): boolean {
        return this.qu.connected(this.xy_to_1d(row, col), this.virtual_top);
    }

    public is_open(row: number, col: number): boolean {
        return this.opened[this.xy_to_1d(row, col)];
    }

    public xy_to_1d(row: number, col: number): number {
        return (row)*this.size+col;
    }

    public percolates(): boolean {
        return this.qu.connected(this.virtual_bottom, this.virtual_top);
    }

    public get_opened(): boolean[] {
        return this.opened;
    }

    public clear(): void {
        this.qu = new QuickUnion(this.size*this.size+2);
        this.opened = new Array(this.size*this.size).fill(false);
        this.counter_opened = 0;
    }
}