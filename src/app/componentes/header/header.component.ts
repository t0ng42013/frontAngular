import { Component, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{
    ngOnInit(): void {
        this.onResize({ target: { innerWidth: window.innerWidth } });
    }  
    isBelow800px = false;

    @HostListener('window:resize', ['$event'])
    onResize(event: { target: { innerWidth: number; }; }) {
        this.isBelow800px = event.target.innerWidth < 801;
    }
}
