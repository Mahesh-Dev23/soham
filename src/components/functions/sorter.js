// const arraySort = () => {
//     sortedClient = perClient.filter(res => res.client != null || undefined)
    
//     if(sortValue === "lower"){
//         sortedClient.sort((a, b) => a.amount - b.amount)  
//     } else if(sortValue === "higher"){
//         sortedClient.sort((a, b) => b.amount - a.amount)  
//     } else if(sortValue === "alphabetic"){
//         sortedClient.sort((a, b) => {
//             let x = a.client.toLowerCase();
//             let y = b.client.toLowerCase();
//             if (x < y) {return -1;}
//             if (x > y) {return 1;}
//             return 0;
//         })
//     } else {
//         sortedClient.sort((a, b) => {
//             let x = a.client.toLowerCase();
//             let y = b.client.toLowerCase();
//             if (x < y) {return -1;}
//             if (x > y) {return 1;}
//             return 0;
//         })
//     }
// }
// export default arraySort