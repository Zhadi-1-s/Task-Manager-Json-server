import { Injectable, NgZone} from '@angular/core';
import { User } from './user';
import * as auth from 'firebase/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    public afs: AngularFirestore, 
    public afAuth:AngularFireAuth,
    public router: Router, 
    public ngZone:NgZone) {
      this.afAuth.authState.subscribe((user) => {
        if(user){
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user')!);
        }
        else{
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user')!)
        }
      })
     }

    SignIn(email: string, password: string){
      return this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.afAuth.authState.subscribe((user) => {
            if(user){
              if(user.displayName){
                this.SetUserData(user, user.displayName);
                this.router.navigate(['dashboard']);
                window.alert('user have their userName')
              }
              else{
                const defaultDisplayName = 'User5';
                this.SetUserData(user, defaultDisplayName);
                this.router.navigate(['dashboard']);
              }
            }
          });
        })
        .catch((error) => {
          window.alert(error.message)
        });
    }

    SignUp(email: string, password: string,userName:string ){
      return this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((result)=> {
          this.SendVerificationMail();
          this.SetUserData(result.user, userName);
          window.alert('user created sucesfullt')
        })
        .catch((error)=>{
          window.alert(error.message)
        })
     }

    SendVerificationMail(){
      return this.afAuth.currentUser
        .then((u:any)=> u.SendEmailVerification())
        .then(() => {
          this.router.navigate(['verify-email/address']);
        });
    }

    ForgotPassword(passwordResetEmail: string) {
      return this.afAuth
        .sendPasswordResetEmail(passwordResetEmail)
        .then(() => {
          window.alert('Password reset email sent, check your inbox.');
        })
        .catch((error) => {
          window.alert(error);
        });
    }

    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user')!);
      return user !== null && user.emailVerified !== false ? true : false;
    }
    //* Seetting up user data when sign in with email/password
    SetUserData(user: any, userName: string){
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(
        `users/${user.uid}`
      );
      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: userName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      };
      return userRef.set(userData, {
        merge: true,
      });
    }   

    SignOut(){
      return this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['sign-in']);
      })
    }

}
