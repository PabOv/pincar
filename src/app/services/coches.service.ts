import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, docData, updateDoc, deleteDoc, getDocs, getDoc, query, where } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { catchError, from, map, Observable, of } from 'rxjs';
import { Coche } from '../models/coche';

@Injectable({
  providedIn: 'root'
})
export class CochesService {
  private cochesCollection;

  constructor(private firestore: Firestore, private storage: Storage) {
    // Asegúrate de usar la referencia modular de la colección
    this.cochesCollection = collection(this.firestore, 'coches');
  }

  getCoches(): Observable<Coche[]> {
    // Utiliza `getDocs` para obtener los documentos de la colección
    return new Observable<Coche[]>((observer) => {
      getDocs(this.cochesCollection)
        .then((querySnapshot) => {
          const coches: Coche[] = [];
          querySnapshot.forEach((docSnapshot) => {
            const cocheData = docSnapshot.data() as Coche;
            coches.push({ id: docSnapshot.id, ...cocheData });
          });
          observer.next(coches);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getCochesVendidos(): Observable<Coche[]> {
    const vendidosQuery = query(this.cochesCollection, where('vendido', '==', true));

    return new Observable<Coche[]>((observer) => {
      getDocs(vendidosQuery)
        .then((querySnapshot) => {
          const cochesVendidos: Coche[] = [];
          querySnapshot.forEach((docSnapshot) => {
            const cocheData = docSnapshot.data() as Coche;
            cochesVendidos.push({ id: docSnapshot.id, ...cocheData });
          });
          observer.next(cochesVendidos);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getCochesNoVendidos(): Observable<Coche[]> {
    const vendidosQuery = query(this.cochesCollection, where('vendido', '==', false));

    return new Observable<Coche[]>((observer) => {
      getDocs(vendidosQuery)
        .then((querySnapshot) => {
          const cochesVendidos: Coche[] = [];
          querySnapshot.forEach((docSnapshot) => {
            const cocheData = docSnapshot.data() as Coche;
            cochesVendidos.push({ id: docSnapshot.id, ...cocheData });
          });
          observer.next(cochesVendidos);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getCocheById(id: string): Observable<Coche | null> {
    const cocheDocRef = doc(this.firestore, `coches/${id}`);
    return from(getDoc(cocheDocRef)).pipe(
      map(docSnap => {
        if (docSnap.exists()) {
          const data = docSnap.data() as Coche;
          return { ...data, id: docSnap.id };
        } else {
          console.log('No se encontró el documento');
          return null;
        }
      }),
      catchError(error => {
        console.error('Error al obtener el coche:', error);
        return of(null);
      })
    );
  }

  async uploadImages(images: File[]): Promise<string[]> {
    const uploadPromises = images.map(async (image) => {
      const filePath = `coches/${new Date().getTime()}_${image.name}`;
      const storageRef = ref(this.storage, filePath);
      await uploadBytes(storageRef, image);
      return getDownloadURL(storageRef);
    });

    return Promise.all(uploadPromises);
  }

  async uploadImagesForm(images: File[]): Promise<string[]> {
    const uploadPromises = images.map(async (image) => {
      const filePath = `compramos-tu-coche/${new Date().getTime()}_${image.name}`;
      const storageRef = ref(this.storage, filePath);
      await uploadBytes(storageRef, image);
      return getDownloadURL(storageRef);
    });

    return Promise.all(uploadPromises);
  }

  async addCoche(coche: Coche): Promise<void> {
    await addDoc(this.cochesCollection, coche);
  }

  async updateCoche(coche: Coche): Promise<void> {
    const cocheDocRef = doc(this.firestore, `coches/${coche.id}`);
    await updateDoc(cocheDocRef, {
      vendido: coche.vendido,
      reservado: coche.reservado // Añade esta línea para actualizar el estado de reservado
    });
  }

  async deleteCoche(cocheId: string): Promise<void> {
    const cocheDocRef = doc(this.firestore, `coches/${cocheId}`);
    await deleteDoc(cocheDocRef);
  }

  async updateCocheFields(cocheId: string, fieldsToUpdate: Partial<Coche>): Promise<void> {
    if (!cocheId) {
      throw new Error('El ID del coche es obligatorio para actualizar.');
    }

    const cocheDocRef = doc(this.firestore, `coches/${cocheId}`);
    await updateDoc(cocheDocRef, fieldsToUpdate);
  }
}
