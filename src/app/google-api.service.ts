import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '472678585369-dijvbougs8oboqjcsv9tsv52di51rs93.apps.googleusercontent.com',
  scope: 'openid profile email'
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  constructor(private readonly oAuthService: OAuthService) {
    oAuthService.configure(oAuthConfig)
    oAuthService.loadDiscoveryDocument().then(() => {
      oAuthService.tryLoginImplicitFlow().then(() => {
        if(!oAuthService.hasValidAccessToken()){
          oAuthService.initLoginFlow()
        } else{
          oAuthService.loadUserProfile().then((userProfile) => {
            console.log(JSON.stringify(userProfile))
          })
        }
      })
    })
  }
} 
