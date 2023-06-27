import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import mapboxgl, { LngLat } from 'mapbox-gl';
import { Observable } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';
import { CgcaService } from 'src/app/service/cgca.service';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-form-cgca',
  templateUrl: './form-cgca.component.html',
  styleUrls: ['./form-cgca.component.scss']
})
export class FormCgcaComponent {
  currentM: mapboxgl.Marker | null = null;
  lngLat: any;

  addForm = this.fb.group({
    tenCang: '',
    loai: '',
    description: '',
    diaChi: JSON.stringify({
      type: 'point',
      coordinates: [0, 0]
    }),
  });


  constructor(
    private fb: FormBuilder,
    private cgService: CgcaService,
    private dialog: MatDialogRef<FormCgcaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService,
  ) {
      this.addForm = this.fb.group({
        tenCang: '',
        loai: '',
        description: '',
        diaChi: JSON.stringify({
          type: 'point',
          coordinates: [0, 0]
        }),
      });
  }


  ngOnInit(): void {
    (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1IjoibG5oYW42NCIsImEiOiJjbGlqeWNka2YwY3V0M3FrZHoyczl1ZTdpIn0.VLwelCnbKYFs3E4CHPzd1A';
    const self = this;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/lamb1908393/cliv0rxz4000101pfh34dacuj',
      center: [106.4072905995, 10.353204],
      zoom: 5,
    });
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    }), 'top-left')

    
    if(this.data.diaChi != null){
      this.lngLat = JSON.parse(this.data.diaChi).coordinates;
      const marker1 = new mapboxgl.Marker({
      color: 'red',
    })
      .setLngLat(this.lngLat)
      .addTo(map);
    this.currentM = marker1;
    }
    
    map.on('click', async (e) => {
      if (this.currentM) {
        this.currentM.remove();
        this.currentM = null;
      }

      const { lng, lat } = e.lngLat;
      this.lngLat = [lng, lat];

      const marker = new mapboxgl.Marker({
        color: 'red',
      })
        .setLngLat(this.lngLat)
        .addTo(map);

      this.currentM = marker;

      this.addForm.patchValue({
        diaChi: JSON.stringify({
          type: 'Point',
          coordinates: [lng, lat]
        })
      });
    })

    this.addForm.patchValue(this.data);
    
  }

  onFormSubmit() {
    if (this.addForm.valid) {
      
      if (this.data) {
        this.cgService
          .update(this.data.id, this.addForm.value)
          .subscribe({
            next: (val: any) => {
              const message = "Cập nhật thành công";
              this.coreService.openSnackBar(message);
              this.dialog.close(true);
            },
            error: (err: any) => {
              alert(err);
            }
          });
      } else {
        // console.log(this.addForm.value);
        this.cgService.add(this.addForm.value).subscribe({
          next: (val: any) => {
            const message = "Thêm thành công";
            this.coreService.openSnackBar(message);
            this.dialog.close(true);
          },
          error: (err: any) => {
            alert(err);
          }
        });
      }
    }

  }
}
