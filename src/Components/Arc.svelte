<script lang="ts">
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    // Sample data (you can pass this as a prop or fetch it as needed)
    let data = [226, 301, 11];
  
    let arcContainer: HTMLDivElement;
  
    onMount(() => {
      drawArc();
    });
  
    function drawArc() {

      let tooltip = document.getElementById('tooltip');

      // Set dimensions
      const width = 400;
      const height = 400;
      const radius = Math.min(width, height) / 2;
  
      // Create an SVG element
      const svg = d3
        .select(arcContainer)
        .append('svg')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('width', "100%")
        .attr('height', "100%")
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`); // Center the arc
  
      const colorScale = d3.scaleOrdinal()
        .domain(["Democratic", "Republican", "Undecided"])
        .range(["#0000ff", "#ff0000","#333"]); // Blue for Democratic, Red for Republican

      // Create a pie generator
      const pie = d3.pie<number>();
  
      // Create an arc generator
      const arc = d3.arc()
        .innerRadius(120) // For a pie chart (set to > 0 for a donut chart)
        .outerRadius(radius);
  
      // Generate the arcs and bind data
      svg.selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d', arc as any) // TypeScript may require a type assertion
        .attr('fill', d => {
                const electionData = d.data;
                if (!electionData || electionData < 20) return '#ccc'; // Gray for states without data
        
                return electionData < 270
                ? colorScale("Democratic")
                : colorScale("Republican");
            })
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .attr('transform', 'translate(0, 0) scale(0.8)')

        .on('mouseover', function (event, d) {
        d3.select(this)
        .raise() // Brings the current path to the front
            .transition()
            .duration(200)
            .attr('stroke-width', 3)
            .attr('transform', function () {
                // Get the bounding box of the element
                const bbox = this.getBBox();
                // Calculate the center of the element
                const cx = bbox.x + bbox.width / 2;
                const cy = bbox.y + bbox.height / 2;
                // Translate to center, scale up, then translate back
                return `translate(${cx}, ${cy}) scale(0.9) translate(${-cx}, ${-cy})`;
            });

        const electionData = d.data;
        if (electionData) {
          tooltip.style.visibility = 'visible';
          tooltip.innerHTML = `
            <div class="bg-slate-900 text-white p-4 rounded-md">
                <strong>${electionData} electors</strong><br>
            </div>
          `;
        }
      })      
      .on('mousemove', function (event) {
        tooltip.style.top = (event.pageY + 10) + 'px';
        tooltip.style.left = (event.pageX + 10) + 'px';
      })
      .on('mouseout', function () {
        tooltip.style.visibility = 'hidden';
        d3.select(this)
          .transition()
          .duration(200)
          .attr('stroke-width', 2)
          .attr('transform', 'translate(0, 0) scale(0.8)');
      });
    }

    function PlaySound(soundobj) {
      var thissound = document.getElementById(soundobj);
      thissound.play();
    }

    function StopSound(soundobj) {
      var thissound = document.getElementById(soundobj);
      thissound.pause();
      thissound.currentTime = 0;
    }

  </script>
  
  <div class="p-2 md:p-4 flex justify-center">
    <div class="h-32 w-24 sm:h-52 sm:w-40 md:h-64 md:w-48 md:self-center ">
      <h2 class="mt-2 text-center text-lg sm:text-xl md:text-3xl font-bold">{data[0]}</h2>
      <img 
        src="https://images.aftonbladet-cdn.se/v2/images/39b81e77-d722-4f9a-8d0d-6dff262b0451?fit=crop&format=auto&h=1270&q=50&w=1900&s=9dd8b3fd1457987d0da7845b7255f96b9d5f152c" 
        class="mt-2 rounded-full justify-self-center" 
        alt="Kamala Harris"
        style="width: 100%; object-fit: cover;"
      >
      <h2 class="mt-2 text-center text-xs sm:text-lg md:text-2xl font-bold">Kamala Harris</h2>
      <h2 class="text-center text-xs md:text-lg">Demokraterna</h2>
    </div>
    <div id="map" class="w-40 sm:w-56 md:w-96" bind:this={arcContainer}></div>
    <div class="h-32 w-24 sm:h-52 sm:w-40 md:h-64 md:w-48 md:self-center">
      <h2 class="mt-2 text-center text-lg sm:text-xl md:text-3xl font-bold">{data[1]}</h2>
      <img 
        src="https://media.vanityfair.com/photos/56cb5d18ab73e22d6d9321f6/master/w_1600%2Cc_limit/donald-trump-short-fingered-vulgarian-fingers-bruce-handy-ss13.jpg" 
        class="mt-2 rounded-full justify-self-center" 
        alt="Donald Trump"
        style="width: 100%; object-fit: cover;"
        onmouseover={() => PlaySound('mySound')} 
        onmouseout={() => StopSound('mySound')}
      >
      <h2 class="mt-2 text-center text-xs sm:text-lg md:text-2xl font-bold">Donald Trump</h2>
      <h2 class="text-center text-xs md:text-lg">Republikanerna</h2>
    </div>
  </div>
  <div id="tooltip" style="position: absolute; visibility: hidden;"></div>
  
  <audio id='mySound' src='https://www.myinstants.com/media/sounds/trump-you-are-fake-news.mp3' />
