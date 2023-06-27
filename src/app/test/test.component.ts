import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit{
 
  ngOnInit(): void {
    
};

// Initialize Windy API
// windyInit(options, windyAPI => {
//     // windyAPI is ready, and contain 'map', 'store',
//     // 'picker' and other usefull stuff

//     const { map } = windyAPI;
//     // .map is instance of Leaflet map

//     L.popup()
//         .setLatLng([50.4, 14.3])
//         .setContent('Hello World')
//         .openOn(map);
// });
}

// (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1IjoibGFtYjE5MDgzOTMiLCJhIjoiY2xpaXpocGxzMDJ4ODNjbzAycm9jOWE4MCJ9.ic-f8F6Edlq0aen91W49yA';
//     const map = new mapboxgl.Map({
//       container: 'map', // container ID
//       style: 'mapbox://styles/lamb1908393/cliv0rxz4000101pfh34dacuj',
//       center: [106.368475, 10.361568],
//       zoom: 15, // starting zoom
//     });
//     const start = [106.368475, 10.361568];
// async function getRoute(end: any) {
//   // make a directions request using cycling profile
//   // an arbitrary start will always be the same
//   // only the end or destination will change
//   const query = await fetch(
//     `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
//     { method: 'GET' }
//   );
//   const json = await query.json();
//   const data = json.routes[0];
//   const route = data.geometry.coordinates;
//   const geojson = {
//     type: 'Feature',
//     properties: {},
//     geometry: {
//       type: 'LineString',
//       coordinates: route
//     }
//   };
//   // if the route already exists on the map, we'll reset it using setData
//   if (map.getSource('route')) {
//     // map.getSource('route').setData(geojson);
//     const source: mapboxgl.GeoJSONSource = map.getSource('route') as mapboxgl.GeoJSONSource;
//     source.setData({
//       type: 'Feature',
//       properties: {},
//       geometry: {
//         type: 'LineString',
//         coordinates: route
//       }
//     });
//   }
//   // otherwise, we'll make a new request
//   else {
//     map.addLayer({
//       id: 'route',
//       type: 'line',
//       source: {
//         type: 'geojson',
//         data: {
//           type: 'Feature',
//           properties: {},
//           geometry: {
//             type: 'LineString',
//             coordinates: route
//           }
//         }
//       },
//       layout: {
//         'line-join': 'round',
//         'line-cap': 'round'
//       },
//       paint: {
//         'line-color': '#3887be',
//         'line-width': 5,
//         'line-opacity': 0.75
//       }
//     });
//   }
//   // add turn instructions here at the end
//   const instructions = document.getElementById('instructions');
//   const steps = data.legs[0].steps;

//   let tripInstructions = '';
//   for (const step of steps) {
//     tripInstructions += `<li>${step.maneuver.instruction}</li>`;
//   }
//   instructions!.innerHTML = `<p><strong>Trip duration: ${Math.floor(
//     data.duration / 60
//   )} min 🚴 </strong></p><ol>${tripInstructions}</ol>`;
// }

// map.on('load', () => {
//   // make an initial directions request that
//   // starts and ends at the same location
//   getRoute(start);

//   // Add starting point to the map
//   map.addLayer({
//     id: 'point',
//     type: 'circle',
//     source: {
//       type: 'geojson',
//       data: {
//         type: 'FeatureCollection',
//         features: [
//           {
//             type: 'Feature',
//             properties: {},
//             geometry: {
//               type: 'Point',
//               coordinates: start
//             }
//           }
//         ]
//       }
//     },
//     paint: {
//       'circle-radius': 10,
//       'circle-color': '#3887be'
//     }
//   });
//   // this is where the code from the next step will go
//   map.on('click', (e) => {
//     // const coords = Object.keys(e.lngLat).map((key) => e.lngLat[key]);
//     const lngLat = e.lngLat;
//     const coords: number[] = [lngLat.lng, lngLat.lat];
//     // const coords = e.lngLat;
//     const end = {
//       type: 'FeatureCollection',
//       features: [
//         {
//           type: 'Feature',
//           properties: {},
//           geometry: {
//             type: 'Point',
//             coordinates: coords
//           }
//         }
//       ]
//     };
//     if (map.getLayer('end')) {
//       // map.getSource('end').setData(end);
//       const source: mapboxgl.GeoJSONSource = map.getSource('end') as mapboxgl.GeoJSONSource;
//       source.setData({
//         type: 'FeatureCollection',
//         features: [
//           {
//             type: 'Feature',
//             properties: {},
//             geometry: {
//               type: 'Point',
//               coordinates: coords
//             }
//           }
//         ]
//       });
//     } else {
//       map.addLayer({
//         id: 'end',
//         type: 'circle',
//         source: {
//           type: 'geojson',
//           data: {
//             type: 'FeatureCollection',
//             features: [
//               {
//                 type: 'Feature',
//                 properties: {},
//                 geometry: {
//                   type: 'Point',
//                   coordinates: coords
//                 }
//               }
//             ]
//           }
//         },
//         paint: {
//           'circle-radius': 10,
//           'circle-color': '#f30'
//         }
//       });
//     }
//     getRoute(coords);
//   });
// });

// let end: any;
// let start1: any;

// function a(e:any){
//   const lngLat = e.lngLat;
//   const coords: number[] = [lngLat.lng, lngLat.lat];
//   end = coords;
  
//   if (map.getLayer('end')) {
//     const source: mapboxgl.GeoJSONSource = map.getSource('end') as mapboxgl.GeoJSONSource;
//     source.setData({
//       type: 'FeatureCollection',
//       features: [
//         {
//           type: 'Feature',
//           properties: {},
//           geometry: {
//             type: 'Point',
//             coordinates: coords
//           }
//         }
//       ]
//     });
    
//   } else {
//     map.addLayer({
//       id: 'end',
//       type: 'circle',
//       source: {
//         type: 'geojson',
//         data: {
//           type: 'FeatureCollection',
//           features: [
//             {
//               type: 'Feature',
//               properties: {},
//               geometry: {
//                 type: 'Point',
//                 coordinates: coords
//               }
//             }
//           ]
//         }
//       },
//       paint: {
//         'circle-radius': 10,
//         'circle-color': '#f30'
//       }
//     });
//   }
//   // console.log("end", end)
//   // console.log("start ", start1 )
//  getRoute(start1, end);
  
// }

// const direction = (start: any) => {
//   end = start;
//   start1 = start;
//   console.log("call cho điểm ", start )
//   getRoute(start, start);
//   //reset all layer
//   if (map.getLayer('point')) {
//     const source: mapboxgl.GeoJSONSource = map.getSource('point') as mapboxgl.GeoJSONSource;
//     source.setData({
//       type: 'FeatureCollection',
//       features: [
//         {
//           type: 'Feature',
//           properties: {},
//           geometry: {
//             type: 'Point',
//             coordinates: start
//           }
//         }
//       ]
//     });
   
//     if (map.getLayer('end')) {
//       map.removeLayer('end');
//     }
//       if (map.getSource('end'))
//       map.removeSource('end');
  
//   }else{
//   map.addLayer({
//     id: 'point',
//     type: 'circle',
//     source: {
//       type: 'geojson',
//       data: {
//         type: 'FeatureCollection',
//         features: [
//           {
//             type: 'Feature',
//             properties: {},
//             geometry: {
//               type: 'Point',
//               coordinates: start
//             }
//           }
//         ]
//       }

//     },
//     paint: {
//       'circle-radius': 10,
//       'circle-color': '#3887be'
//     }
//   });
//   }

  
//   map.on('click', a)
//     //  console.log("call end" , end)
//   // getRoute(start, end);
// }
