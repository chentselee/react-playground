import { useRef } from "react";
import { Subject } from "rxjs";

export const useSubject = <T>(state: T) => {
  const subjectRef = useRef<Subject<T>>(new Subject());

  subjectRef.current.next(state);

  return subjectRef.current;
};
