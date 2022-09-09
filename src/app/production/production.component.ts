import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ProductionService } from './production.service';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit {
  private sub?: Subscription;
  percent = 0;

  constructor(private productionService: ProductionService) { }

  ngOnInit(): void {
    this.sub = this.productionService.productionPercent.subscribe((data => this.percent = data));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
