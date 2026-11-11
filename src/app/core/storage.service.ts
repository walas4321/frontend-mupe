import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StorageType } from './storage.model';

@Injectable({ providedIn: 'root' })
export class StorageService {

	existsKey(key: string): boolean {
		return localStorage.getItem(key) !== null;
	}

	getFromCache(key: string): StorageType {
		const itemLocalStorage = localStorage.getItem(key);
		return itemLocalStorage && JSON.parse(itemLocalStorage ?? null);
	}

	getByKey<T>(key: string): T | null {
		const item = localStorage.getItem(key);
		if (!item) return null;

		try {
			return JSON.parse(item) as T;
		} catch (e) {
			console.error(`Error parsing storage item with key: ${key}`, e);
			return null;
		}
	}

	handleError<T>(result: T, _ = 'operation') {
		return (__: HttpErrorResponse): Observable<T> => {
			return of(result);
		};
	}

	handleErrorRefresh<T>(result: T, _ = 'operation') {
		return (__: HttpErrorResponse): Observable<T> => {
			this.destroyAll();
			return of(result);
		};
	}

	saveByKey<T>(key: string, data: T) {
		localStorage.setItem(key, JSON.stringify(data));
	}

	save(key: string, data: any) {
		localStorage.setItem(key, data);
	}

	update<T>(key: string, data: T): void {
		localStorage.setItem(key, JSON.stringify(data));
	}

	destroy(key: string) {
		localStorage.removeItem(key);
	}

	destroyAll() {
		// Preservar favoritos de usuarios antes de limpiar
		const favoritosKeys: string[] = [];
		const favoritosData: { [key: string]: string } = {};

		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key && key.startsWith('menu-favoritos-')) {
				favoritosKeys.push(key);
				favoritosData[key] = localStorage.getItem(key) || '';
			}
		}

		// Limpiar todo el localStorage
		localStorage.clear();

		// Restaurar los favoritos
		favoritosKeys.forEach(key => {
			localStorage.setItem(key, favoritosData[key]);
		});
	}
}
