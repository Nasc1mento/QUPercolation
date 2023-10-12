<script lang="ts">
    import Percolation from "$lib/Percolation";

    const size: number = 7;
    const percolation: Percolation = new Percolation(size);    
    let opened: boolean[] = percolation.get_opened();
    let percolates: boolean = false;

    function open(row: number, col: number) {
        console.log(`Opening cell (${row}, ${col})`);
        percolation.open(row, col);
        percolation.percolates();
        opened = percolation.get_opened();
        percolates = percolation.percolates();
    }

    function openRandom() {
        const totalCells = opened.length;
        const cells = Array.from({ length: totalCells }, (_, i) => i);

        const randomIndex = Math.floor(Math.random() * cells.length);
        const randomCell = cells[randomIndex];
        const row = Math.floor(randomCell / size);
        const col = randomCell % size;
        open(row, col);
        cells.splice(randomIndex, 1);     
    }

    function autoFill() {
        const interval = setInterval(() => {
            if (percolates) {
                clearInterval(interval);
                return;
            }
            openRandom();
        }, 100);
    }

    function reset() {
        percolation.clear();
        opened = percolation.get_opened();
        percolates = false;
    }

</script>

<h1>Quick-Union Percolation</h1>

<div>
    <table>      
        {#each Array(size) as _, row}
            <tr>
                {#each Array(size) as _, col}
                    {#if percolates && opened[row * size + col] && percolation.is_full(row, col)}
                        <td class="percolates"></td>
                    {:else if opened[row * size + col]}
                        <td class="opened"> </td>                 
                    {:else}
                        <td class="closed" on:click={() => open(row, col)}>
                    {/if}
                {/each}
            </tr>
        {/each}
    </table>
</div>

<div>
    <div class="auto-fill">
        <button on:click={() => autoFill()}>Auto fill</button>
    </div>
    <div class="reset">
        <button on:click={() => reset()}>Reset</button>
    </div>   
</div>

{#if percolates}
    <h2>Percolates</h2> 
{:else}
    <h2>Does not percolate</h2>
{/if}

<div>
    <p class="description">
    This is a visualization of the Quick-Union Percolation algorithm. 
    Click on the closed cells to open them. 
    The algorithm will determine if the system percolates or not.
    </p>
</div>


<div class="source-code">
    <a  href="https://github.com/Nasc1mento/QUPercolation">Code</a>
</div>


<style>
    div {
        display: flex;
        justify-content: center;
    }

   h1, h2 {
        color: aliceblue;
        text-align: center;
   }

    table {
        border-collapse: collapse; 
        
    }

    td {
        border: 1px solid black;
        width: 50px;
        height: 50px;
        text-align: center;
    }

    .opened {
        background-color: #b0cbff;
    }

    .closed {
        background-color: aliceblue;
    }

    .percolates {
        background-color: #61b0b7;;
    }

    .description {
        color: aliceblue;
        text-align: center;
        width: 50%;
        margin: auto;
    }

    .source-code {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    background: white;
    padding: 10px;
    color: #1a1a40;
}

    button {
        background-color: white;
        color: aliceblue;
        border: none;
        padding: 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        color: #1a1a40;
        justify-content: center;
        margin-top: 5px;
    }

    .auto-fill {
        margin-right: 10px;
    }

    .reset {
        margin-left: 10px;
    }
</style>