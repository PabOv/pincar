import { Component, HostListener, OnInit } from '@angular/core';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  videoUrl: string = '';
  isMobile: boolean = true;

  constructor(private storage: Storage) {
    this.checkIfMobile();
  }

  ngOnInit() {
    this.loadVideo();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkIfMobile();
    if (!this.isMobile && !this.videoUrl) {
      this.loadVideo();
    }
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 767;
  }

  loadVideo() {
    if (!this.isMobile) {
      const videoRef = ref(this.storage, 'videos/corvettess.mp4');
      getDownloadURL(videoRef)
        .then(url => {
          this.videoUrl = url;
        })
        .catch(error => {
          console.error('Error al obtener la URL del video:', error);
        });
    }
  }
}
