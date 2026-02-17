/**
 * 🪔 Sharma ji ki Diwali Decoration
 *
 * Sharma ji apne ghar ko Diwali pe sajana chahte hain light strings se.
 * Unke paas ek budget hai aur market mein alag alag colors ki light strings
 * hain different lengths mein. Sharma ji sab kuch lena chahte hain, lekin
 * budget se zyada nahi!
 *
 * Color rates (per meter):
 *   - "golden" = Rs 50/meter
 *   - "multicolor" = Rs 40/meter
 *   - "white" = Rs 30/meter
 *   - Any other color = Rs 35/meter
 *
 * Rules:
 *   Step 1 - Use for...of to loop through lightStrings and add ALL of them
 *     to selected list with their cost calculated
 *   Step 2 - Use a while loop to check: agar totalCost > budget, toh remove
 *     the LAST item from selected, subtract its cost, and keep removing until
 *     totalCost <= budget
 *
 * @param {Array<{color: string, length: number}>} lightStrings - Available light strings
 * @param {number} budget - Sharma ji ka budget in rupees
 * @returns {{ selected: Array<{color: string, length: number, cost: number}>, totalLength: number, totalCost: number }}
 *
 * Validation:
 *   - Agar lightStrings array nahi hai ya budget positive number nahi hai,
 *     return: { selected: [], totalLength: 0, totalCost: 0 }
 *
 * @example
 *   diwaliLightsPlan(
 *     [{ color: "golden", length: 5 }, { color: "white", length: 10 }, { color: "multicolor", length: 3 }],
 *     400
 *   )
 *   // golden: 5*50=250, white: 10*30=300, multicolor: 3*40=120
 *   // Total = 670 > 400, remove multicolor (670-120=550), still > 400,
 *   // remove white (550-300=250), 250 <= 400
 *   // => { selected: [{ color: "golden", length: 5, cost: 250 }], totalLength: 5, totalCost: 250 }
 */
export function diwaliLightsPlan(lightStrings, budget) {
  // Your code here
  let rtn = {
    selected: [],
    totalLength: 0,
    totalCost: 0
  }
  let rate;
  let individualCost = 0;

  if (!(Array.isArray(lightStrings)) || budget <= 0 || typeof budget !== 'number') {
    return rtn
  }

  for (const str of lightStrings) {    
    switch (str.color) {
      case "golden":
        rate = 50
        break;
      case "white":
        rate = 30
        break;
      case "multicolor":
        rate = 40
        break;
      
      default:
        rate = 35
        break;
    }

    individualCost = (rate * str.length)
    rtn.selected.push({
      color: str.color,
      length: str.length,
      cost: individualCost
    })
    rtn.totalLength += str.length
    rtn.totalCost += individualCost    
  }

  while (rtn.totalCost > budget) {
    let removdItem = rtn.selected.pop()
    rtn.totalLength -= removdItem.length
    rtn.totalCost -= removdItem.cost
  }

  return rtn
}


console.log(diwaliLightsPlan([{ color: "golden", length: 5 }, { color: "white", length: 10 }, { color: "multicolor", length: 3 }], 400));

