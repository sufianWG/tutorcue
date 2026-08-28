export const allTutors = async (searchparams) => {
    const params = new URLSearchParams(searchparams)
    // console.log(params.toString());
    const queryUrl = params.toString()
    // console.log(queryUrl);
    const res = await fetch(`${process.env.TUTORCUE_SERVER_URL}/tutors?${queryUrl}`);
    const data = await res.json();
    return data.tutors
}

export const tutorsWsP = async() => {
    const res = await fetch(`${process.env.TUTORCUE_SERVER_URL}/tutors`);
    const data = await res.json();
    return data.tutors
}

export const paginationData = async () => {
    const res = await fetch(`${process.env.TUTORCUE_SERVER_URL}/tutors`);
    const data = await res.json();
    return data.pagination
}