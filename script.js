let reports = [
    {
        name: "Black Calculator",
        type: "Lost",
        category: "Electronics",
        color: "Black",
        location: "Computer Lab",
        date: "2026-10-01",
        description: "Scientific calculator with a scratched cover."
    },
    {
        name: "Scientific Calculator",
        type: "Found",
        category: "Electronics",
        color: "Black",
        location: "Computer Lab",
        date: "2026-10-01",
        description: "Black calculator found near the second row."
    }
];

const form = document.getElementById("itemForm");
const reportsBox = document.getElementById("reports");
const matchesBox = document.getElementById("matches");
const search = document.getElementById("search");

function similarity(a, b) {
    let score = 0;
    if (a.category === b.category) score += 25;
    if (a.color.toLowerCase() === b.color.toLowerCase()) score += 20;
    if (a.location.toLowerCase() === b.location.toLowerCase()) score += 25;

    const wordsA = a.name.toLowerCase().split(/\s+/);
    const wordsB = b.name.toLowerCase().split(/\s+/);
    const common = wordsA.filter(word => wordsB.includes(word) && word.length > 2);
    score += Math.min(common.length * 15, 30);

    return score;
}

function displayReports() {
    const query = search.value.toLowerCase();
    const filtered = reports.filter(r =>
        `${r.name} ${r.category} ${r.location} ${r.description}`
            .toLowerCase().includes(query)
    );

    reportsBox.innerHTML = filtered.map(r => `
        <article class="item">
            <span class="badge">${r.type}</span>
            <h3>${escapeHTML(r.name)}</h3>
            <p><strong>Category:</strong> ${escapeHTML(r.category)}</p>
            <p><strong>Color:</strong> ${escapeHTML(r.color)}</p>
            <p><strong>Location:</strong> ${escapeHTML(r.location)}</p>
            <p><strong>Date:</strong> ${escapeHTML(r.date)}</p>
            <p>${escapeHTML(r.description)}</p>
        </article>
    `).join("");

    findMatches();
}

function findMatches() {
    const lostItems = reports.filter(r => r.type === "Lost");
    const foundItems = reports.filter(r => r.type === "Found");
    const results = [];

    lostItems.forEach(lost => {
        foundItems.forEach(found => {
            const score = similarity(lost, found);
            if (score >= 45) {
                results.push(`
                    <div class="match">
                        <strong>${escapeHTML(lost.name)}</strong>
                        may match
                        <strong>${escapeHTML(found.name)}</strong>
                        — Match score: <strong>${score}%</strong>
                    </div>
                `);
            }
        });
    });

    matchesBox.innerHTML = results.length
        ? results.join("")
        : "<p>No strong potential matches found.</p>";
}

function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
}

form.addEventListener("submit", event => {
    event.preventDefault();

    reports.unshift({
        name: document.getElementById("itemName").value,
        type: document.getElementById("reportType").value,
        category: document.getElementById("category").value,
        color: document.getElementById("color").value,
        location: document.getElementById("location").value,
        date: document.getElementById("date").value,
        description: document.getElementById("description").value
    });

    form.reset();
    displayReports();
});

search.addEventListener("input", displayReports);
displayReports();
