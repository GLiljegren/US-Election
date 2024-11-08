<script lang="ts">
    import Map from '../Components/Map.svelte'
    import Arc from '../Components/Arc.svelte'
</script>

<div class="flex flex-col justify-center">
    <div class="mt-12 flex flex-col xl:flex-row justify-center">
        <h2 class="text-center text-red-600 text-5xl font-bold">JUST NU: </h2>
        <h2 class="ml-2 self-center text-center text-5xl font-bold">Så röstade det Amerikanska Folket</h2>
    </div>
    <ol class="mb-4 flex justify-center text-xl">
        <li class="mx-3">✔️ Sveket</li>
        <li class="mx-3">✔️ Lögnerna</li>
        <li class="mx-3">✔️ Hemliga rådgivaren</li>
        <li class="mx-3">➡️ "Det handlar om barnens framtid!"</li>
    </ol>
    <Map />
    <p class="mt-2 italic text-center">Jaa ni ser ju själva, vad folk har röstat i olika delstater blir ju sjukt tydligt när man får se det såhär.</p>
    <h2 class="mt-20 self-center text-center text-5xl font-bold">Valvinst för Trump: Här är siffrorna</h2>
    <Arc />
</div>


