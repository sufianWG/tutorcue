const tutorDetailPage = async({params}) => {
    const {id} = await params;
    console.log(id);
    return (
        <div>
            This tutor detail page.
        </div>
    );
};

export default tutorDetailPage;