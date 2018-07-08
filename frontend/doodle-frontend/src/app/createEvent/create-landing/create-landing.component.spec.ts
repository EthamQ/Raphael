import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CreateLandingComponent } from './create-landing.component';
import { RouterModule } from '@angular/router';
import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { CreatePersonalComponent } from '../create-personal/create-personal.component';
import { MockDataService } from '../../../test/mock-data.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CreateCalendarComponent } from '../create-calendar/create-calendar.component';


describe('CreateLandingComponent', () => {
  let component: CreateLandingComponent;
  let fixture: ComponentFixture<CreateLandingComponent>;

  let createPersonalComponent: CreatePersonalComponent;
  let fixturePersonal: ComponentFixture<CreatePersonalComponent>;

  let createCalendarComponent: CreateCalendarComponent;
  let fixtureCalendar: ComponentFixture<CreateCalendarComponent>;

  let mockDataService: MockDataService;
  let titleInput: DebugElement;
  let locationInput: DebugElement;
  let adminNameInput: DebugElement;
  let descriptionInput: DebugElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        // angular modules
        RouterModule.forRoot([]),

        // project modules
        AppModule,
    ],
      declarations: [ ],
      providers: [
        {
            provide: APP_BASE_HREF, useValue: '/'
        }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockDataService = new MockDataService();

    // this component
    fixture = TestBed.createComponent(CreateLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    // CreatePersonalComponent
    fixturePersonal = TestBed.createComponent(CreatePersonalComponent);
    createPersonalComponent = fixturePersonal.componentInstance;
    fixturePersonal.detectChanges();

    // CreatePersonalComponent
    fixtureCalendar = TestBed.createComponent(CreateCalendarComponent);
    createCalendarComponent = fixtureCalendar.componentInstance;
    fixtureCalendar.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  


  describe('CreatePersonalComponent', () => {
    it('should create CreatePersonalComponent', () => {
      expect(createPersonalComponent).toBeTruthy();
    });

    it('user input should be correctly stored in the event object', fakeAsync(() => {
      tick();
      // title
      titleInput = fixturePersonal.debugElement.query(By.css('#title'));
      titleInput.nativeElement.value = mockDataService.createInput.title;
      titleInput.nativeElement.dispatchEvent(new Event('input'));
      expect(component.createService.event.title).toBe(mockDataService.createInput.title);
  
      // location
      locationInput = fixturePersonal.debugElement.query(By.css('#location'));
      locationInput.nativeElement.value = mockDataService.createInput.location;
      locationInput.nativeElement.dispatchEvent(new Event('input'));
      expect(component.createService.event.location).toBe(mockDataService.createInput.location);
  
      // description
      descriptionInput = fixturePersonal.debugElement.query(By.css('#description'));
      descriptionInput.nativeElement.value = mockDataService.createInput.description;
      descriptionInput.nativeElement.dispatchEvent(new Event('input'));
      expect(component.createService.event.description).toBe(mockDataService.createInput.description);
  
      // admin name
      adminNameInput = fixturePersonal.debugElement.query(By.css('#name'));
      adminNameInput.nativeElement.value = mockDataService.createInput.creator.name;
      adminNameInput.nativeElement.dispatchEvent(new Event('input'));
      expect(component.createService.creator.name).toBe(mockDataService.createInput.creator.name);
    }));
  });

  describe('CreateCalendarComponent', () => {
    it('should create CreateCalendarComponent', () => {
      expect(CreateCalendarComponent).toBeTruthy();
    });
    it('user input in CreateCalendarComponent should be correctly stored in timeSelection', fakeAsync(() => {
      tick();
    }));
  });
  

    
  
 
});
