import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private readonly signalRUrl = `${environment.baseURL}/hub`;
  private readonly hubConnections: { [key: string]: signalR.HubConnection } = {};

  public startConnection(hubName:string, events:{[eventName:string]:(data:any)=>(void)}): void {
    if (this.hubConnections[hubName]) {
      console.warn(`Connection to ${hubName} already exists.`);
      return;
    }

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.signalRUrl}/${hubName}`,{
        accessTokenFactory: () => localStorage.getItem('token') || ''
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000]) // Retry intervals in milliseconds 
      // First attempt: 0ms, Second attempt: 2s, Third attempt: 5s, Fourth attempt: 10s
      .configureLogging(signalR.LogLevel.Information)
      .build();

      connection
      .start()
      .then(() => {
        console.log(`Connected to ${hubName} hub`);
      })
      .catch(err => console.error(`Error connecting to ${hubName} hub: `, err));

    connection.onreconnecting((error) => {
      console.warn(`Reconnecting to ${hubName} hub: `, error);
    });

    for(const [eventName, eventHandler] of Object.entries(events)) {
      connection.on(eventName, eventHandler);
    }

    this.hubConnections[hubName] = connection;
  }

  public stopConnection(hubName: string): void {
    const connection = this.hubConnections[hubName];
    if (connection) {
      connection.stop()
        .then(() => {
          console.log(`Disconnected from ${hubName} hub`);
          delete this.hubConnections[hubName];
        })
        .catch(err => console.error(`Error disconnecting from ${hubName} hub: `, err));
    } else {
      console.warn(`No connection to ${hubName} to stop.`);
    }
  }
}
