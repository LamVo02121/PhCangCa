import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MapService } from '../service/map.service';
import { CgcaService } from '../service/cgca.service';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { WeatherService } from '../service/weather.service';
// import MapboxDirections from '@mapbox/mapbox-gl-directions';
@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss']
})
export class MapboxComponent implements OnInit {
  url: string = '../../assets/dlCang.json';
  data: any;
  cities: any;
  // trans: any;
  lnglat: any;
  currentM: mapboxgl.Marker | null = null;
  popup: mapboxgl.Popup | null = null;
  makerS: mapboxgl.Marker | null = null;

  constructor(private http: HttpClient,
    private mapService: MapService,
    private cgService: CgcaService,
    private weaService: WeatherService) {
    this.getJSON('../../assets/dlCang.json').subscribe(data => {
      this.data = data;
    });
    this.getJSON('../../assets/vn.json').subscribe(cities => {
      this.cities = cities;
      // console.log(this.cities)
    });
    // this.getJSON('../../assets/weatherTranlate.json').subscribe(trans => {
    //   this.trans = trans;
    //   // console.log(this.cities)
    // });
    this.lnglat = null;
  }

  public getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }

  public toggle(): void {
    const x = document.getElementById("changeStyle") as HTMLButtonElement;
    if (x.style.display == "none")
      x.style.display = "block";
    else
      x.style.display = "none";
  }

  ngOnInit(): void {
    (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1IjoibGFtYjE5MDgzOTMiLCJhIjoiY2xpaXpocGxzMDJ4ODNjbzAycm9jOWE4MCJ9.ic-f8F6Edlq0aen91W49yA';
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/lamb1908393/cliv0rxz4000101pfh34dacuj',
      center: [112.28535389055675, 15.874397336723362],
      // center: [106.368475, 10.361568],

      zoom: 5, // starting zoom
    });
    // thanh thu phong
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    }), 'top-left')

    const changeMapStyle = (style: string) => {
      map.setStyle(`mapbox://styles/lamb1908393/${style}`);
    };

    map.on('style.load', () => {
      map.addSource('cangcaSrc', {
        type: 'geojson',
        data: this.data
      });

      map.addLayer({
        'id': 'cangca',
        'type': 'symbol',
        'source': 'cangcaSrc',
        'layout': {
          'icon-image': 'harbor',
          'icon-allow-overlap': true,
          'icon-size': 1,
          'text-field': ['format', ['get', 'Ten_Cang'], { 'font-scale': 1 }],
          'text-size': 12,
          'text-offset': [0, 2]

        },
        'paint': {
          'text-color': '#000'
        }
      });

      map.addSource("weatherSrc", {
        type: "raster",
        tiles: ['https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=d91f07538949f4c0ca41b49bd199d95c'],
        // tileSize: 256,
      })

      map.addLayer({
        id: 'raster-layer',
        type: 'raster',
        source: 'weatherSrc',
      })

      // change style
      const style_button = document.getElementById('changeStyle') as HTMLButtonElement;
      // console.log(style_button)
      const a = style_button.getElementsByTagName('input');

      for (const input of a) {
        input.onclick = () => {
          const style = input.value;
          changeMapStyle(style);
        };
      }

      // maker static
      const el = document.createElement('div');
      el.style.background = 'url(../../assets/mytho.png)';
      el.style.backgroundSize = '100%';
      el.style.width = '50px';
      el.style.height = '50px';
      el.style.cursor = 'pointer';

      const popup = new mapboxgl.Popup({ offset: 25, className: "maker-popup" }).setText("Mỹ Tho, Tiền Giang");
      const makerCty = new mapboxgl.Marker(el)
        .setLngLat([106.368475, 10.361568])
        .setPopup(popup)
        .addTo(map);

      // zoom in
      map.on('click', (e) => {
        map.flyTo({ center: e.lngLat, essential: true, zoom: 12 });
      })

      // maker click
      map.on('click', (e) => {
        // console.log("a:" ,this.makerS)
        // console.log("b:" ,this.currentM)
        const coordinate = e.lngLat;
        this.lnglat = [coordinate.lng, coordinate.lat];
        // this.currentM = this.makerS;

        if (this.currentM) {
          this.currentM.remove();
          this.currentM = null;
        }

        const makerAdd = new mapboxgl.Marker({ color: 'red', draggable: true, scale: 1});
        makerAdd.setLngLat(coordinate).addTo(map)
        if (makerAdd !== this.makerS) {
          this.currentM = makerAdd;
        }

        // tat popup khi click vi tri khac
        const popups = document.getElementsByClassName("mapboxgl-popup");
        if (popups.length) {
          this.currentM?.remove();
          this.currentM = null;
        }

        this.mapService.setLngLat(this.lnglat.toString());
      });

      // popup cang
      map.on('click', 'cangca', (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
        const coordinates = e.features![0].geometry.coordinates.slice();
        if (coordinates) {
          this.currentM?.remove();
        }

        // if (this.popup)
        //   this.popup.remove();

        // console.log(coordinates)
        const start: number[] = coordinates;
        const detail = e.features![0].properties;
        let popuphtml =
          `<strong>Cảng: ${detail.Ten_Cang}</strong>
        <p>Loại cảng: ${detail.Loai}</p>
        <p>Mô tả: ${detail.description}</p>
        <button class='btn btn-primary p-1' id="direct"">Direction</button>`;
        const popup = new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(popuphtml)
          .addTo(map);
        this.popup = popup;

        // direction
        const direct_button = document.getElementById('direct');
        direct_button!.addEventListener('click', () => {
          rmDirection();
          direction(start);
        });


      });

      this.cities.forEach((city: any) => {
        getWeatherData(city.name, city.lng, city.lat);
      })

    })
    // -------------------------------------------------------------------------------------------------------------------------------------------
    map.on('mouseenter', 'cangca', () => {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'cangca', () => {
      map.getCanvas().style.cursor = '';
    });

    // popup maker
    this.cgService.getList().subscribe({
      next: (data) => {
        data.forEach((location: any) => {
          const locationObject = JSON.parse(location.diaChi);
          if (location.diaChi && locationObject.coordinates) {
            const coordinate = new mapboxgl.LngLat(
              locationObject.coordinates[0],
              locationObject.coordinates[1]
            );
            // if (this.currentM) {
            //   this.currentM?.remove();
            //   this.currentM = null;
            // } 
            // <button class='btn btn-primary p-1'>Direction</button>
            let popuphtml =
              `<strong>Cảng: ${location.tenCang}</strong>
              <p>Loại cảng: ${location.loai}</p>
              <p>Mô tả: ${location.description}</p>
           `;
            const popup = new mapboxgl.Popup({ offset: 25, className: "maker-popup" })
              .setHTML(popuphtml);

            const maker = new mapboxgl.Marker()
              .setLngLat(coordinate)
              .setPopup(popup)
              .addTo(map);

            this.makerS = maker
          }
        })
      }
    })


    const getWeatherData = (text: string, longitude: number, latitude: number) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lon=${longitude}&lat=${latitude}&lang=vi&appid=d91f07538949f4c0ca41b49bd199d95c`
      )
        .then(response => response.json())
        .then(data => {
          const description = data.weather[0].description;
          const temperature = data.main.temp;
          const humidity = data.main.humidity;
          const wind_speed = data.wind.speed;
          const wind_deg = data.wind.deg;

          // dich theo tu dien json dynamic
          // const tranlations: any = this.trans;
          // const s = translateSentence(description, tranlations)
          // console.log(s)
          // console.log(this.trans);   

          let popuphtemp =
            `<strong> ${text}</strong><br>
              <strong>Nhiệt độ: </strong>${(temperature - 273.15).toFixed(2)}°C<br>
              <strong>Độ ẩm: </strong>${humidity}<br>
              <strong>Mô tả: </strong>${description}<br>
              <strong>Hướng gió: </strong>${wind_deg}°<br>
              <strong>Tốc độ gió: </strong>${wind_speed}m/s<br>
            <button class='btn btn-primary p-1'>Direction</button>`;
          const popup = new mapboxgl.Popup({ offset: 25, className: "maker-popup" })
            .setHTML(popuphtemp)

          const el = document.createElement('div');
          el.style.background = 'url(../../assets/weather.png)';
          el.style.backgroundSize = 'cover';
          el.style.width = '50px';
          el.style.height = '50px';
          el.style.cursor = 'pointer';
          const marker = new mapboxgl.Marker(el)
            .setLngLat([longitude, latitude])
            .setPopup(popup)
            .addTo(map);

          this.makerS = marker;
          this.popup = popup;
          // const popups = document.getElementsByClassName("mapboxgl-popup");
          // console.log(popups)
          // if (popups.length) {
          //   this.currentM?.remove();
          //   this.currentM = null;
          // }

        })
        .catch(error => {
          console.error('Error retrieving weather data:', error);
        });
    }
    // const start = [106.368475, 10.361568];

    async function getRoute(start: any, end: any) {
      // console.log("asv ", start)
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}&language=vi`,
        { method: 'GET' }
      );
      const json = await query.json();
      let data = json.routes[0];
      const route = data.geometry.coordinates;
      // if route exists, reset
      if (map.getSource('route')) {
        const source: mapboxgl.GeoJSONSource = map.getSource('route') as mapboxgl.GeoJSONSource;
        source.setData({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route
          }
        });
      }
      else {
        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: route
              }
            }
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 7,
            'line-opacity': 0.75
          }
        });
      }
      
      const instructions = document.getElementById('instructions');
      const steps = data.legs[0].steps;
      instructions!.style.display = 'block';
      let tripInstructions = '';
      for (const step of steps) {
        tripInstructions += `<li><i class="fa-solid fa-motorcycle"></i> ${step.maneuver.instruction}</li>`;
      }
      instructions!.innerHTML =
        `<p><strong>Thời gian ước tính: ${Math.floor(
          data.duration / 60
        )} min </strong>
        <button class='btn btn-primary p-1 float-end' id="close_direct"">
        <i class="fa-solid fa-xmark"></i>
        </button>
        </p><ul id="ds" style="padding-left: 0px; list-style: none;">${tripInstructions}</ul>`;

        // stop direction when click 
        const close_direct = document.getElementById('close_direct');
        close_direct!.addEventListener('click', () => {
          // console.log("casca");
          rmDirection();
          instructions!.style.display = 'none';
          data = null; 
        });
    }

    // map.on('click', (e) => {
    //   const lng = e.lngLat.lng;
    //   const lat = e.lngLat.lat;
    //   const info = getWeatherData(lng, lat);
    //   // console.log(info)
    // })
    // this.cities = [];

    // const translateSentence = (sentence: string, translations: any): string => {
    //   const translatedSentence = translations.translations[sentence.toLowerCase()] || sentence;
    //   return translatedSentence;
    // }
    let end: any;
    let start1: any;

    // stop direction
    const rmDirection = () => {
      if (map.getLayer('point'))
        map.removeLayer('point');

      if (map.getSource('point'))
        map.removeSource('point');

      if (map.getLayer('end'))
        map.removeLayer('end');

      if (map.getSource('end'))
        map.removeSource('end');

        if (map.getLayer('route'))
        map.removeLayer('route');

      if (map.getSource('route'))
        map.removeSource('route');

        start1 = [];
        map.off('click', a);
    }

    function a(e: any) {
      const lngLat = e.lngLat;
      const coords: number[] = [lngLat.lng, lngLat.lat];
      end = coords;

      if (map.getLayer('end')) {
        const source: mapboxgl.GeoJSONSource = map.getSource('end') as mapboxgl.GeoJSONSource;
        source.setData({
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: coords
              }
            }
          ]
        });

      } else {
        map.addLayer({
          id: 'end',
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: coords
                  }
                }
              ]
            }
          },
          paint: {
            'circle-radius': 10,
            'circle-color': '#f30'
          }
        });
      }
      // console.log("end", end)
      // console.log("start ", start1 )
      getRoute(start1, end);

    }

    // chi duong
    const direction = (start: any) => {
      end = start;
      start1 = start;
      // console.log("call cho điểm ", start)
      getRoute(start, start);
      //reset all layer
      if (map.getLayer('point')) {
        const source: mapboxgl.GeoJSONSource = map.getSource('point') as mapboxgl.GeoJSONSource;
        source.setData({
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: start
              }
            }
          ]
        });
        if (map.getSource('end'))
        map.removeSource('end');

        if (map.getLayer('route'))
        map.removeLayer('route');
      } else {
        map.addLayer({
          id: 'point',
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: start
                  }
                }
              ]
            }

          },
          paint: {
            'circle-radius': 10,
            'circle-color': '#3887be'
          }
        });
      }
      map.on('click', a)
    }

  }

}