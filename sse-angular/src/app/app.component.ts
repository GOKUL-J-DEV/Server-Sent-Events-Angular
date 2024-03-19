import { Component } from '@angular/core';
import { SseService } from './services/sse.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sse-angular';

  constructor(private sseService: SseService) {}

  ngOnInit() {
    this.sseService.getServerSentEvent('http://localhost:3000/events').subscribe((data) => console.log(JSON.parse(data['data']).message));
  }
}
