<script lang="ts">
    import Percolation from "$lib/Percolation";
 
    let percolation = new Percolation(7);
    let size = percolation.get_size();
    let opened = percolation.get_opened();
    let percolates: boolean;

    function open(row: number, col: number) {
        console.log(row, col);
        percolation.open(row, col);
        opened = percolation.get_opened();
        percolates = percolation.percolates();
    }
</script>

<h1>Quick-Union Percolation</h1>

<div>
    <table>
        
        {#each Array(size) as _, row}
            <tr>
                {#each Array(size) as _, col}
                    {#if opened[row * size + col]}
                    <td class="opened">
                    </td>
                    {:else}
                        <td class="closed" on:click={() => open(row, col)}>
                    {/if}
                {/each}
            </tr>
        {/each}
    </table>
</div>

{#if percolates}
    <h2>Percolates</h2>
{:else}
    <h2>Does not percolate</h2>
{/if}

<p class="description">
    This is a visualization of the Quick-Union Percolation algorithm. 
    Click on the closed cells to open them. 
    The algorithm will determine if the system percolates or not.
</p>

<div class="source-code">
    <a  href="https://github.com/Nasc1mento/QUPercolation"><i class="fab fa-github"></i> Code</a>
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
        background-color: #00ff00;
    }

    .closed {
        background-color: #ff0000;
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
    background: white; /* Optional: Add a background color for better visibility */
    padding: 10px; /* Optional: Add some padding for better presentation */
    color: #1a1a40;
}
</style>