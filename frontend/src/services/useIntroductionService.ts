import {PersistenceService} from '@/application/persistenceService';
import {TodoStorageService} from '@/domain/todo/todoStorageService';
import {useEffect, useState} from 'react';

const INTRODUCTION_DATE = 'introduction-usage-date';
export function useIntroductionService(persistence: PersistenceService, tss: TodoStorageService) {
  const [introductionChecked, setIntroductionChecked] = useState(false);
  useEffect(() => {
    const checkIntroduction = async () => {
      const persistenceDate = await persistence.get(INTRODUCTION_DATE);
      if (!persistenceDate && tss.todos.length === 0) {
        await tss.addTodo({
          // eslint-disable-next-line max-len
          text: 'This is a simple todo app duh, for more info: https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          id: '',
        });
        await persistence.set(INTRODUCTION_DATE, new Date().toString());
      }
      setIntroductionChecked(() => true);
    };
    checkIntroduction();
  }, []);

  return {introductionChecked};
}
