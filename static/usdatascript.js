function extractTableData() {
    // Select the table by ID
    const tables = document.querySelectorAll('.state.table--election-type-G');
    
    let jsonData = [];

    tables.forEach(table => {

        // Extract the state name
        const stateName = table.querySelector('.state__state-name').innerText.trim();
        
        // Extract electoral votes
        const electoralVotesText = table.querySelector('.state__meta .text').innerText;
        const electoralVotes = parseInt(electoralVotesText.replace('Electoral Votes: ', '').trim(), 10);
        
        // Extract candidate data
        const rows = table.querySelectorAll('tbody tr.candidate');
        const candidates = [];
        let votesRepublican;
        let votesDemocratic;

        rows.forEach(row => {
            const nameMobile = row.querySelector('.cand--name-mobile')?.innerText.trim() || '';
            const nameDesktop = row.querySelector('.cand--name-desktop')?.innerText.trim() || '';
            const party = row.querySelector('.cand--party-short')?.innerText.trim() || '';
            const votes = row.querySelector('tr.candidate > td:nth-child(2) > span')?.innerText.replace(/,/g, '').trim() || '0';
            const percentage = row.querySelector('tr.candidate > td:nth-child(3) > span')?.innerText.replace('%', '').trim() || '0';

            candidates.push({
                name: `${nameDesktop} (${party})`.trim(),
                votes: parseInt(votes, 10),
                percentage: parseFloat(percentage)
            });
            


            if (`${nameDesktop} (${party})`.trim() === 'Donald Trump ((R))') {
                votesRepublican = parseInt(votes, 10);
                percentageRepublican = parseFloat(percentage);
            } else if (`${nameDesktop} (${party})`.trim() === 'Kamala Harris ((D))') {
                votesDemocratic = parseInt(votes, 10);
                percentageDemocratic = parseFloat(percentage);
            }
        });

        // Create the JSON object
        jsonData.push({
            state: stateName,
            electoralVotes: electoralVotes,
            votesDemocratic,
            votesRepublican,
            percentageDemocratic,
            percentageRepublican,
            totalVotes: (votesDemocratic + votesRepublican),
            candidates: candidates
        });
    });


    return jsonData;
}

// Call the function and log the output
console.log(extractTableData());
