import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('backgroundVideo') backgroundVideo!: ElementRef<HTMLVideoElement>;
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

  ngAfterViewInit(): void {
    if (!this.isMobile && this.backgroundVideo) {
      this.playVideo();
    }

    // Reproducir el vídeo cuando la página esté visible nuevamente
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && this.backgroundVideo) {
        this.playVideo();
      }
    });
  }

  onVideoLoaded(): void {
    this.playVideo();
  }

  private playVideo(): void {
    const videoElement = this.backgroundVideo.nativeElement;
    videoElement.muted = true; // Asegura que el vídeo esté silenciado
    videoElement.play().catch(error => {
      console.error('Error al reproducir el vídeo:', error);
    });
  }
}
