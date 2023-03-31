import { Map, Marker } from "pigeon-maps"


export const ActivityMap = ({ lat, lon, label }) => {
    const position = [lat, lon]
  
    return (
        <Map height={300} defaultCenter={position} defaultZoom={15}>
        <Marker width={50} anchor={position} />
      </Map>
    )
}