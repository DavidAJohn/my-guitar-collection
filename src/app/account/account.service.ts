import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../shared/models/player';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  newPlayer: Player;

  constructor(private router: Router) { }

  createNewPlayer(email: string,
                  password: string,
                  realName: string,
                  biography: string,
                  profileImagePath: string = this.generateRandomProfileImage()) {

    const newPlayer = new Player(email, password, realName, biography, profileImagePath);
    return newPlayer;
  }

  private generateRandomProfileImage() {
    // get a random profile image from 'randomuser.me' until image upload functionality is added
    const gender = Math.round(Math.random()); // should be 0 or 1
    const imageNumber = Math.floor(Math.random() * 100);

    const imagePath = 'https://randomuser.me/api/portraits/thumb/' + (gender === 1 ? 'men/' : 'women/') + imageNumber + '.jpg';
    return imagePath;
  }
}
