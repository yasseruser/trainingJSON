import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { UserApp } from '../modules/userApp.model';
import { env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationmanagmentserviceService {


  private keycloak_user_api_url:string =env.keycloakHost+'/admin/realms/opemmindRealm/users'
  private keycloak_role_name_api=env.keycloakHost+'/admin/realms/opemmindRealm/roles/'



  constructor(private http:HttpClient, protected readonly keycloak: KeycloakService) { }


  async LogIn(state: RouterStateSnapshot){
    await this.keycloak.login({
      redirectUri: window.location.origin + state.url
    });
  }

  async SIgnUp(state: RouterStateSnapshot){
    await this.keycloak.register({
      redirectUri: window.location.origin + state.url
    });
  }

  LogOut(){
    this.keycloak.logout(window.location.origin+'/');
  }


  IsAutheticated():boolean{
    return this.keycloak.isLoggedIn();
  }

  getRoles():string[]{
    return this.keycloak.getUserRoles();
  }

  CreateUser(user:UserApp):Observable<any>{
    return this.http.post<any>(this.keycloak_user_api_url,user);
  }

  GetUserByUserName(username:string):Observable<UserApp[]>{
    return this.http.get<UserApp[]>(this.keycloak_user_api_url+'?username='+username);
  }


  GetRoleByName(rolename:string):Observable<any>{
    return this.http.get<any>(this.keycloak_role_name_api+rolename);
  }

  AsignRoleToUser(userId:any,rolelist:any):Observable<any>{
    return this.http.post<any>(env.keycloakHost+'/admin/realms/opemmindRealm/users/'+userId+'/role-mappings/realm',rolelist);
  }

  
  generateRandomString(): string {
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialCharacters = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Generate random characters
    const randomUpperCase = uppercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length));
    const randomLowerCase = lowercaseLetters.charAt(Math.floor(Math.random() * lowercaseLetters.length));
    const randomNumber = numbers.charAt(Math.floor(Math.random() * numbers.length));
    const randomSpecialCharacter = specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));

    // Combine all characters
    const allCharacters = uppercaseLetters + lowercaseLetters + numbers + specialCharacters;

    let randomString = '';

    // Add one uppercase letter, one lowercase letter, one number, and one special character
    randomString += randomUpperCase;
    randomString += randomLowerCase;
    randomString += randomNumber;
    randomString += randomSpecialCharacter;

    // Add random characters until the string length reaches 8
    for (let i = 4; i < 8; i++) {
      randomString += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
    }

    // Shuffle the characters in the string
    randomString = randomString.split('').sort(() => Math.random() - 0.5).join('');

    return randomString;
  }


  generateUniqueUsername(firstName: string, lastName: string): string {
    // Concatenate first name and last name
    let username = firstName.toLowerCase() + lastName.toLowerCase();

    // Replace spaces with underscores
    username = username.replace(/\s/g, '_');

    // Generate random characters to ensure uniqueness
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const randomChars = Array.from({ length: 4 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');

    // Append random characters
    username += randomChars;

    return username;
  }

  

  BodyEmail(username:string,password:string){
    return '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title></title>'
  +'</head><body class="body"><div dir="ltr" class="es-wrapper-color">'
  +'<table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="esd-email-paddings" valign="top"><table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center"><tbody><tr><td class="esd-stripe" align="center"><table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)"><tbody><tr><td class="esd-structure es-p20" align="left"><table cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td width="560" class="esd-container-frame" align="center" valign="top"><table cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td align="center" class="esd-block-text es-infoblock"><p><a target="_blank">View online version</a></p></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr>'
  +'    <td class="esd-structure es-p20t es-p20r es-p20l" align="left">'
  +'<table cellpadding="0" cellspacing="0">'
  +'<tbody><tr>'
  +'          <td width="560" class="esd-container-frame" align="left">'
  +'<table cellpadding="0" cellspacing="0" width="100%" role="presentation">'
      +'<tbody><tr>'
  +'    <td align="center" class="esd-block-image" style="font-size: 0">'
  +'<a target="_blank">'
      +'<img src="https://fihycjp.stripocdn.email/content/guids/cab_pub_7cbbc409ec990f19c78c75bd1e06f215/images/88071525008570164.png" alt="" width="560" class="adapt-img">'
  +'</a>'
  +'</td>'
  +'</tr></tbody></table>'
  +'</td>'
  +'</tr>'
  +'</tbody></table>'
  +'</td>'
  +' </tr></tbody></table></td></tr></tbody></table><table cellpadding="0" cellspacing="0" class="es-content" align="center"><tbody><tr><td class="esd-stripe" align="center"><table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600"><tbody><tr><td class="esd-structure es-p15t es-p20r es-p20l" align="left"><table cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td width="560" class="esd-container-frame" align="center" valign="top"><table cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td align="center" class="esd-block-text es-p15t es-p15b es-p40r es-p40l es-m-p0r es-m-p0l es-m-txt-c" esd-links-underline="none"><h1>OpenMind&nbsp;</h1></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td class="esd-structure es-p20b es-p20r es-p20l" align="left"><table cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td width="560" class="esd-container-frame" align="center" valign="top"><table cellpadding="0" cellspacing="0" width="100%" style="border-radius: 5px; border-collapse: separate;"><tbody><tr><td align="center" class="esd-block-text es-p10t es-m-txt-c"><h3 style="line-height: 150%;">Account Credancials</h3></td></tr><tr><td align="center" class="esd-block-text es-p10t es-p10b"><p style="line-height: 150%;">Password : '+password+' </p><p style="line-height: 150%;">UserName Or Email (this address) : '+username+' </p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div></body></html>';
}


}
