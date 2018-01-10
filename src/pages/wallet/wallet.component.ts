import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Chart } from "chart.js";
import { DatabaseService } from "../../app/database.service";
import { Observable } from "rxjs/Rx";

@Component({
    selector: "app-wallet",
    templateUrl: "wallet.component.html"
})

export class WalletComponent implements OnInit {
    @ViewChild("barCanvas") barCanvas;
    @Input() balance;
    barChart: any;
    isSending: boolean;
    amountOfSms: number;

    constructor(private database: DatabaseService) {}

    ngOnInit() {
        this.amountOfSms = 0;
        let ctx = this.barCanvas.nativeElement.getContext('2d');
        let gradient = ctx.createLinearGradient(0, 0, 0, 600);
        gradient.addColorStop(0, '#822a6c');
        gradient.addColorStop(0.21, '#a0687c');
        this.barChart = new Chart(this.barCanvas.nativeElement, {

            type: "line",
            data: {
                labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
                datasets: [{
                    label: "Line 1",
                    data: [9, 10, 9, 13, 15, 17, 19],
                    borderColor: "rgba(255, 255, 255, 0.8)",
                    pointBackgroundColor: "rgba(255, 255, 255, 1)",
                    fill: false
                }, {
                    label: "Line 2",
                    data: [10, 11, 10, 14, 16, 18, 20],
                    backgroundColor: gradient,
                    borderColor: "rgba(135, 31, 130, 1)",
                    pointBackgroundColor: "rgba(135, 31, 130, 1)",
                    fill: true
                }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            stepSize: 1,
                            beginAtZero: true,
                            max: 40
                        },
                        display: false
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: "rgba(255, 255, 255, 1)",
                            fontSize: 12,
                            stepSize: 1,
                            beginAtZero: true
                        },
                        gridLines: {
                            color: "rgba(255, 255, 255, 1)",
                            lineWidth: 0.5,
                            display: false
                        }
                    }]
                }
            }

        });

        this.isSending = this.database.getSettings().isSending;

        let interval;

        if (this.isSending) {
            interval = Observable.interval(this.database.updateInterval).subscribe(() => this.updateChart());
        }

        this.database.settingsUpdated.subscribe((res) => {
            if (!res.isSending && interval) {
                interval.unsubscribe();
            } else if (res.isSending) {
                interval = Observable.interval(this.database.updateInterval).subscribe(() => this.updateChart());
            }

            this.isSending = res.isSending;
        });
    }

    updateChart() {
        this.amountOfSms += 1;
        const rand1 = Math.round(Math.random() * 10) + 10;
        const rand2 = Math.round(Math.random() * 20) + 10;
        this.barChart.data.datasets[0].data.shift();
        this.barChart.data.datasets[1].data.shift();
        this.barChart.data.datasets[0].data.push(rand1);
        this.barChart.data.datasets[1].data.push(rand2);
        this.barChart.update();
    }
}
