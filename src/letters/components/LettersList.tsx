import * as React from 'react';
import { useTrigger } from '../../_redux/useTrigger';
//import { useSelector } from 'react-redux';
import { IState } from '../../_redux/types';
import { ComposeGrid } from '../../compose/components/ComposeGrid';
//import { useReflector } from '../../../../../packages/redux-react/dist/lib';
import './styles.less';

export const LettersList = () => {
  const trigger = useTrigger();

  // const { letters, isLoading } = useSelector((state: IState) => ({
  //   letters: state.letters.lettersList.data,
  //   isLoading: state.letters.lettersList.loading,
  // }));

  const { letters, isLoading } = useReflector(
    (state: IState) => ({
      letters: state.letters.lettersList.data,
      isLoading: state.letters.lettersList.loading,
    }),
    ['lettersList']
  );

  React.useEffect(() => {
    trigger('lettersList', 'init', null);
    trigger('setContent', 'init', null);
  }, []);

  return (
    <div className='lettersListContainer'>
      <button
        className='lettersListButton'
        onClick={() => trigger('setContent', 'openWindow', { id: '-1' })}
      >
        Create new
      </button>
      <div>
        <ComposeGrid />
      </div>
      {isLoading ? <div className='lettersList'>Loading ...</div> : null}
      <div className='lettersList'>
        {letters && letters.length
          ? letters.map((l) => (
              <div
                className='lettersListItem'
                key={l.uid}
                onClick={() =>
                  trigger('setContent', 'openFromList', {
                    body: l.body,
                    subject: l.subject,
                  })
                }
              >
                {l.subject}{' '}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
