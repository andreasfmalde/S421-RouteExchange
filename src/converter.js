import { S421toJSON } from "./XMLparser.js";
import * as turf from '@turf/turf';
import { getCoordinates, writeJSONFile } from "./utility.js";


export async function S421ToGeoJSON(filename) {
    try {

        const route = await S421toJSON(filename);
        const geoJSON = turf.featureCollection([]);

        // Convert waypoints to GeoJSON
        const waypoints = [];
        for (let obj of route.Dataset.member) {
            if ('RouteWaypoint' in obj) {
                const WP = S421RouteWaypointToGeoJSON(obj.RouteWaypoint[0])
                if (WP != null) {
                    waypoints.push(WP);
                }
            }
        }

        for (let i = 1; i < waypoints.length - 1; i++) {
            const [circleCenter, tanget1, tangent2] = curveWaypointLeg(waypoints[i - 1], waypoints[i], waypoints[i + 1]);
            if (circleCenter == null) {
                geoJSON.features.push(tanget1, tangent2);
            } else {
                geoJSON.features.push(circleCenter, tanget1, tangent2);
            }

        }

        // Filter out the tangents and add leg lines between the curves
        const legs = [];

        geoJSON.features
            .filter(feature => (feature.geometry.type === "Point" && feature.properties.type === "tangent"))
            .forEach(point => {
                let linkedTo = point.properties.linkedTo;
                let linkedPoint = geoJSON.features.find(feature => feature.properties.waypoint === linkedTo && feature.properties.linkedTo === point.properties.waypoint);
                if (linkedPoint != undefined) {
                    //console.log([point.geometry.coordinates, linkedPoint.geometry.coordinates])
                    let ID = `${point.properties.waypoint}-${linkedPoint.properties.waypoint}`;
                    let reversedID = `${linkedPoint.properties.waypoint}-${point.properties.waypoint}`;
                    if (!legs.includes(ID) && !legs.includes(reversedID)) {
                        geoJSON.features.push(turf.lineString([point.geometry.coordinates, linkedPoint.geometry.coordinates]))
                        legs.push(ID)
                    }
                }
                if (point.properties.linkedTo === waypoints[0].properties.id) {
                    geoJSON.features.push(turf.lineString([waypoints[0].geometry.coordinates, point.geometry.coordinates]))
                } else if (point.properties.linkedTo === waypoints[waypoints.length - 1].properties.id) {
                    geoJSON.features.push(turf.lineString([waypoints[waypoints.length - 1].geometry.coordinates, point.geometry.coordinates]))
                }
            });




        // Delete all the tangent points from the geoJSON feature collection
        geoJSON.features = geoJSON.features.filter(feature => !(feature.geometry.type === "Point" && feature.properties.type === "tangent"))


        return geoJSON;


    } catch (err) {
        console.log(err);
        return null;
    }
}

// TODO: Some waypoints do not have coordinates, need to handle this
function S421RouteWaypointToGeoJSON(waypoint) {
    if (waypoint.geometry[0] instanceof Object) {
        const coordinates = getCoordinates(waypoint.geometry[0].pointProperty[0].Point[0].pos[0]);
        if (coordinates[0] == NaN || coordinates[1] == NaN) {
            return null;
        }
        return turf.point(coordinates, {
            type: "waypoint",
            id: parseInt(waypoint.routeWaypointID[0]),
            radius: parseFloat(waypoint.routeWaypointTurnRadius[0])
        });
    }
    return null;
}



function curveWaypointLeg(W1, W2, W3) {
    // No curve is needed if the turn radius is 0 or less
    if (W2.properties.radius <= 0.0) {
        const t1 = turf.point(W2.geometry.coordinates, { "type": "tangent", "waypoint": W2.properties.id, "number": 1, "linkedTo": W1.properties.id });
        const t2 = turf.point(W2.geometry.coordinates, { "type": "tangent", "waypoint": W2.properties.id, "number": 2, "linkedTo": W3.properties.id });
        return [null, t1, t2];
    }
    // Create imaginary lines between the waypoints
    const line1 = turf.lineString([W1.geometry.coordinates, W2.geometry.coordinates]);
    const line2 = turf.lineString([W2.geometry.coordinates, W3.geometry.coordinates]);
    // Calculate the bearings
    const bearing21 = turf.bearing(W2, W1);
    const bearing23 = turf.bearing(W2, W3);
    // Calculate the midline bearing
    let midLineBearing = calculateMidLineBearing(bearing21, bearing23);

    // Calculate the circle center and the tangent points between the circle and the imaginary lines
    const [circleCenter, tangent1, tangent2] = calculateCircleCenterCoordinates(midLineBearing, W2, line1, line2);

    // Calculate bearing from circle center to tangent points
    const cBearing1 = turf.bearing(circleCenter, tangent1);
    const cBearing2 = turf.bearing(circleCenter, tangent2);

    // Confirm that the order of the bearings is correct for drawing the circle arc
    const [b1, b2] = determineBearingOrder(cBearing1, cBearing2);

    // Specify the tangent points, making it easier to delete them later
    tangent1.properties = { "type": "tangent", "waypoint": W2.properties.id, "number": 1, "linkedTo": W1.properties.id };
    tangent2.properties = { "type": "tangent", "waypoint": W2.properties.id, "number": 2, "linkedTo": W3.properties.id };

    // Create the lineString for the circle arc
    const circleArc = turf.lineArc(circleCenter, W2.properties.radius, b1, b2, { steps: 100 });
    return [
        circleArc,
        tangent1,
        tangent2
    ];
}


function determineBearingOrder(b1, b2) {
    b1 = convertTo360(b1) % 360;
    b2 = convertTo360(b2) % 360;

    if (b1 > b2) {
        let temp = b1;
        b1 = b2;
        b2 = temp;
    }

    let difference = b2 - b1;

    if (difference > 180) {
        // The difference is greater than 180, so the shortest way/angle is through 0 degrees N.
        // Therefore, the largest angle will be returned first, then the smallest
        return [convertToNorthBearing(b2), convertToNorthBearing(b1)];
    } else {
        // The difference is less than 180, so the smallest angle will be returned first, then the larger one
        return [convertToNorthBearing(b1), convertToNorthBearing(b2)];
    }
}


function calculateCircleCenterCoordinates(midLineBearing, W2, line1, line2) {
    let circleCenter, circle, difference, t1, t2;
    let distance = 30; // Distance from W2 to circle center in km. Can be improved to be dynamic
    let previousDistance = distance * 2;
    let count = 0;

    while (true) {
        circleCenter = turf.destination(W2, distance, midLineBearing);
        circle = turf.lineArc(circleCenter, W2.properties.radius, 0, 360, { steps: 100 });
        t1 = turf.lineIntersect(circle, line1);
        t2 = turf.lineIntersect(circle, line2);
        difference = Math.abs(previousDistance - distance);

        if (t1.features.length === 0 || t2.features.length === 0) {
            // Decrease the distance
            previousDistance = distance;
            distance -= difference * 0.5;
        } else if (t1.features.length === 1 && t2.features.length === 1) {
            // Increase the distance
            previousDistance = distance;
            distance += difference * 0.5;
        }
        else if (t1.features.length > 1 || t2.features.length > 1) {
            if (Math.abs(previousDistance - distance) < 1e-4) {
                // Intersections are found that satisfy the conditions
                break;
            }
            previousDistance = distance;
            distance += difference * 0.5;
        }

        if (count > 60) {
            console.log(`Used more than ${count} iterations... breaking`)
            break
        }
        count++;

    }
    return [circleCenter, t1.features[0], t2.features[0]];

}

function calculateMidLineBearing(bearing1, bearing2) {

    let b1 = convertTo360(bearing1) % 360;
    let b2 = convertTo360(bearing2) % 360;

    // Make sure b1 is the smallest bearing
    if (b1 > b2) {
        let temp = b1;
        b1 = b2;
        b2 = temp;
    }

    const difference = b2 - b1;

    if (difference > 180) {
        let angle = (b1 + difference / 2) % 360;
        return convertToNorthBearing((angle + 180) % 360);
    } else {
        return convertToNorthBearing((b1 + difference / 2) % 360);
    }


}

function convertTo360(bearing) {
    if (bearing < 0) {
        bearing += 360;
    }
    return bearing;
}

function convertToNorthBearing(bearing) {
    if (bearing > 180) {
        bearing -= 360;
    }
    return bearing;
}



// Main entry point of application
async function main(){
    try{
        const json = await S421ToGeoJSON('/Users/andreas/Desktop/S-421/TestData/RTE-TEST-GFULL.s421.gml');
        if(json == null){
            throw new Error('Conversion failed');
        }
        writeJSONFile(json, './client/route.json');
    }catch(e){
        console.log(`Something went wrong... Error: ${e}`);
    }
    
}

// Run the code
main();