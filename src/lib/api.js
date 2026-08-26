export const allTutors = async() => {
    const res = await fetch("https://tutorcue-server.vercel.app/tutors");
    const data = await res.json();
    return data
}