const Breadcrumb = () => {
    return (
        <>
            <nav aria-label="breadcrumb" className="d-flex justify-content-center">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Library</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Data</li>
                </ol>
            </nav>
        </>
    )
}

export default Breadcrumb; 