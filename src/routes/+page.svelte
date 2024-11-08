<script lang="ts">
    import Map from '../Components/Map.svelte'
    import Arc from '../Components/Arc.svelte'
</script>

<div class="flex flex-col justify-center">
    <div class="mt-4 md:mt-12 flex flex-col xl:flex-row justify-center">
        <h2 class="text-center text-red-600 text-5xl font-bold">JUST NU: </h2>
        <h2 class="ml-2 self-center text-center text-5xl font-bold">Så röstade det Amerikanska Folket</h2>
    </div>
    <ol class="mt-2 mb-4 flex justify-center font-bold md:font-normal text-md md:text-xl">
        <li class="mx-1 md:mx-3">✔️ Sveket</li>
        <li class="mx-1 md:mx-3">✔️ Lögnerna</li>
        <li class="mx-1 md:mx-3">✔️ Hemliga rådgivaren</li>
        <li class="mx-1 md:mx-3 hidden md:block">➡️ "Det handlar om barnens framtid!"</li>
    </ol>
    <Map />
    <p class="mt-2 italic text-center">Jaa ni ser ju själva, vad folk har röstat i olika delstater blir ju sjukt tydligt när man får se det såhär.</p>

    <div class="mt-12 p-4 md:p-0 flex justify-center">
     <iframe data-creative-load-listener="" id="200_280_express_html_inpage_0.if" src="https://s0.2mdn.net/sadbundle/1066264661680193536/HTML_240701_MB_P55877_P_C_EQRange_Tactical_banners_640x320_V2R0/HTML_240701_MB_P55877_P_C_EQRange_Tactical_banners_640x320_V2R0/index.html?ev=01_252" width="640" height="320" frameborder="0" scrolling="no" allowfullscreen="true" style="width: 640px; height: 320px;"></iframe>
    </div>
    <div class="mb-4 border-black">
        <h2 class="mt-20 self-center text-center text-5xl font-bold">RYSAREN - Här är valsiffrorna</h2>
        <p class="mt-2 self-center text-center text-lg font-bold">"Too big to rig" - var slagorden i Trumps kampanj... och så blev även utfallet"</p>
        <p class="self-center text-center text-lg font-bold">så lät det när vi pratade med utrikespolitiska kommentatorn Niki Seyedi</p>
        <p class="mt-2 self-center text-center text-md">Tidigt onsdag morgon stod det klart att Donald Trump blir Förenta Staternas 47:e president</p>
        <p class="self-center text-center text-md">Här kan du se resultatet osv, bing bong etc</p>
    </div>
    <div class="border-t border-black">
        <Arc />
    </div>

</div>


