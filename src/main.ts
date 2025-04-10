import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environment/environment';


if (environment.production) {
  // Disable all console logs
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {}; // Optional: You can keep this if needed
  console.info = () => {};
  console.debug = () => {};
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
