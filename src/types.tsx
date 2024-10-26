//Rrequest Type 
export interface RequestType {
    origin: string;
    destination: string;
    travelMode?:string;
}

export interface TextValue {
    text: string;  
    value: number;
}

//For Google maps distance API response
export interface DirectionsResponse {
    geocoded_waypoints: GeocodedWaypoint[];
    routes: Route[];
    status: string;
}

interface GeocodedWaypoint {
    geocoder_status: string;
    place_id: string;
    types: string[];
}

interface Route {
    bounds: Bounds;
    legs: Leg[];
    overview_polyline: Polyline;
    summary: string;
    warnings: string[];
    waypoint_order: number[];
}

interface Bounds {
    northeast: LatLng;
    southwest: LatLng;
}

interface LatLng {
    lat: number;
    lng: number;
}

interface Leg {
    distance: TextValue;
    duration: TextValue;
    end_address: string;
    end_location: LatLng;
    start_address: string;
    start_location: LatLng;
    steps: Step[];
    traffic_speed_entry: any[]; // if you need more specificity, you can define this based on the API's response
    via_waypoint: any[]; // if applicable
}

interface Step {
    distance: TextValue;
    duration: TextValue;
    end_location: LatLng;
    html_instructions: string;
    polyline: Polyline;
    start_location: LatLng;
    travel_mode: string;
    maneuver?: string; // optional, as it may not be in all responses
}

interface Polyline {
    points: string;
}


//For Google Distance Matrix API response
export interface DistanceMatrixResponse {
    destination_addresses: string[];
    origin_addresses: string[];
    rows: DistanceMatrixRow[];
    status: string;
}
  
interface DistanceMatrixRow {
    elements: DistanceMatrixElement[];
}
  
interface DistanceMatrixElement {
    distance: TextValue;
    duration: TextValue;
    status: string;
}


  