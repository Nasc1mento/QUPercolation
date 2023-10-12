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
    <h2>Does not percolate yet</h2>
{/if}

<style>
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
</style>