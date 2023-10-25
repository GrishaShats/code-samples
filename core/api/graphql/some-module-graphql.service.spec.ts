import { TestBed } from '@angular/core/testing';
import { mockSomeElements } from '@shared/constants';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { someQuery } from '../queries';
import { SomeGraphqlService } from './some-module-graphql.service';

describe('SomeGraphqlService', () => {
  let service: SomeGraphqlService;
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [ApolloTestingModule] });

    service = TestBed.inject(SomeGraphqlService);
    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get some elements', (done) => {
    const fullSomeElementStub = {
      data: [
        {
          attributes: {
            name: 'Some name',
            description: 'Some name allows to create name',
            value: 'Name',
            icon: {
              data: {
                attributes: {
                  url: 'url',
                },
              },
            },
          },
        },
      ],
    };

    service.getSomeElements().subscribe((result) => {
      expect(result).toEqual([mockSomeElements]);
      done();
    });

    controller.expectOne(someQuery).flush({ data: { someElements: fullSomeElementStub } });
  });
});
