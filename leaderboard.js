let results =
    JSON.parse(localStorage.getItem("leaderboard")) || [];
const leaderboardBody =
    document.getElementById("leaderboardBody");
results.sort(function(a, b) {
    return b.score - a.score;
});
if (results.length === 0) {
    leaderboardBody.innerHTML = `
        <tr>
            <td colspan="4">
                No quiz results available yet.
            </td>
        </tr>
    `;
} else {
    results.forEach(function(result, index) {
        const row =
            document.createElement("tr");
        const rank =
            index + 1;
        const percentage =
            Math.round(
                (result.score / result.total) * 100
            );
        row.innerHTML = `
            <td>${rank}</td>
            <td>${result.name}</td>
            <td>${result.score}/${result.total}</td>
            <td>${percentage}%</td>
        `;
        leaderboardBody.appendChild(row);
    });
}