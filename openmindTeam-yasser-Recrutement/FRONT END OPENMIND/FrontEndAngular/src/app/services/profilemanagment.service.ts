import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IntrviewData, PageableProfileDto, ProfileDto } from '../modules/profile.model';
import { env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilemanagmentService {

  private backenHost:string =env.backendHost;

  constructor(private http:HttpClient) { }

  public getProfiles(page:number, size:number):Observable<PageableProfileDto> {
    return this.http.get<PageableProfileDto>(`${this.backenHost}/PROFILESERVICE/profile/profiles?page=${page}&size=${size}`);
  }
  public getProfilesWithProfileNotAssociatedToOffer(page:number,size:number,offer_id:string):Observable<PageableProfileDto>{
    return this.http.get<PageableProfileDto>(this.backenHost+"/PROFILESERVICE/profile/profiles?page="+page+"&size="+size+"&offer_id="+offer_id);
  }

  public getProfileById(profileid:string):Observable<ProfileDto> {
    return this.http.get<ProfileDto>(`${this.backenHost}/PROFILESERVICE/profile/${profileid}`);
  }

  public saveBasicProfileInformation(profile: ProfileDto):Observable<ProfileDto> {
    return this.http.post<ProfileDto>(`${this.backenHost}/PROFILESERVICE/profile/saveprofile`, profile);
  }
  public updateBasicProfileInformation(profile: ProfileDto):Observable<ProfileDto> {
    return this.http.post<ProfileDto>(`${this.backenHost}/PROFILESERVICE/profile/updateprofile`, profile);
  }
  public saveIntrviewData(intrviewData:IntrviewData):Observable<IntrviewData>{
    return this.http.post<IntrviewData>(this.backenHost+"/PROFILESERVICE/intrviewdata/save",intrviewData);
  }

  public saveProfileCv(file: File, profile_id: string):Observable<any> {
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append('profile_id', profile_id);
    return this.http.post<any>(`${this.backenHost}/PROFILESERVICE/profile/savefilesprofile`, formdata);
  }


  getCvFile(profileid: string): Observable<ArrayBuffer> {
    return this.http.get(`${this.backenHost}/${profileid}/PROFILESERVICE/profile/cv`, { responseType: 'arraybuffer' });
  }

  getAudioFile(profileid: string): Observable<ArrayBuffer> {
    return this.http.get(`${this.backenHost}/PROFILESERVICE/profile/${profileid}/audio`, { responseType: 'arraybuffer' });
  }

  getProfilesOfAnCandidate(candidateid:string,page:number,size:number):Observable<PageableProfileDto>{
    return this.http.get<PageableProfileDto>(this.backenHost+'/PROFILESERVICE/profile/'+candidateid+'/profiles?page='+page+'&size='+size);
  }
}
