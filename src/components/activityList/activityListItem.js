import { ActivityMap } from '../activityMap/activityMap';
import { EggDiscovery } from '../eggDiscovery/eggDiscovery';
import './activityListItem.css';

export const ActivityListItem = ({ name, lat, lon }) => {
    return (
        <div className="activity-list-item">  
            <div className="activity-name">{name}</div>
            <div className="activity-list-item-contents">
                {lat != undefined && lon != undefined ? (
                        <>
                            <div className="activity-list-item-left">
                                <ActivityMap lat={lat} lon={lon} label={name} zoom={16}/>
                            </div>
                            
                            <div className="activity-list-item-right">
                                {lat != undefined && lon != undefined ? (
                                    <EggDiscovery lat={lat} lon={lon}/>
                                ) : <></>
                                }
                            </div>
                        </>
                    ) : 
                        <div className="activity-list-item-center">
                            No coordinate data found. You may have to wait a few moments for Strava to process your activity.
                        </div>
                }
                
            </div>
        </div>
    )
}