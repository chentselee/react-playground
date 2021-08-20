import { useEffect } from "react";
import { Observable, PartialObserver } from "rxjs";

export const useSubscription = <T>(
  observable: Observable<T>,
  observer: PartialObserver<T>
) => {
  useEffect(() => {
    observable.subscribe(observer);
  }, [observable, observer]);
};
