import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Observable, take, map } from "rxjs";
import { omitDataAttributes, ISomeElement } from "./shared";
import { someQuery } from "../queries";

@Injectable({
  providedIn: "root",
})
export class SomeGraphqlService {
  constructor(private apollo: Apollo) {}

  getSomeElements(): Observable<ISomeElement[]> {
    return this.apollo
      .watchQuery({
        query: someQuery,
        errorPolicy: "all",
      })
      .valueChanges.pipe(
        take(1),
        map(
          ({ data }) =>
            omitDataAttributes<{ someElements: ISomeElement[] }>(data)
              .someElements
        )
      );
  }
}
