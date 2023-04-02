import { useState, useEffect } from 'react';

import { getStravaActivites, getAccessToken } from "../../services/strava";

import { ActivityListItem } from './activityListItem';

const maxActivityIdx = 10;

export const ActivityList = () => {
    const [activities, setActivities] = useState([]);

    const queryParameters = new URLSearchParams(window.location.search);
    const code = queryParameters.get("code");

    useEffect(() => {
        const fetchActivities = async () => {
            const accessToken = await getAccessToken(code);
            const activities = await getStravaActivites(accessToken);
            return activities;
        };
    
        fetchActivities()
        .then(data => {
            if (data.length && data['errors'] == undefined && !activities.length) {
                const cutoff = data.length > maxActivityIdx ? maxActivityIdx : data.length;
                data = data.slice(0,cutoff);
                setActivities(data);
            }
        });
    }, []);

    return (
        <div>
            {activities == undefined || !activities.length && (
                <h3>Finding your activites...</h3>
            )}
            {Object.entries(activities).map(([key, activity]) => (
                <ActivityListItem 
                    key={activity.external_id}
                    lat={activity['end_latlng'].length ? activity['end_latlng'][0] : undefined} 
                    lon={activity['end_latlng'].length ? activity['end_latlng'][1] : undefined}
                    name={activity.name}
                    activity_id={activity.external_id}
                />
            ))}
            
        </div>
        
    )
}