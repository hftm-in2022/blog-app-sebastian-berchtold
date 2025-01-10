import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class OidcConfigService {
    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    getRedirectUrl(): string {
        return isPlatformBrowser(this.platformId) ? window.location.origin : 'http://localhost:4200';
    }
}
