<script lang="ts">
    import { Link } from 'svelte-navigator';
    import { to_number } from "svelte/internal";
    import { getVerse } from "../api/bible";
    import { hoveredStrong, lang, bookNames, detailStrong } from "../stores";

    export var verse: Object = undefined;
    export var verseRef: Object = undefined;
    export var ref: String = undefined;
    var refBook: number;
    var refChapter: number;
    var refVerse: number;
    let strongWordDisplayVariant = 2;
    export var translation: String;

    // let detailStrong: Number;

    $: if (!!verseRef) {
        refBook = verseRef['book'];
        refChapter = verseRef['chapter'];
        refVerse = verseRef['verse'];
        verse = verseRef;
    }

    $: if (!!ref) {
        let parts = ref.split('_');
        if (parts.length == 3) {
            refBook = to_number(parts[0]);
            refChapter = to_number(parts[1]);
            refVerse = to_number(parts[2]);
            getVerse(translation, refBook, refChapter, refVerse)
                .then(res => verse = res);
        }
    }

    const setStrongNr = (strongNr: number) => {
        $detailStrong = {
            strongNr,
            verseNr: refVerse ?? verse['verse']
        }
    };
</script>

{#if !!verse}
    <p class="mb-2 has-text-justified">
        {#if !ref && !verseRef}
            <sup class="is-size-7 has-text-primary">{verse['verse'] + 1}</sup>
        {:else}
            <sup class="is-size-7 has-text-primary"><Link to="/{refBook}/{refChapter}/{refVerse}">{bookNames[$lang]['short'][refBook]} {refChapter + 1},{refVerse + 1}</Link></sup>
        {/if}
        {#each verse['chunks'] as chunk }
            {#if chunk['strong']}
                {#if strongWordDisplayVariant == 1}
                    <span class="is-size-5">{chunk['text']}
                        <sup class="is-size-7 has-text-grey-light is-clickable"
                            class:has-background-warning={$hoveredStrong == chunk['strong']['number']}
                            on:mouseover={() => $hoveredStrong = chunk['strong']['number']}
                            on:click={() => setStrongNr(chunk['strong']['number'])}>
                            {chunk['strong']['number']}
                        </sup>
                        {' '}
                    </span>
                {:else if strongWordDisplayVariant == 2}
                    <span>
                        <span class="is-size-5 strong-verse"
                            class:has-background-warning={$hoveredStrong === chunk['strong']['number']}
                            on:mouseover={() => $hoveredStrong = chunk['strong']['number']}
                            on:click={() => setStrongNr(chunk['strong']['number'])}>

                            {chunk['text']}
                        </span>
                        {' '}
                    </span>
                {/if}
            {:else}
                <span class="is-size-5">{chunk['text'] + ' '}</span>
            {/if}
        {/each}
    </p>
{/if}

<style>
    .strong-verse {
        /* text-decoration-style: dotted; */
        border-bottom: 1px dotted #999;
        text-decoration: none;
    }
</style>