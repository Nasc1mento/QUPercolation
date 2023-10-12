export default class QuickUnion {

    private vector: number[] = [];
    private size: number[] = [];

    constructor(private id: number) {
        for(let i = 0; i < id; i++) {
            this.vector[i] = i;
            this.size[i] = 1;
        }
    }

    private root(i: number): number {
        while(i != this.vector[i]) { i = this.vector[i] }
        return i;
    }

    public connected(p: number, q: number): boolean{
        return this.root(p) == this.root(q);
    }

    public union(p: number, q: number): void {
        let i: number  = this.root(p);
        let j: number = this.root(q);
        
        if (this.size[i] < this.size[j]) {
            this.vector[i] = j;
            this.size[j] += this.size[i];
        } else {
            this.vector[j] = i;
            this.size[i] += this.size[j];
        }
    }
}