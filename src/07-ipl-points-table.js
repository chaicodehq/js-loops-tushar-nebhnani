/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  // Your code here
  if (!Array.isArray(matches) || matches.length === 0) {
    return [];
  }

  const rtn = {};

  for (const t of matches) {
    if (t.result === "win") {
      if (t.winner in rtn) {
        rtn[t.winner].played += 1;
        rtn[t.winner].won += 1;
        rtn[t.winner].points += 2;
      } else {
        rtn[t.winner] = {
          team: t.winner,
          played: 1,
          won: 1,
          lost: 0,
          tied: 0,
          noResult: 0,
          points: 2,
        };
      }

      const lost = t.winner === t.team1 ? t.team2 : t.team1;

      if (lost in rtn) {
        rtn[lost].played += 1;
        rtn[lost].lost += 1;
      } else {
        rtn[lost] = {
          team: lost,
          played: 1,
          won: 0,
          lost: 1,
          tied: 0,
          noResult: 0,
          points: 0,
        };
      }
    } else if (t.result === "tie") {
      if (t.team1 in rtn) {
        rtn[t.team1].played += 1;
        rtn[t.team1].tied += 1;
        rtn[t.team1].points += 1;
      } else {
        rtn[t.team1] = {
          team: t.team1,
          played: 1,
          won: 0,
          lost: 0,
          tied: 1,
          noResult: 0,
          points: 1,
        };
      }

      if (t.team2 in rtn) {
        rtn[t.team2].played += 1;
        rtn[t.team2].tied += 1;
        rtn[t.team2].points += 1;
      } else {
        rtn[t.team2] = {
          team: t.team2,
          played: 1,
          won: 0,
          lost: 0,
          tied: 1,
          noResult: 0,
          points: 1,
        };
      }
    } else {
      if (t.team1 in rtn) {
        rtn[t.team1].played += 1;
        rtn[t.team1].noResult += 1;
        rtn[t.team1].points += 1;
      } else {
        rtn[t.team1] = {
          team: t.team1,
          played: 1,
          won: 0,
          lost: 0,
          tied: 0,
          noResult: 1,
          points: 1,
        };
      }

      if (t.team2 in rtn) {
        rtn[t.team2].played += 1;
        rtn[t.team2].noResult += 1;
        rtn[t.team2].points += 1;
      } else {
        rtn[t.team2] = {
          team: t.team2,
          played: 1,
          won: 0,
          lost: 0,
          tied: 0,
          noResult: 1,
          points: 1,
        };
      }
    }
  }

  return Object.values(rtn).sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    return a.team.localeCompare(b.team);
  });
}