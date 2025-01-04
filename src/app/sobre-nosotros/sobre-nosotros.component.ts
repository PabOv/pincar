import { Component } from '@angular/core';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';

@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.component.html',
  styleUrl: './sobre-nosotros.component.css'
})

export class SobreNosotrosComponent {
  imageUrl!: string;

  constructor(private storage: Storage) {}

  ngOnInit() {
    const videoRef = ref(this.storage, 'images/sobre_nosotros.jpg');
    getDownloadURL(videoRef).then(url => {
      this.imageUrl = url;
    }).catch(error => {
      console.error('Error al obtener la URL:', error);
    });
  }
}
