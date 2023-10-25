import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { elementDetailsResolver } from './element-details.resolver';
import { MatIconModule } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@shared/interfaces';
import { mockElement } from '@shared/constants/specs-constants';
import { of } from 'rxjs';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ElementsService } from '@core/services';

describe('ElementDetailsResolverService', () => {
  let resolver: elementDetailsResolver;
  let http: HttpClient;
  const initialState = {};
  let store: MockStore<IAppState>;
  const fakeService = {
    getElementById: (id: string) => of(mockElement),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        elementDetailsResolver,
        {
          provide: HttpClient,
          useValue: http,
        },
        {
          provide: ElementsService,
          useValue: fakeService,
        },
        provideMockStore({ initialState }),
      ],
      imports: [MatIconModule, MatIconTestingModule],
    });
    store = TestBed.inject(MockStore);
    resolver = TestBed.inject(elementDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should resolve element details', () => {
    const route = new ActivatedRouteSnapshot();
    spyOn(fakeService, 'getElementById').and.callThrough();

    resolver.resolve(route).subscribe((resolved) => {
      expect(resolved).toBeTruthy();
    });
  });
});
