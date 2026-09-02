export const allTutors = async (searchparams) => {
    const params = new URLSearchParams(searchparams)
    // console.log(params.toString());
    const queryUrl = params.toString()
    // console.log(queryUrl);
    const res = await fetch(`${process.env.TUTORCUE_SERVER_URL}/tutors?${queryUrl}`);
    const data = await res.json();
    return data
}

export const tutorsDetail = async (id, token) => {
    const res = await fetch(`${process.env.TUTORCUE_SERVER_URL}/tutors/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data
}
export const tutorsWsP = async () => {
    const res = await fetch(`${process.env.TUTORCUE_SERVER_URL}/tutors`);
    const data = await res.json();
    return data.tutors
}

export const tutorSlots = async (tutorId, token) => {
    const getRes = await fetch(
        `${process.env.NEXT_PUBLIC_TUTORCUE_SERVER_URL}/tutorslots/${tutorId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    if (!getRes.ok) {
        throw new Error(
            `Slots getting failed, status: ${getRes.status}`
        );
    }
    const getData = await getRes.json();
    return getData;
}