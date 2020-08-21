import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlayerStoreService } from './player-store.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlayerRes } from 'src/app/interfaces/player.response.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerserviceService {

  headers = new HttpHeaders().append("Authorization", `JWT ${localStorage.getItem("jwt")}`)

  constructor(private http: HttpClient, private playerStore: PlayerStoreService, private snackBar: MatSnackBar) { }

  getPlayers(){
    this.http.get('/api/site/players', {headers: this.headers}).subscribe((res: PlayerRes)=>{
      if(res.success == false){
        this.snackBar.open(res.msg, 'Close', {duration: 5000})
      }
      if(res.success == true){
      this.playerStore.addPlayers(res.players);
      }
    })
  }

}
