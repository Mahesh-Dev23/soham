

const consignmentArraySort = (arraySort) => {
    arraySort.sort((a, b) => {
        let x = a.client.toLowerCase();
        let y = b.client.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    })
}

export default consignmentArraySort
