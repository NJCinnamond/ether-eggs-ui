import { Map, Marker } from "pigeon-maps"


export const ActivityMap = ({ lat, lon, zoom }) => {
    const position = [lat, lon];
  
    return (
        <Map height={300} defaultCenter={position} defaultZoom={zoom}>
        <Marker width={50} anchor={position} />
      </Map>
    )
}