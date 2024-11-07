<script lang="ts">
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    let mapContainer: HTMLDivElement;
    
  
    // Load GeoJSON data (you can replace this with a fetch function if it's from a file)
    let geoData;
    let electionData;
  
    onMount(async () => {
      const geoResponse = await fetch('/data/us-states.geojson');
      geoData = await geoResponse.json();
      const electionResponse = await fetch('/data/election-results.json');
      electionData = await electionResponse.json();
      drawMap();
    });
  
    function enrichGeoData(geoData, electionData) {
      const dataMap = new Map();
      electionData.forEach(result => {
        dataMap.set(result.state, result);
      });
  
      geoData.features.forEach(feature => {
        const stateName = feature.properties.name; // Adjust this depending on your GeoJSON data structure
        if (dataMap.has(stateName)) {
          feature.properties.electionData = dataMap.get(stateName);
        }
      });
    }
  
    function drawMap() {
      if (!geoData) return;
      let tooltip = document.getElementById('tooltip');

  
      enrichGeoData(geoData, electionData);
  
      const width = 960;
      const height = 600;
  
      const svg = d3
        .select(mapContainer)
        .append('svg')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('width', "100%")
        .attr('height', "100%")
        .style('transform-origin', 'center') // Set transform origin for scaling
        .style('transform', 'scale(0)');
  
      svg.transition()
        .duration(600) // Duration of the animation in milliseconds
        .ease(d3.easeCubicInOut)
        .style('transform', 'scale(1)'); // End with normal size (scale 1)

      const projection = d3
        .geoAlbersUsa()
        .scale(1000)
        .translate([width / 2, height / 2]);
  
      const path = d3.geoPath().projection(projection);
  
  
    const colorScale = d3.scaleOrdinal()
      .domain(["Democratic", "Republican", "DemocraticSelected", "RepublicanSelected"])
      .range(["#0000ff", "#ff0000","#4444ff", "#ff4444"]); // Blue for Democratic, Red for Republican
  
    svg.selectAll('path')
      .data(geoData.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', d => {
        const electionData = d.properties.electionData;
        if (!electionData) return '#ccc'; // Gray for states without data
  
        return electionData.votesDemocratic > electionData.votesRepublican
          ? colorScale("Democratic")
          : colorScale("Republican");
      })
      .attr('stroke', 'white')
      .on('mouseover', function (event, d) {
        d3.select(this)
        .raise() // Brings the current path to the front
            .transition()
            .duration(200)
            .attr('fill', d => {
                const electionData = d.properties.electionData;
                if (!electionData) return '#ccc'; // Gray for states without data
        
                return electionData.votesDemocratic > electionData.votesRepublican
                ? colorScale("DemocraticSelected")
                : colorScale("RepublicanSelected");
            })
            .attr('stroke-width', 2)
            .attr('transform', function () {
                // Get the bounding box of the element
                const bbox = this.getBBox();
                // Calculate the center of the element
                const cx = bbox.x + bbox.width / 2;
                const cy = bbox.y + bbox.height / 2;
                // Translate to center, scale up, then translate back
                return `translate(${cx}, ${cy}) scale(1.1) translate(${-cx}, ${-cy})`;
            });
        const electionData = d.properties.electionData;
        if (electionData) {
          tooltip.style.visibility = 'visible';
          tooltip.innerHTML = `
            <div class="bg-slate-900 text-white p-4 rounded-md">
                <strong>${d.properties.name} - ${electionData.electoralVotes} electors</strong><br>
                Democratic: ${electionData.percentageDemocratic}%<br>
                Republican: ${electionData.percentageRepublican}%
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
          .attr('stroke-width', 1)
          .attr('transform', 'translate(0, 0) scale(1)')
          .attr('fill', d => {
            const electionData = d.properties.electionData;
            if (!electionData) return '#ccc'; // Gray for states without data
    
            return electionData.votesDemocratic > electionData.votesRepublican
            ? colorScale("Democratic")
            : colorScale("Republican");
        }); // Reset transformation
        });
    }

  </script>
  
  <div class="flex justify-center h-64 sm:h-96 md:h-[500px] lg:h-[600px]">
    <div id="map" bind:this={mapContainer}></div>
  </div>
  <div id="tooltip" style="position: absolute; visibility: hidden;"></div>

<style>
    #map {
        background-color: #f0f0f0;
    }
</style>