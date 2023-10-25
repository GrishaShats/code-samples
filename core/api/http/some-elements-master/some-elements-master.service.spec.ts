import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { endpoints } from 'src/environments/environment.endpoints';
import { SomeElementsMasterService } from './some-elements-master.service';
import {
  elementsPlainStub,
  newElementStub
} from '@shared/constants/specs-constants';

describe('SomeElementsMasterService', () => {
  let httpController: HttpTestingController;
  let service: SomeElementsMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(SomeElementsMasterService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get some http elements list', () => {
    service.getSomeHttpElements().subscribe((res) => {
      expect(res).toEqual([elementsPlainStub]);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${endpoints.someElements.getSomeHttpElements()}`,
    });

    req.flush({ elements: [elementsPlainStub] });
  });

  it('should post create element', () => {
    service.createElement().subscribe((res) => {
      expect(res).toEqual(newElementStub);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: endpoints.elements.createSomeElement(),
    });

    req.flush(newElementStub);
  });
});
