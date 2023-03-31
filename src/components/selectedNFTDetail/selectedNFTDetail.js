import "./selectedNFTDetail.css";

export const SelectedNFTDetail = ({selected}) => {
    const formatAddr = (addr) => addr.slice(0,6) + "..." + addr.slice(-4);

    const getIPFSURL = (uri) => "https://ipfs.io/ipfs/" + uri.split('//')[1];

    return (
        <div className="detail-container">
            <div className="detail-container-contents">
                {selected != undefined && (
                    <>
                        <span>
                            <a href={getIPFSURL(selected.metadata.uri)}>This egg</a> was discovered by {formatAddr(selected.owner)} with the hint:
                        </span>
                        <p>
                            <em>{selected.metadata.hint}</em>
                        </p>
                    </>
                )}
                {selected == undefined && (
                    <span>Select an egg marker to learn more about it</span>
                )}
            </div>
            
        </div>
    )
}