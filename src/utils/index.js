export function generateTable(number, colors) {
   const allItems = [];
   for(let i = 0; i < number/2; i++) {
  	const items = [
    	{
        id: Math.random() + 0.5,
        isFlipped: false,
        isValid: true,
        color: colors[i]
      },
      {
      	id: Math.random(),
        isFlipped: false,
        isValid: true,
        color: colors[i]
      }
    ];
    items.map(item => allItems.push(item));
  }
  return allItems;
}
